// Inject capture buttons on all images on the page
function injectCaptureButtons() {
    // Remove existing buttons first
    document.querySelectorAll('.capthat-capture-btn').forEach(btn => btn.remove());
    
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
        // Skip if already has capture button or if image is too small
        if (img.closest('.capthat-capture-btn')) {
            return;
        }
        
        // Skip tiny images (like icons)
        if (img.width < 50 || img.height < 50) {
            return;
        }
        
        // Create capture button
        const captureBtn = document.createElement('div');
        captureBtn.className = 'capthat-capture-btn';
        captureBtn.textContent = '+';
        captureBtn.dataset.imageUrl = img.src;
        
        // Add click handler
        captureBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            e.preventDefault();
            await captureImage(img.src);
        });
        
        // Make sure parent is positioned
        if (img.parentElement) {
            const parent = img.parentElement;
            if (getComputedStyle(parent).position === 'static') {
                parent.style.position = 'relative';
            }
            parent.appendChild(captureBtn);
        }
    });
}

// Capture image and add to mood board
async function captureImage(imageUrl) {
    try {
        // Get current captured images
        const result = await chrome.storage.local.get(['capturedImages']);
        const images = result.capturedImages || [];
        
        // Check if image already exists
        if (images.some(img => img.url === imageUrl)) {
            alert('This image is already captured!');
            return;
        }
        
        // Add new image
        const newImage = {
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            url: imageUrl,
            timestamp: new Date().toISOString(),
            pageUrl: window.location.href,
            filename: extractFilename(imageUrl)
        };
        
        images.push(newImage);
        
        // Save to storage
        await chrome.storage.local.set({ capturedImages: images });
        
        // Notify popup
        chrome.runtime.sendMessage({ 
            action: 'imageCaptured', 
            image: newImage 
        });
        
        // Visual feedback
        showCaptureFeedback();
        
    } catch (error) {
        console.error('Error capturing image:', error);
        alert('Failed to capture image. Please try again.');
    }
}

// Extract filename from URL
function extractFilename(url) {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.split('/').pop();
        return filename || `image_${Date.now()}.jpg`;
    } catch (error) {
        return `image_${Date.now()}.jpg`;
    }
}

// Show visual feedback when image is captured
function showCaptureFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'capthat-feedback';
    feedback.textContent = '✓ Captured!';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Initial injection when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCaptureButtons);
} else {
    injectCaptureButtons();
}

// Re-inject on DOM changes (for dynamically loaded content)
let observerTimeout;
let isProcessing = false;

const observer = new MutationObserver((mutations) => {
    // Ignore mutations that are our own feedback elements or button removals
    let shouldSkip = false;
    for (const mutation of mutations) {
        // Check if the mutation is about our extension elements
        for (const node of [...(mutation.addedNodes || []), ...(mutation.removedNodes || [])]) {
            if (node.nodeType === 1 && (node.classList?.contains('capthat-feedback') || node.classList?.contains('capthat-capture-btn'))) {
                shouldSkip = true;
                break;
            }
        }
        if (shouldSkip) break;
    }
    
    // Debounce and skip our own mutations to prevent infinite loops
    if (!shouldSkip && !isProcessing) {
        clearTimeout(observerTimeout);
        observerTimeout = setTimeout(() => {
            isProcessing = true;
            injectCaptureButtons();
            isProcessing = false;
        }, 100);
    }
});

if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
} else {
    document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

