import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAppState } from "./context/AppState";
import { useEffect } from "react";

const Wrapper = () => {
  const { isDarkMode, isSideBarCollapsed } = useAppState();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSideBarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Wrapper;
