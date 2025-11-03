// Initialize the mood board on popup open
document.addEventListener('DOMContentLoaded', () => {
    initializeMoodBoard();
    setupEventListeners();
});

// Initialize the grid dynamically based on image count
function initializeMoodBoard() {
    const moodBoard = document.getElementById('moodBoard');
    moodBoard.innerHTML = '';
    loadCapturedImages();
}

// Load captured images from storage and display in grid
async function loadCapturedImages() {
    const result = await chrome.storage.local.get(['capturedImages']);
    const images = result.capturedImages || [];
    
    const moodBoard = document.getElementById('moodBoard');
    const minCells = 10; // Show at least 10 cells
    
    // Calculate how many cells we need
    const numCells = Math.max(minCells, images.length);
    
    // Create grid cells
    for (let i = 0; i < numCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'mood-board-cell empty';
        cell.dataset.index = i;
        moodBoard.appendChild(cell);
    }
    
    // Display images in cells
    images.forEach((imageData, index) => {
        const cell = document.querySelector(`.mood-board-cell[data-index="${index}"]`);
        if (cell) {
            displayImageInCell(cell, imageData);
        }
    });
    
    updateExportButtons();
}

// Display image in a grid cell
function displayImageInCell(cell, imageData) {
    cell.classList.remove('empty');
    cell.innerHTML = `
        <img src="${imageData.url}" alt="Captured image">
        <input type="checkbox" class="image-checkbox">
    `;
    cell.dataset.imageId = imageData.id;
}

// Setup event listeners for action buttons
function setupEventListeners() {
    document.getElementById('clearBtn').addEventListener('click', clearMoodBoard);
    document.getElementById('exportJsonBtn').addEventListener('click', exportJSON);
    document.getElementById('exportAllBtn').addEventListener('click', exportAllImages);
    document.getElementById('exportIndividualBtn').addEventListener('click', exportIndividualImages);
}

// Clear all captured images
async function clearMoodBoard() {
    if (confirm('Are you sure you want to clear all captured images?')) {
        await chrome.storage.local.set({ capturedImages: [] });
        initializeMoodBoard();
        updateExportButtons();
    }
}

// Export captured images as JSON
async function exportJSON() {
    const result = await chrome.storage.local.get(['capturedImages']);
    const images = result.capturedImages || [];
    
    if (images.length === 0) {
        alert('No images to export!');
        return;
    }
    
    const jsonData = JSON.stringify(images, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `captured-images-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
}

// Export all captured images
async function exportAllImages() {
    const result = await chrome.storage.local.get(['capturedImages']);
    const images = result.capturedImages || [];
    
    if (images.length === 0) {
        alert('No images to export!');
        return;
    }
    
    for (const image of images) {
        await downloadImage(image.url, image.filename || 'image');
    }
}

// Export individually selected images
async function exportIndividualImages() {
    const checkboxes = document.querySelectorAll('.image-checkbox:checked');
    
    if (checkboxes.length === 0) {
        alert('Please select at least one image to export!');
        return;
    }
    
    for (const checkbox of checkboxes) {
        const cell = checkbox.closest('.mood-board-cell');
        const imageId = cell.dataset.imageId;
        
        const result = await chrome.storage.local.get(['capturedImages']);
        const images = result.capturedImages || [];
        const image = images.find(img => img.id === imageId);
        
        if (image) {
            await downloadImage(image.url, image.filename || 'image');
        }
    }
}

// Helper function to download an image
async function downloadImage(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error downloading image:', error);
        alert('Failed to download some images. They may be protected or from a different origin.');
    }
}

// Update export buttons based on captured images
async function updateExportButtons() {
    const result = await chrome.storage.local.get(['capturedImages']);
    const images = result.capturedImages || [];
    
    const exportAllBtn = document.getElementById('exportAllBtn');
    const exportIndividualBtn = document.getElementById('exportIndividualBtn');
    
    if (images.length === 0) {
        exportAllBtn.disabled = true;
        exportIndividualBtn.disabled = true;
    } else {
        exportAllBtn.disabled = false;
        exportIndividualBtn.disabled = false;
    }
}

// Listen for new images captured from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'imageCaptured') {
        loadCapturedImages();
    }
});

