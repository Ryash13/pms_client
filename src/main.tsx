import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthStateProvider } from "./context/AuthState.tsx";
import { AppStateProvider } from "./context/AppState.tsx";
import { ProjectProvider } from "./context/useProject.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthStateProvider>
    <AppStateProvider>
      <ProjectProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProjectProvider>
    </AppStateProvider>
  </AuthStateProvider>
);
