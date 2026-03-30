// This script runs in the offscreen document.
// It has access to the DOM and the clipboard API.

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.command === 'read-clipboard') {
    // Use modern Clipboard API - async and reliable
    navigator.clipboard.readText().then((clipboardText) => {
      sendResponse(clipboardText || '');
    }).catch((err) => {
      console.error('Failed to read clipboard:', err);
      // Fallback to legacy method for compatibility
      const container = document.getElementById('clipboard-container');
      container.value = '';
      container.focus();
      document.execCommand('paste');
      sendResponse(container.value || '');
    });
    // Return true to indicate async response
    return true;
  }
});