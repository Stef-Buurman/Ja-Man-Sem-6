import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./output.css";
import "./custom.css";
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
} else {
    console.error('Root element not found');
}