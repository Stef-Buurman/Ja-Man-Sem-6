import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/toast-manager/toast-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
);
