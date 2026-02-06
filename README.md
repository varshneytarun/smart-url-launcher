# 🚀 Smart URL Launcher - Chrome/Edge Extension

A powerful Chrome extension that automatically launches URLs based on clipboard patterns. Perfect for quickly opening ServiceNow tickets, Jira issues, and any other pattern-based URLs.

> **Looking for a faster setup?** Check out the [**Quick Start Guide**](QUICKSTART.md) to get up and running in 5 minutes!

## Features

- **Clipboard Pattern Matching**: Automatically detects patterns in your clipboard (like INC123456, PROJ-123)
- **Context Menu Integration**: Right-click on selected text to launch URLs
- **Multi-Launch**: Opens all matching URLs from a single piece of text
- **Configurable Match Limit**: Set the maximum number of links (1-20) to open at once to prevent accidental overloads.
- **Partial Matching**: Finds matches anywhere in the selected text or clipboard
- **One-Click Launch**: Opens matched URLs in new tabs instantly
- **Fully Customizable**: Configure your own URL patterns and templates
- **Multiple Patterns**: Support for unlimited custom patterns
- **Enable/Disable**: Toggle patterns on/off without deleting them
- **Pre-configured Examples**: Comes with ServiceNow and Jira patterns ready to customize

## Installation

### From Source (Google Chrome)

1.  **Download or Clone** this repository to your local machine.
2.  **Open the Chrome Extensions Page** by navigating to `chrome://extensions/`.
3.  **Enable Developer Mode** using the toggle switch in the top-right corner.
4.  **Load the Extension** by clicking "Load unpacked" and selecting the `url-launcher-extension` folder.
5.  **Pin the Extension**: Click the puzzle piece icon in the toolbar, find "Smart URL Launcher," and click the pin icon to keep it's icon pinnned on the toolbar. Alternatively, go to `chrome://extensions/` (into the extensions page), find "Smart URL Launcher," click Details, and check the "Pin to toolbar" option.

### From Source (Microsoft Edge)

1.  **Download or Clone** this repository to your local machine.
2.  **Open the Edge Extensions Page** by navigating to `edge://extensions/`.
3.  **Enable Developer Mode** using the toggle switch in the bottom-left corner.
4.  **Load the Extension** by clicking "Load unpacked" and selecting the `url-launcher-extension` folder.
5.  **Pin the Extension**: Click the puzzle piece icon in the toolbar, find "Smart URL Launcher," and click the pin icon to keep it's icon pinnned on the toolbar.

## Usage

### From Clipboard

1. **Copy text to your clipboard** (e.g., copy "INC0123456" from an email)
2. **Click the extension icon** in your Chrome toolbar
   - The extension will silently read your clipboard.
   - If it finds any matches, it will instantly open them in new tabs.
   - If no matches are found, a small window will appear to let you know.

### From Selected Text (Context Menu)

1. **Highlight text** on any webpage.
2. **Right-click** the selected text.
3. **Choose "Launch appropriate app for..."** from the context menu.
   - The extension will find all matches in the selected text and open them in new tabs.

### Configuration

1. **Click the extension icon**

2. **Click "Configure Patterns"** to open the options page

3. **Modify existing patterns** or **add new ones**:
   - **Pattern Name**: A friendly name (e.g., "ServiceNow Incident")
   - **Regular Expression**: The pattern to match (e.g., `INC\\d{7,}`)
   - **URL Template**: The URL with `{value}` placeholder (e.g., `https://your-instance.service-now.com/nav_to.do?uri=incident.do?sysparm_query=number={value}`)

4. **Click "Save All Changes"**

## Pattern Examples

### ServiceNow Incident
- **Pattern**: `INC\\d{7,}`
- **Matches**: INC0123456, INC9876543
- **URL Template**: `https://your-instance.service-now.com/nav_to.do?uri=incident.do?sysparm_query=number={value}`

### ServiceNow Change Request
- **Pattern**: `CHG\\d{7,}`
- **Matches**: CHG0123456, CHG9876543
- **URL Template**: `https://your-instance.service-now.com/nav_to.do?uri=change_request.do?sysparm_query=number={value}`

### Jira Issue
- **Pattern**: `[A-Z]{2,}-\\d+`
- **Matches**: PROJ-123, TEAM-456, AB-1
- **URL Template**: `https://your-domain.atlassian.net/browse/{value}`

### GitHub Issue
- **Pattern**: `#\\d+`
- **Matches**: #123, #4567
- **URL Template**: `https://github.com/owner/repo/issues/{value}`

