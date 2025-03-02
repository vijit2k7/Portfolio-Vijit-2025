// Ensure React is globally available
import * as React from 'react';

// Use simpler assignment that works at runtime
window.React = React;

// Export to prevent tree-shaking
export { React }; 