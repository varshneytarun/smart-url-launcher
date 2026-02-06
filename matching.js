// This script is imported by the service worker (background.js) to provide pattern matching logic.

async function findMatchingPatterns(text) {
  const { patterns, maxMatches = 5 } = await chrome.storage.sync.get(['patterns', 'maxMatches']);
  
  if (!patterns || patterns.length === 0) {
    return [];
  }
  
  const matches = [];
  
  for (const p of patterns) {
    if (!p.enabled || !p.pattern) continue;
    
    try {
      const regex = new RegExp(p.pattern, 'g');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          url: p.urlTemplate.replace('{value}', match[0]),
          name: p.name
        });
        
        if (matches.length >= maxMatches) break; 
      }
    } catch (e) {
      console.error(`Error in pattern '${p.name}':`, e);
    }
    
    if (matches.length >= maxMatches) break;
  }
  
  return matches;
}