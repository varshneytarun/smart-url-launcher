importScripts('defaults.js', 'matching.js');

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // On first install, set the default patterns and maxMatches
    chrome.storage.sync.get({ patterns: [], maxMatches: 5 }, (result) => {
      if (result.patterns.length === 0) {
        const defaultPatterns = globalThis.DEFAULT_PATTERNS || [];
        chrome.storage.sync.set({ patterns: defaultPatterns, maxMatches: 5 }, () => {
          console.log('Default settings installed.');
        });
      }
    });
  }
});

// When the user clicks the extension icon, open the popup.html in a new window
chrome.action.onClicked.addListener((tab) => {
  launchFromClipboard(tab);
});

/**
 * Creates and displays a popup window with a given message.
 * @param {string} reason - The reason for showing the popup, used as a query parameter.
 * @param {string} [text=''] - Optional text to include in the query parameters for context.
 */
function showPopup(reason, text = '') {
  let url = `popup.html?reason=${reason}`;
  if (text) {
    // The popup UI can optionally use this to show more context.
    url += `&text=${encodeURIComponent(text)}`;
  }
  chrome.windows.create({
    url: chrome.runtime.getURL(url),
    type: 'popup',
    width: 420,
    height: 180, // Standardized height for all popups
  });
}

/**
 * Reads text from the clipboard, finds matching patterns, and launches the corresponding URLs.
 * If no matches are found, it shows a popup with a relevant message.
 * @param {chrome.tabs.Tab} tab - The tab where the action was initiated.
 */
async function launchFromClipboard(tab) {
  // Use the offscreen document to read the clipboard
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['CLIPBOARD'],
    justification: 'Reading clipboard text to find matching patterns',
  });

  const clipboardText = await chrome.runtime.sendMessage({
    command: 'read-clipboard',
  });

  await chrome.offscreen.closeDocument();

  if (!clipboardText || clipboardText.trim() === '') {
    showPopup('clipboard-empty');
    return;
  }

  const matches = await findMatchingPatterns(clipboardText);

  if (matches.length > 0) {
    for (const match of matches) {
      chrome.tabs.create({ url: match.url });
    }
  } else {
    showPopup('no-match', clipboardText);
  }
}


// Context menu: launch on selected text
try {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'launch-selection',
      title: 'Smart Launch - "%s"',
      contexts: ['selection']
    });
  });
} catch (e) {
  console.warn('Could not create context menu:', e);
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'launch-selection') return;

  const selection = (info.selectionText || '').trim();
  const matches = await findMatchingPatterns(selection);

  if (matches.length > 0) {
    for (const match of matches) {
      chrome.tabs.create({ url: match.url });
    }
  } else {
    showPopup('no-match', selection);
  }
});