# Quick Start Guide - CapThat! Chrome Extension

## Installation Steps

1. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

2. **Load the Extension**
   - Click "Load unpacked"
   - Select the `CapThat` folder
   - Extension icon should appear in your toolbar

3. **Add Icon Files (Optional)**
   - Create or download three PNG icons: `icon16.png`, `icon48.png`, `icon128.png`
   - See `ICONS_README.md` for details
   - Alternatively, remove the icons section from `manifest.json`

## How to Use

### Capturing Images
1. Visit any website with images (e.g., Pinterest, Unsplash, etc.)
2. Hover over an image - you'll see a "Capture" button appear
3. Click "Capture" to add it to your Mood Board
4. You'll see a green "✓ Captured!" notification

### Viewing Your Mood Board
1. Click the CapThat! icon in your Chrome toolbar
2. See all your captured images in a beautiful 10-cell grid

### Managing Captures
- **Clear Cap Board** - Remove all images
- **Export JSON** - Download metadata (URLs, timestamps, etc.)
- **Export CapBoard** - Download all images at once
- **Export Individual Caps** - Check specific images and download selected ones

## Color Scheme
- Background: Teal (#4DB6AC)
- Header: Dark Grey (#333333)
- Grid Cells: White with black borders
- Action Buttons: Color-coded (Red/Clear, Blue/JSON, Green/All, Orange/Individual)

## Troubleshooting

**Icons Missing?**
- Extension will work without icons
- Remove icons section from manifest.json if needed

**Images Not Downloading?**
- Some images may be protected by CORS policy
- Try images from public domains like Unsplash, Pexels

**Capture Button Not Appearing?**
1. Reload the extension in chrome://extensions/
2. Refresh the webpage
3. Try the included `test.html` file to test
4. Check browser console for errors (F12)
5. See `TROUBLESHOOTING.md` for detailed help

**Storage Full?**
- Mood Board is limited to 10 images
- Use "Clear Cap Board" to make space

## Technical Notes
- Uses Chrome Storage API (local storage)
- Works on all HTTP/HTTPS sites
- No external dependencies
- Pure HTML/CSS/JavaScript

## Support
Check the main `README.md` for detailed documentation.

