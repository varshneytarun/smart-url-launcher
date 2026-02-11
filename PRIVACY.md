# Privacy Policy for Smart URL Launcher

**Last updated:** February 7, 2026

## Overview
Smart URL Launcher is committed to protecting your privacy. This privacy policy explains our data practices for the Chrome and Microsoft Edge extension.

## Data Collection
**We do NOT collect, store, or transmit any personal data.**

Smart URL Launcher operates entirely on your local device and does not:
- Collect personal information
- Track your browsing activity
- Send data to external servers
- Use analytics or tracking tools
- Store data on remote servers

## Data Storage
The extension stores the following data **locally on your device only**:

### Browser Sync Storage
- **URL patterns** you configure in the options page
- **Pattern settings** (enabled/disabled state)

This data is:
- Stored using your browser's built-in sync storage (Chrome Sync or Microsoft Edge Sync)
- Synchronized across your browsers (if sync is enabled)
- Never transmitted to our servers or any third party
- Completely under your control and can be deleted at any time

## Clipboard and Text Access
The extension requests permission to read clipboard content and access text you select in a webpage. This is essential for its core functionality.

- The extension reads text in two scenarios:
  1. **From your clipboard** when you click the extension icon.
  2. **From text you have highlighted** when you use the right-click context menu.
- This text is processed temporarily in your browser's memory to find matches against your configured patterns.
- **This data is never stored, logged, or transmitted anywhere.** The process is entirely local and private.

## Permissions Explained

### `clipboardRead`
- **Why it's needed**: To read the content of your clipboard for pattern matching.
- **How it's used**: The extension reads your clipboard in two cases:
  1. When you **click the extension icon** in your browser toolbar.
  2. When you **right-click selected text** and use the context menu option.
- **Data handling**: The clipboard content is processed entirely in your browser's memory to find matches. It is **never stored, logged, or sent anywhere**.

### `storage`
- **Why it's needed**: To save your custom URL patterns and settings.
- **How it's used**: Your configurations are stored locally using the browser's sync storage, allowing your settings to be consistent across devices where you're logged in.
- **Data handling**: This data remains on your device or within your browser's sync account and is never accessed by us.


### `contextMenus`
- **Why it's needed**: To add the "Launch URL for..." option to the right-click menu.
- **How it's used**: This allows you to launch URLs directly from text you've selected on a webpage, providing a convenient alternative to copying text first.
- **Data handling**: The selected text is handled the same way as clipboard content—processed in memory and immediately discarded.

### `offscreen`
- **Why it's needed**: To read the clipboard reliably from the extension's background service worker.
- **How it's used**: Modern Chrome extensions require a temporary, invisible offscreen document to access the clipboard from a service worker. This allows the extension to read the clipboard without needing a visible popup window every time.
- **Data handling**: This is a technical requirement for clipboard access and does not involve any extra data collection or storage.



## Third-Party Services
This extension does **NOT** use any third-party services, including:
- No analytics platforms
- No advertising networks
- No tracking services
- No remote servers
- No external APIs

## Children's Privacy
Our extension does not knowingly collect information from children under 13. The extension is designed for professional productivity use.

## Changes to This Privacy Policy
We may update this privacy policy from time to time. Any changes will be posted in this document with an updated "Last updated" date.

## Data Deletion
To delete all data stored by the extension:

1. **Remove the extension:**
   - Right-click the extension icon
   - Select "Remove from Chrome" or "Remove from Microsoft Edge"
   - Confirm deletion

2. **Or clear extension storage:**
   - Go to `chrome://extensions/` or `edge://extensions/`
   - Find "Smart URL Launcher"
   - Click "Details"
   - Click "Clear storage" or a similar option provided by your browser

## Your Rights
You have complete control over your data:
- Access your patterns anytime in the options page
- Modify or delete patterns at will
- Completely remove the extension and all data
- Export your patterns (by viewing them in options)

## Open Source
This extension's source code is available for review, ensuring transparency in our privacy practices. You can view the code at:
[https://github.com/varshneytarun/smart-url-launcher](https://github.com/varshneytarun/smart-url-launcher)

## Contact
If you have questions about this privacy policy or the extension's data practices, please open an issue on our GitHub repository.

## Consent
By using Smart URL Launcher, you consent to this privacy policy.

---

## Summary (TL;DR)
✅ No data collection  
✅ No tracking  
✅ No external servers  
✅ Everything stays on your device  
✅ Clipboard only read when you click  
✅ You control all data  
✅ Can delete everything anytime  

**Your privacy is 100% protected.**