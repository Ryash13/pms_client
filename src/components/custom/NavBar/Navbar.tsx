import { Link } from "react-router-dom";

import { Menu, MoonIcon, Search, Settings, SunIcon } from "lucide-react";

import {
  toggleDarkMode,
  toggleSidebarCollapse,
  useAppDispatch,
  useAppState,
} from "@/context/AppState";

const Navbar = () => {
  const { isDarkMode, isSideBarCollapsed } = useAppState();
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-dark-bg">
      {/* Seachbar */}
      <div className="flex items-center gap-3">
        {!isSideBarCollapsed ? null : (
          <Menu
            onClick={() => dispatch(toggleSidebarCollapse())}
            className="h-6 w-6 cursor-pointer dark:text-white"
          />
        )}
        <div className="relative flex h-min w-[300px]">
          <Search className="absolute top-1/2  left-[4px] mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            placeholder="Search..."
            type="text"
            className="bg-gray-100 rounded-lg p-2 pl-8 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          />
        </div>
      </div>
      <div className="flex items-center gap:4">
        {isDarkMode ? (
          <SunIcon
            onClick={toggleTheme}
            className="h-6 w-6 cursor-pointer dark:text-white"
          />
        ) : (
          <MoonIcon
            onClick={toggleTheme}
            className="h-6 w-6 cursor-pointer dark:text-white"
          />
        )}
        <div className="ml-2 mr-2 hidden min-h-[2em] w-[0.1em] bg-gray-200 md:inline-block"></div>
        <Link to={"/app/settings"}>
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-2 hidden min-h-[2em] w-[0.1em] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
