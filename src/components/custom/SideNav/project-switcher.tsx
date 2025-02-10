import { useEffect, useState } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useProjectContext } from "@/context/useProject";
import { Project } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjectIcon, IconName } from "@/service/icons.service";

export function ProjectSwitcher() {
  const { isMobile } = useSidebar();
  const [projectList, setProjectList] = useState<Project[]>([]);

  const { loading, projects, selectedProject, setSelectedProject } =
    useProjectContext();

  useEffect(() => {
    const toRenderProjects = projects.filter(
      (proj) => proj?.id !== selectedProject?.id
    );
    setProjectList(toRenderProjects);
  }, [selectedProject]);

  const SelectedProjectIcon = getProjectIcon(selectedProject?.icon as IconName);

  return (
    <SidebarMenu>
      {loading ? (
        <Skeleton className="w-[90%] h-[41px] rounded-lg" />
      ) : (
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <SelectedProjectIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {selectedProject?.name}
                  </span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Projects
              </DropdownMenuLabel>
              {projectList.map((project, index) => {
                const ProjectIcon = getProjectIcon(project?.icon as IconName);
                return (
                  <DropdownMenuItem
                    key={`${project?.name}-${index}`}
                    onClick={() => setSelectedProject(project)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <ProjectIcon className="size-4" />
                    </div>
                    {project?.name}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Create New Project
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
