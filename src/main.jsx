// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';          // Import the main App component
import './index.css';             // Import global CSS styles

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure the ID matches the div in index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
