import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import "./custom.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const viteEnv = (import.meta as ImportMeta & { env: { BASE_URL: string } }).env;
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter basename={viteEnv.BASE_URL}>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
