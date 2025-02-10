import { useProjectContext } from "@/context/useProject";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "@/api/axiosConfig";
import { useEffect, useState } from "react";
import { Issues } from "@/types";
import { toast } from "sonner";
import LoadingDashboard from "../dashboard/loading-dashboard";
import { useAuthState } from "@/context/AuthState";

interface MyIssuesProps {
  showAssinged: boolean;
}

const MyIssues = ({ showAssinged }: MyIssuesProps) => {
  const { selectedProject } = useProjectContext();
  const loggedInUser = useAuthState();

  const [view, setView] = useState<"table" | "board">("table");
  const [loading, setLoading] = useState<boolean>(true);
  const [assignedIssues, setAssignedIssues] = useState<Issues[]>([]);
  const [createdIssues, setCreatedIssues] = useState<Issues[]>([]);

  const handleViewChange = (view: "table" | "board") => {
    setView(view);
  };

  useEffect(() => {
    const fetchIssues = async () => {
      const url = import.meta.env.VITE_FETCH_PROJECT_ISSUES_URL;
      try {
        const response = await axios.get<Issues[]>(
          `${url}/${selectedProject?.id}`
        );
        const data = response.data;
        console.log("Data: ", data);
        const assignedIssues = data.filter(
          (issue) =>
            issue.assignee ===
            `${loggedInUser?.firstName} ${loggedInUser?.lastName}`
        );
        const createdIssues = data.filter(
          (issue) =>
            issue.createdBy ===
            `${loggedInUser?.firstName} ${loggedInUser?.lastName}`
        );
        setAssignedIssues(assignedIssues);
        setCreatedIssues(createdIssues);
      } catch (error) {
        console.log("Error occured while fetching issues, ", error);
        toast.error("Error occured while fetching issues");
      } finally {
        setLoading(false);
      }
    };

    if (!selectedProject) return;
    fetchIssues();
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-2 py-8 md:flex">
      {loading ? (
        <LoadingDashboard />
      ) : (
        <DataTable
          data={showAssinged ? assignedIssues : createdIssues}
          columns={columns}
        />
      )}
    </div>
  );
};

export default MyIssues;
