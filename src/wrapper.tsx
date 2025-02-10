import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  toggleDarkMode,
  useAppDispatch,
  useAppState,
} from "./context/AppState";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { Separator } from "./components/ui/separator";
import { MoonIcon, SunIcon } from "lucide-react";
import { AppSidebar } from "./components/custom/SideNav/app-sidebar";

const Wrapper = () => {
  const { isDarkMode } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 px-4 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger
              className={`ml-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}
            />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          {isDarkMode ? (
            <SunIcon
              onClick={toggleTheme}
              className="size-6 cursor-pointer hover:transform transition-all hover:scale-110 text-white"
            />
          ) : (
            <MoonIcon
              onClick={toggleTheme}
              className="size-6 cursor-pointer hover:transform hover:scale-110"
            />
          )}
        </header>
        <Separator orientation="horizontal" className="bg-muted/50 mt-2" />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Wrapper;
