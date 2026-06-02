import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import "./custom.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { isDev } from "./utils/globals.js";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter basename={isDev ? "/" : "/2025_2026/idp_so_t3/"}>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
