let patterns = [];

/**
 * Generates a unique ID for a pattern.
 * @returns {string} A unique identifier.
 */
function generateId() {
  return 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}

/**
 * Displays a status message that fades out after a few seconds.
 * @param {string} message - The message to display.
 * @param {'success' | 'error'} [type='success'] - The type of message, for styling.
 */
function showStatus(message, type = 'success') {
  const statusDiv = document.getElementById('statusMessage');
  statusDiv.className = `status-message ${type}`;
  statusDiv.textContent = message;
  statusDiv.style.display = 'block';
  
  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 3000);
}

/**
 * Creates the DOM element for a single pattern row.
 * @param {object} pattern - The pattern object.
 * @param {number} index - The index of the pattern in the array.
 * @returns {HTMLTableRowElement} The created table row element.
 */
function createPatternElement(pattern, index) {
  const tr = document.createElement('tr');
  tr.dataset.index = index;
  tr.dataset.id = pattern.id || generateId();
  
  if (!pattern.id) pattern.id = tr.dataset.id;
  
  tr.innerHTML = `
    <td><input type="checkbox" class="pattern-enabled" ${pattern.enabled ? 'checked' : ''}></td>
    <td><input type="text" class="pattern-name" value="${escapeHtml(pattern.name)}" placeholder="e.g., ServiceNow"></td>
    <td><input type="text" class="pattern-regex pattern-input" value="${escapeHtml(pattern.pattern)}" placeholder="e.g., INC\\d{7,}"></td>
    <td><input type="text" class="pattern-url" value="${escapeHtml(pattern.urlTemplate)}" placeholder="https://example.com/{value}"></td>
    <td>
      <div class="controls">
        <button class="copy-pattern secondary" title="Duplicate">📋</button>
        <button class="move-up secondary" ${index === 0 ? 'disabled' : ''} title="Move up">↑</button>
        <button class="move-down secondary" ${index === patterns.length - 1 ? 'disabled' : ''} title="Move down">↓</button>
        <button class="delete-pattern danger" title="Delete">✕</button>
      </div>
    </td>
  `;
  
  // Add event listeners
  tr.querySelector('.copy-pattern').addEventListener('click', () => copyPattern(index));
  tr.querySelector('.delete-pattern').addEventListener('click', () => deletePattern(index));
  tr.querySelector('.move-up').addEventListener('click', () => movePattern(index, -1));
  tr.querySelector('.move-down').addEventListener('click', () => movePattern(index, 1));
  
  // Auto-save on blur for all input fields
  tr.querySelectorAll('input[type="text"], input[type="checkbox"]').forEach(input => {
    input.addEventListener('blur', () => {
      const gathered = gatherPatterns();
      const errors = validatePatterns(gathered);
      
      // Check if there are errors for this specific pattern
      const patternErrors = errors.filter(e => e.startsWith(`Pattern ${index + 1}:`));
      
      if (patternErrors.length > 0) {
        showStatus('Pattern ' + (index + 1) + ': ' + patternErrors.map(e => e.split(': ')[1]).join('; '), 'error');
      } else if (errors.length === 0) {
        chrome.storage.sync.set({ patterns: gathered }, () => {
          patterns = gathered;
          showStatus('Pattern saved!', 'success');
          
          // Add highlight effect to the row
          const row = input.closest('tr');
          if (row) {
            row.classList.add('row-saved');
            setTimeout(() => {
              row.classList.remove('row-saved');
            }, 1500); // Animation duration
          }
        });
      }
    });
  });
  
  return tr;
}

/**
 * Escapes HTML special characters in a string to prevent XSS.
 * @param {string} text - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Renders all patterns to the DOM.
 */
function renderPatterns() {
  const container = document.getElementById('patternsList');
  container.innerHTML = '';
  
  if (patterns.length === 0) {
    container.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #666; font-style: italic; padding: 24px;">No patterns configured. Click "Add Pattern" to create one.</td></tr>';
    return;
  }
  
  patterns.forEach((pattern, index) => {
    container.appendChild(createPatternElement(pattern, index));
  });
}

/**
 * Gathers all patterns from the DOM.
 * @returns {Array<object>} An array of pattern objects.
 */