### Confluence Page
- **Pattern**: `CONF-\\d+`
- **Matches**: CONF-12345
- **URL Template**: `https://your-domain.atlassian.net/wiki/spaces/SPACE/pages/{value}`

### Custom Ticket System
- **Pattern**: `TICKET-[A-Z0-9]+`
- **Matches**: TICKET-ABC123, TICKET-XYZ789
- **URL Template**: `https://tickets.yourcompany.com/view/{value}`

## Regular Expression Tips

- `\\d` matches any digit (0-9)
- `\\d+` matches one or more digits
- `\\d{7,}` matches 7 or more digits
- `[A-Z]` matches any uppercase letter
- `[A-Z]+` matches one or more uppercase letters
- `[A-Z]{2,}` matches 2 or more uppercase letters
- `.` matches any character
- `.*` matches any characters (zero or more)
- `^` matches start of string
- `$` matches end of string

## URL Template Placeholder

Use `{value}` in your URL template where you want the matched clipboard text to be inserted.

Examples:
- `https://example.com/ticket/{value}`
- `https://example.com/search?q={value}`
- `https://example.com/{value}/details`

## Handling Overlapping Patterns

The extension will launch a URL for **every** pattern that matches the text in your clipboard or selection, not just the first one. This is a powerful feature that allows you to open a work item in multiple systems at once.

For example, imagine your clipboard contains the text `TASK-12345`, and you have two patterns configured:

1.  **Name**: "Jira Task"
    *   **Pattern**: `TASK-\\d+`
    *   **URL**: `https://my-jira.com/browse/{value}`

2.  **Name**: "General Work Item"
    *   **Pattern**: `[A-Z]+-\\d+`
    *   **URL**: `https://our-work-search.com/items/{value}`

In this case, the extension will open **two** tabs: one for Jira and one for your general work search.

If you have broad patterns that overlap with more specific ones, you can use the "Enabled" checkbox in the options to temporarily disable any patterns you don't want to launch.

## Permissions

This extension requires the following permissions:

- **clipboardRead**: To read the clipboard content
- **storage**: To save your custom patterns
- **tabs**: To open new tabs with matched URLs
- **contextMenus**: To add the "Launch" option to the right-click menu
- **offscreen**: To read the clipboard from the background without opening a popup window

## Troubleshooting

### Extension doesn't read clipboard
- Make sure you've granted clipboard permissions
- Click "Read Clipboard & Launch" button to trigger permission request
- Some browsers may require user interaction before reading clipboard

### Pattern not matching
- Verify your regular expression is correct
- Test your pattern at [regex101.com](https://regex101.com/)
- Make sure the pattern is enabled (checkbox is checked)
- Check that there are no extra spaces in your clipboard text

### URL not opening
- Verify the URL template is correct
- Make sure `{value}` placeholder is included in the URL
- Check browser console for any errors

## Customization Ideas

- **Support Tickets**: Match ticket numbers and open support system
- **Pull Requests**: Match PR numbers and open GitHub/GitLab
- **Wiki Pages**: Match wiki IDs and open documentation
- **Customer IDs**: Match customer IDs and open CRM
- **Order Numbers**: Match order IDs and open order management system
- **Employee IDs**: Match employee IDs and open HR system

## Privacy

This extension:
- Only reads clipboard when you click the extension icon or use the context menu
- Stores patterns locally in Chrome sync storage
- Does not send any data to external servers
- Does not track or collect user data

## Development

### File Structure
```
url-launcher-extension/
├── manifest.json         # Extension configuration
├── background.js         # Background service worker
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic
├── options.html          # Options page interface
├── options.js            # Options page logic
├── matching.js           # Shared pattern matching logic
├── offscreen.html        # Offscreen document for clipboard access
├── offscreen.js          # Offscreen document logic
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

### Making Changes

1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the reload icon on the extension card
4. Test your changes

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - Feel free to use and modify as needed.

## Version History

- **1.0.0** (2025-02-04)
  - Initial release
  - Pattern matching and URL launching
  - Configurable patterns via options page
  - Default ServiceNow and Jira patterns

## Support

For issues or questions, please create an issue in the repository. You can also reach out on:

- **X (Twitter)**: [@tarunvarshney](https://twitter.com/tarunvarshney)
- **LinkedIn**: [Tarun Varshney](https://www.linkedin.com/in/tarunvarshney16)

---

Made with ❤️ for productivity enthusiasts