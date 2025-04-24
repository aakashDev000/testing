import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { setupScrollAnimation } from './utils/animations';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Initialize scroll animations after React has hydrated
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure React is fully loaded
  setTimeout(() => {
    setupScrollAnimation();
  }, 100);
});