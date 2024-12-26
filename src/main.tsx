import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthStateProvider } from "./context/AuthState.tsx";
import { AppStateProvider } from "./context/AppState.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthStateProvider>
      <AppStateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppStateProvider>
    </AuthStateProvider>
  </StrictMode>
);
