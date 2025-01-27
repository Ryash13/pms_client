import { Project } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "./AuthState";
import axios from "@/api/axiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@/hooks/use-toast";
import { getItem, setItem } from "@/service/auth.service";

interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  setSelectedProject: (project: Project) => void;
  fetchProjects: () => void;
  addProject: (project: Project) => void;
}

export type GetProjectResponse = {
  [key in ProjectResponse]: string | Project[];
};

type ProjectResponse = 'data' | 'defaultProject'

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loggedInUser = useAuthState();
  const toast = useToast();

  // Fetch projects from the API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      if (!loggedInUser) return;

      const response = await axios.get<AxiosResponse<GetProjectResponse>>("/api/v1/projects");
      const data = response.data?.data?.data as Project[];
      setProjects(data);
      const defaultProjectId = response.data?.data?.defaultProject as string;

      if (data.length > 0) {
        // Check if there is a selected project in localStorage
        const savedProjectId = getItem("current_project");
        let defaultProject = data.find((project) => project.publicId === defaultProjectId);

        if (savedProjectId && !defaultProject) {
          // If there is a saved project ID and no default project, set the saved project
          defaultProject = data.find((project) => project.publicId === savedProjectId);
        }

        if (defaultProject) {
          setSelectedProject(defaultProject);
        } else {
          setSelectedProject(null); // No project available for the loggedInUser
        }
      } else {
        setSelectedProject(null); // No projects available for the loggedInUser
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      const axiosError = err as AxiosError;
      var error = (axiosError.response?.data as { error: string })?.error || "An unknown error occurred";
      if (axiosError.message === "Network Error") {
        error = "INTERNAL SERVER ERROR, TRY AGAIN LATER";
      }
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: error,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Set the selected project and persist it to localStorage
  const handleSetSelectedProject = (project: Project) => {
    setSelectedProject(project);
    setItem("current_project", project.publicId);
  };

  // Add a new project and set it as the selected project
  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
    handleSetSelectedProject(project);
  };

  // Read the selected project from localStorage on mount
  useEffect(() => {
    const savedProjectId = localStorage.getItem("current_project");
    if (savedProjectId) {
      const savedProject = projects.find((project) => project.publicId === savedProjectId);
      if (savedProject) {
        setSelectedProject(savedProject);
      }
    }
  }, [projects]); // Runs when projects are updated

  // Fetch the projects whenever the logged-in user changes
  useEffect(() => {
    fetchProjects();
  }, [loggedInUser]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        loading,
        setSelectedProject: handleSetSelectedProject,
        fetchProjects,
        addProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjectContext must be used within a ProjectProvider");
  return context;
};
