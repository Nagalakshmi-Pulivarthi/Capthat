# CapThat! - Chrome Extension

A Chrome Extension that allows users to capture images from any webpage and display them in a beautiful Capture Board.

## Features

✅ **Capture Images** - Add overlay buttons on all webpage images for easy capture  
✅ **Capture Board** - Dynamic grid layout to organize captured images (no limit!)  
✅ **Clear All** - Remove all captured images with one click  
✅ **Export JSON** - Export image metadata and URLs as JSON file  
✅ **Export All** - Download all captured images at once  
✅ **Export Individual** - Select and download specific images  

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the CapThat folder
6. The extension should now appear in your Chrome toolbar

## Usage

### Capturing Images
1. Navigate to any webpage with images
2. Hover over any image to see the "+" button in the bottom right corner
3. Click "+" to add the image to your Capture Board
4. Capture unlimited images - the grid expands automatically!

### Viewing Your Capture Board
1. Click the CapThat! extension icon in Chrome
2. Your captured images will be displayed in the dynamic grid

### Managing Images
- **Clear Cap Board**: Removes all images from the Capture Board
- **Export JSON**: Downloads metadata for all captured images
- **Export CapBoard**: Downloads all captured images
- **Export Individual Caps**: Select specific images using checkboxes and download them

## Technical Details

- **Manifest Version**: 3
- **Permissions**: activeTab, storage
- **Storage**: Chrome Local Storage API
- **Technologies**: HTML5, CSS3, JavaScript (ES6+)

## File Structure

```
CapThat/
├── manifest.json         # Extension manifest
├── popup.html           # Extension popup UI
├── popup.js             # Popup functionality
├── content.js           # Content script for image capture
├── content-style.css    # Styles for capture buttons
├── background.js        # Service worker
├── styles.css           # Extension popup styles
├── icon16.png           # Extension icons (16x16)
├── icon48.png           # Extension icons (48x48)
├── icon128.png          # Extension icons (128x128)
└── README.md            # This file
```

## Notes

- Icon files (icon16.png, icon48.png, icon128.png) need to be created or you can remove the icons section from manifest.json
- Images are stored in Chrome's local storage
- Cross-origin images may not download due to browser security restrictions
- The extension works on all HTTP/HTTPS websites

## License

MIT License

