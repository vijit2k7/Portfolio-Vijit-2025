// Ensure React is globally available
import * as React from 'react';

// Define React in multiple locations to ensure it's available
if (typeof window !== 'undefined') {
  window.React = window.React || React;
  
  // Also attach it to global if it exists (for Node-like environments)
  if (typeof global !== 'undefined') {
    global.React = React;
  }
}

// Export React to ensure it's not tree-shaken
export { React }; 