function gatherPatterns() {
  const items = document.querySelectorAll('#patternsList tr');
  const gathered = [];
  
  items.forEach(item => {
    // Preserve the element's stable id (or create one if missing)
    let id = item.dataset.id;
    if (!id) {
      id = generateId();
      item.dataset.id = id;
    }
    const nameInput = item.querySelector('.pattern-name');
    const regexInput = item.querySelector('.pattern-regex');
    const urlInput = item.querySelector('.pattern-url');
    const enabledInput = item.querySelector('.pattern-enabled');
    
    if (nameInput && regexInput && urlInput) {
      gathered.push({
        id: id,
        name: nameInput.value.trim(),
        pattern: regexInput.value.trim(),
        urlTemplate: urlInput.value.trim(),
        enabled: enabledInput.checked
      });
    }
  });
  
  return gathered;
}

/**
 * Validates an array of patterns.
 * @param {Array<object>} patterns - The patterns to validate.
 * @returns {Array<string>} An array of error messages.
 */
function validatePatterns(patterns) {
  const errors = [];
  
  patterns.forEach((pattern, index) => {
    if (!pattern.name) {
      errors.push(`Pattern ${index + 1}: Name is required`);
    }
    
    if (!pattern.pattern) {
      errors.push(`Pattern ${index + 1}: Regular expression is required`);
    } else {
      try {
        new RegExp(pattern.pattern);
      } catch (e) {
        errors.push(`Pattern ${index + 1}: Invalid regular expression - ${e.message}`);
      }
    }
    
    if (!pattern.urlTemplate) {
      errors.push(`Pattern ${index + 1}: URL template is required`);
    } else if (!pattern.urlTemplate.includes('{value}')) {
      errors.push(`Pattern ${index + 1}: URL template must contain {value} placeholder`);
    }
  });
  
  return errors;
}

/**
 * Adds a new, empty pattern to the list.
 */
function addPattern() {
  const newPattern = {
    name: "New Pattern",
    pattern: "",
    urlTemplate: "",
    enabled: true
  };
  newPattern.id = generateId();
  
  patterns.push(newPattern);
  renderPatterns();
  
  // Scroll to the new pattern
  const container = document.getElementById('patternsList');
  setTimeout(() => {
    container.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    container.lastElementChild.querySelector('.pattern-name').focus();
  }, 100);
}

/**
 * Deletes a pattern from the list.
 * @param {number} index - The index of the pattern to delete.
 */
function deletePattern(index) {
  if (confirm('Are you sure you want to delete this pattern?')) {
    patterns.splice(index, 1);
    renderPatterns();
  }
}

/**
 * Duplicates a pattern and inserts it below the original.
 * @param {number} index - The index of the pattern to copy.
 */
function copyPattern(index) {
  const original = patterns[index];
  if (!original) return;
  
  const copy = {
    id: generateId(),
    name: original.name + ' (copy)',
    pattern: original.pattern,
    urlTemplate: original.urlTemplate,
    enabled: original.enabled
  };
  
  patterns.splice(index + 1, 0, copy);
  renderPatterns();
  showStatus('Pattern copied!', 'success');
}

/**
 * Moves a pattern up or down in the list.
 * @param {number} index - The index of the pattern to move.
 * @param {number} direction - The direction to move (-1 for up, 1 for down).
 */
function movePattern(index, direction) {
  const newIndex = index + direction;
  
  if (newIndex < 0 || newIndex >= patterns.length) {
    return;
  }
  
  const temp = patterns[index];
  patterns[index] = patterns[newIndex];
  patterns[newIndex] = temp;
  
  renderPatterns();
}

/**
 * Saves all patterns to Chrome storage.
 */
function savePatterns() {
  const gathered = gatherPatterns();
  const errors = validatePatterns(gathered);
  
  if (errors.length > 0) {
    showStatus('Validation errors:\n' + errors.join('\n'), 'error');
    return;
  }
  
  chrome.storage.sync.set({ patterns: gathered }, () => {
    patterns = gathered;
    showStatus('Patterns saved successfully!', 'success');
  });
}

/**
 * Resets all patterns to the default set.
 */
function resetPatterns() {
  if (confirm('This will reset all patterns to defaults. Are you sure?')) {
    const defaults = globalThis.DEFAULT_PATTERNS || [];
    chrome.storage.sync.set({ patterns: defaults }, () => {
      patterns = [...defaults];
      renderPatterns();
      showStatus('Patterns reset to defaults', 'success');
    });
  }
}

