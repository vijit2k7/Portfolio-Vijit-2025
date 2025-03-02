// Import jsx-shim first to ensure React is defined globally
import '../jsx-shim.js'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('vijit mishra');
createRoot(document.getElementById("root")!).render(
  React.createElement(React.StrictMode, {}, 
    React.createElement(App)
  )
);
