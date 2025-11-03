# Troubleshooting Guide - CapThat! Extension

## Capture Buttons Not Showing

If capture buttons are not appearing on webpage images, try these solutions:

### Solution 1: Reload the Extension
1. Go to `chrome://extensions/`
2. Find "CapThat!"
3. Click the refresh/reload icon
4. Go back to your webpage and refresh it

### Solution 2: Check Permissions
1. Open `chrome://extensions/`
2. Find "CapThat!" and click "Details"
3. Ensure permissions include:
   - ✅ Access to activeTab
   - ✅ Storage permissions

### Solution 3: Test with Test Page
1. Open `test.html` in Chrome (drag and drop the file)
2. Hover over images
3. Capture buttons should appear

### Solution 4: Check Browser Console
1. Right-click on any webpage
2. Select "Inspect" → "Console" tab
3. Look for CapThat! errors
4. Common issues:
   - Content Security Policy blocking content
   - Missing permissions
   - Conflicting extensions

### Solution 5: Website-Specific Issues
Some websites may prevent extensions from:
- Injecting content scripts
- Accessing images (CORS restrictions)
- Modifying the DOM

**Workaround:** Try testing on:
- Simple websites
- Image galleries (Unsplash, Pexels, etc.)
- The included `test.html` file

### Solution 6: Extension Status
1. Open `chrome://extensions/`
2. Find "CapThat!"
3. Ensure it's:
   - ✅ Enabled (toggle is ON)
   - ✅ No error messages showing

### Solution 7: Chrome Version
- Ensure you're using Chrome 88+ (Manifest V3 support)
- Go to `chrome://version/` to check your version

### Solution 8: Content Script Injection
If buttons still don't appear:
1. Open Developer Tools (F12)
2. Go to Console
3. Type: `document.querySelectorAll('img').length`
4. This shows if images are detected
5. Type: `document.querySelectorAll('.capthat-capture-btn').length`
6. This shows if buttons are injected

### Known Limitations

⚠️ **Images too small** - Buttons won't show on images < 50x50 pixels
⚠️ **Protected images** - Some sites block image access
⚠️ **Iframe content** - Images inside iframes may not work
⚠️ **Canvas/SVG** - Only `<img>` tags are detected

### Still Not Working?

1. Check if images are actual `<img>` tags:
   - Right-click image → "Inspect"
   - Look for `<img>` in HTML

2. Verify image has loaded:
   - Image should have `width` and `height` attributes
   - No broken image icons (⛔)

3. Test on a fresh webpage:
   - Open `https://unsplash.com`
   - Hover over any photo
   - Capture button should appear

## Getting Help

If none of these solutions work:
1. Check Chrome console for error messages
2. Verify all files are in the extension folder
3. Try removing and re-adding the extension
4. Test with a fresh Chrome profile

