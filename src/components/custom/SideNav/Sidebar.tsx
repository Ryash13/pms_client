import { Home, LockIcon, Settings, Users, X } from "lucide-react";

import {
  useAppDispatch,
  useAppState,
  toggleSidebarCollapse,
} from "@/context/AppState";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  // const [showProjects, setShowProjects] = useState<boolean>(true);
  // const [showPriority, setShowPriority] = useState<boolean>(true);

  const { isSideBarCollapsed } = useAppState();
  const dispatch = useAppDispatch();

  const sideBarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
     h-full z-40 dark:bg-black overflow-y-auto bg-white
    ${isSideBarCollapsed ? "w-0 hidden" : "w-64"}
  `;
  return (
    <div className={sideBarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-20 flex min-h-[56px] items-center justify-between bg-white dark:bg-dark-bg px-6">
          <div className="text-xl font-bold text-gray-800 dark:text-white items-center">
            ALIGN_IQ
          </div>
          {isSideBarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(toggleSidebarCollapse());
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* Team Info= */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <img
            src="https://robohash.org/yash"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              Yash Raj
            </h3>
            <div className="mt-2 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem= h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Sidenav Links */}
        <nav className="z-10 w-full">
          <SidebarLinks href="/app/" icon={Home} label="Home" />
          <SidebarLinks href="/app/settings" icon={Settings} label="Settings" />
          <SidebarLinks href="/app/users" icon={Users} label="Users" />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
