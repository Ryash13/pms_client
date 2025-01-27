import { Link } from "react-router-dom";
import {
  ChevronsUpDown,
  CirclePlus,
  Menu,
  MoonIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  SunIcon,
} from "lucide-react";
import {
  toggleDarkMode,
  toggleSidebarCollapse,
  useAppDispatch,
  useAppState,
} from "@/context/AppState";
import { Skeleton } from "@/components/ui/skeleton";

import { useProjectContext } from "@/context/useProject";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Project } from "@/types";

const Navbar = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);

  const { isDarkMode, isSideBarCollapsed } = useAppState();
  const dispatch = useAppDispatch();
  const { loading, projects, selectedProject, setSelectedProject } =
    useProjectContext();

  console.log(selectedProject);
  const handleProjectChange = (value: string) => {
    const selected = projects.find((proj) => proj?.publicId === value);
    if (selected) setSelectedProject(selected);
  };

  useEffect(() => {
    const toRenderProjects = projects.filter(
      (proj) => proj?.publicId != selectedProject?.publicId
    );
    setProjectList(toRenderProjects);
  }, [selectedProject]);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="flex shrink-0 transition-[width,height] ease-linear items-center shadow-lg justify-between px-4 py-3 bg-white dark:bg-black">
      {/* Seachbar */}
      <div className="flex items-center gap-3">
        {!isSideBarCollapsed ? <PanelLeftClose
            onClick={() => dispatch(toggleSidebarCollapse())}
            className="h-6 w-6 cursor-pointer dark:text-white"
          /> : (
          <PanelLeftOpen
            onClick={() => dispatch(toggleSidebarCollapse())}
            className="h-6 w-6 cursor-pointer dark:text-white"
          />
        )}
        <div className="relative flex h-min w-[250px]">
          {/* <Search className="absolute top-1/2  left-[4px] mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            placeholder="Search..."
            type="text"
            className="bg-gray-100 rounded-lg p-2 pl-8 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          /> */}
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[30px] w-[250px] rounded-xl" />
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-[250px] dark:bg-black flex items-center justify-between space-x-2 focus-visible:bg-none dark:text-white px-6 py-1 rounded-lg text-gray-900 cursor-pointer">
                  <span>{selectedProject?.name}</span>
                  <ChevronsUpDown className="text-gray-400 size-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-black dark:text-white mt-2 w-[250px]">
                {projectList?.map((project) => (
                  <DropdownMenuItem
                  className="cursor-pointer"
                    onClick={() => handleProjectChange(project.publicId)}
                    key={project.publicId}
                  >
                    {project.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <CirclePlus className="mr-2" />
                  Add Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
