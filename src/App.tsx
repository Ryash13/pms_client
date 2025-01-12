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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Wrapper />}>
          <Route path="/app/project" element={<Project />} />
          <Route path="/app/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
