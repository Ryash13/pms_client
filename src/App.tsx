import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Wrapper from "./wrapper";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import Home from "@/pages/auth/Home";
import { useAppState } from "@/context/AppState";
import Project from "@/pages/app/Project";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "./ProtectedRoute";
import UnProtectedRoute from "./UnProtectedRoute";
import ChangePassword from "@/pages/app/user/change-password";
import RegisterForm from "@/pages/auth/Register/components/register-form";
import ProfileSettings from "@/pages/app/user/user-account";
import Homepage from "@/pages/app/Home/page";
import YourWork from "@/pages/app/Your-work/page";

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
        <Route
          path="/login"
          element={<UnProtectedRoute element={<Login />} />}
        />
        <Route
          path="/register"
          element={<UnProtectedRoute element={<Register />} />}
        />
        <Route
          path="/onboarding"
          element={<UnProtectedRoute element={<RegisterForm />} />}
        />

        {/* Proteected Routes */}
        <Route path="/app/" element={<ProtectedRoute element={<Wrapper />} />}>
          <Route
            path="/app/home"
            element={<ProtectedRoute element={<Homepage />} />}
          />
          <Route
            path="/app/profile/your-work"
            element={<ProtectedRoute element={<YourWork />} />}
          />
          <Route
            path="/app/project"
            element={<ProtectedRoute element={<Project />} />}
          />
          <Route
            path="/app/user"
            element={<ProtectedRoute element={<ProfileSettings />} />}
          />
          <Route
            path="/app/user/change-password"
            element={<ProtectedRoute element={<ChangePassword />} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
