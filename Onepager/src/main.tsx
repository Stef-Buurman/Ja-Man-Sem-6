import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./output.css";
import "./custom.css";
import App from './App.jsx'

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} else {
    console.error('Root element not found');
}