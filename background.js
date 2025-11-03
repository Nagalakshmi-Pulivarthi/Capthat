// Service worker for CapThat! Chrome Extension

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('CapThat! extension installed');
    
    // Initialize storage if needed
    chrome.storage.local.get(['capturedImages'], (result) => {
        if (!result.capturedImages) {
            chrome.storage.local.set({ capturedImages: [] });
        }
    });
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'imageCaptured') {
        console.log('Image captured:', message.image);
        sendResponse({ success: true });
    }
    
    return true; // Keep message channel open for async operations
});

