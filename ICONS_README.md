# Icon Files Required

The extension references three icon files in the manifest:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

## Option 1: Create Your Own Icons
Create PNG icons matching the CapThat! brand:
- Use the teal color (#4DB6AC) from the extension
- Include text or iconography representing "capture" or "camera"
- Export as PNG files with the specified dimensions

## Option 2: Use Placeholder Icons
You can temporarily remove the icons section from manifest.json:

```json
{
  "manifest_version": 3,
  "name": "CapThat!",
  ...
  // Remove or comment out this section:
  // "icons": {
  //   "16": "icon16.png",
  //   "48": "icon48.png",
  //   "128": "icon128.png"
  // }
}
```

## Option 3: Quick Icon Generation
You can use online tools like:
- https://favicon.io/emoji-favicons/camera/
- https://realfavicongenerator.net/

Or use any image editing software to create simple square icons with the teal background.

