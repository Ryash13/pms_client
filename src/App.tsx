import { Route, Routes } from "react-router-dom";
import "./App.css";
import Wrapper from "./wrapper";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/app/Home";
import Settings from "./pages/app/settings";
import { useAppState } from "./context/AppState";
import { useEffect } from "react";
import Project from "./pages/app/Project";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "./ProtectedRoute";
import UnProtectedRoute from "./UnProtectedRoute";

function App() {
  const { isDarkMode } = useAppState();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <>
      <Toaster />
      <Routes>
        {/* Un-Protected Routes */}
        <Route path="/" element={<UnProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<UnProtectedRoute element={<Login />} />} />
        <Route path="/register" element={<UnProtectedRoute element={<Register />} />} />

        {/* Proteected Routes */}
        <Route path="/app/" element={<ProtectedRoute element={<Wrapper />} />}>
          <Route
            path="/app/project"
            element={<ProtectedRoute element={<Project />} />}
          />
          <Route
            path="/app/settings"
            element={<ProtectedRoute element={<Settings />} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