/**
 * Exports the current configuration to a JSON file.
 */
function exportConfig() {
  const gathered = gatherPatterns();
  const maxMatchesInput = document.getElementById('maxMatches');
  const maxMatches = parseInt(maxMatchesInput.value, 10) || 5;

  const config = {
    patterns: gathered,
    maxMatches: maxMatches
  };

  const dataStr = JSON.stringify(config, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'url-launcher-config.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showStatus('Configuration exported!', 'success');
}

/**
 * Imports configuration from a JSON file.
 */
function importConfig() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      
      let importedPatterns = [];
      let importedMaxMatches = null;

      // Check for new config format vs old pattern-only array
      if (Array.isArray(imported)) {
        // Handle old format (array of patterns)
        importedPatterns = imported;
        showStatus('Legacy patterns imported. Max matches setting was not affected.', 'success');
      } else if (imported && typeof imported === 'object' && Array.isArray(imported.patterns)) {
        // Handle new format
        importedPatterns = imported.patterns;
        if (typeof imported.maxMatches === 'number' && imported.maxMatches >= 1 && imported.maxMatches <= 20) {
          importedMaxMatches = imported.maxMatches;
        }
      } else {
        showStatus('Invalid format: expected a configuration object or an array of patterns', 'error');
        return;
      }

      // Validate imported patterns
      const errors = validatePatterns(importedPatterns);
      if (errors.length > 0) {
        showStatus('Validation errors in imported file:\n' + errors.slice(0, 3).join('\n'), 'error');
        return;
      }
      
      // Ensure all imported patterns have IDs
      const withIds = importedPatterns.map(p => {
        if (!p.id) p.id = generateId();
        return p;
      });
      
      const newConfig = { patterns: withIds };
      if (importedMaxMatches !== null) {
        newConfig.maxMatches = importedMaxMatches;
      }

      chrome.storage.sync.set(newConfig, () => {
        // Reload the entire configuration from storage to update the UI
        loadConfig();
        showStatus('Configuration imported successfully!', 'success');
      });
    } catch (err) {
      showStatus('Error reading file: ' + (err.message || String(err)), 'error');
    }
  });
  input.click();
}

/**
 * Loads all configuration from Chrome storage and populates the UI.
 */
function loadConfig() {
  chrome.storage.sync.get({ patterns: [], maxMatches: 5 }, (result) => {
    // Load patterns, ensuring each has a stable ID
    if (result.patterns.length > 0) {
      patterns = result.patterns.map(p => {
        if (!p.id) p.id = generateId();
        return p;
      });
    } else {
      patterns = [...(globalThis.DEFAULT_PATTERNS || [])];
    }
    renderPatterns();

    // Set the value for the max matches slider
    const maxMatchesInput = document.getElementById('maxMatches');
    const maxMatchesValue = document.getElementById('maxMatchesValue');
    if (maxMatchesInput && maxMatchesValue) {
      maxMatchesInput.value = result.maxMatches;
      maxMatchesValue.textContent = result.maxMatches;
    }
  });
}

/**
 * Initializes the options page by loading config and setting up event listeners.
 */
function initializePage() {
  loadConfig();

  // General settings listeners
  const maxMatchesInput = document.getElementById('maxMatches');
  const maxMatchesValue = document.getElementById('maxMatchesValue');

  if (maxMatchesInput && maxMatchesValue) {
    maxMatchesInput.addEventListener('input', () => {
      maxMatchesValue.textContent = maxMatchesInput.value;
    });

    maxMatchesInput.addEventListener('change', () => {
      const value = parseInt(maxMatchesInput.value, 10);
      chrome.storage.sync.set({ maxMatches: value }, () => {
        showStatus('Max matches setting saved!', 'success');
      });
    });
  }

  // Main action listeners
  document.getElementById('addPattern').addEventListener('click', addPattern);
  document.getElementById('exportConfig').addEventListener('click', exportConfig);
  document.getElementById('importConfig').addEventListener('click', importConfig);
  document.getElementById('resetPatterns').addEventListener('click', resetPatterns);
}

// Initialize the page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);