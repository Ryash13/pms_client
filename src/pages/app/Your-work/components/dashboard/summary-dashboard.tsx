import { CircleUserRound, CopyPlus, Layers } from "lucide-react";
import PriorityBarChart from "../charts/bar-chart";
import DonutChart from "../charts/donut-chart";
import { UserStats } from "@/types";
import OverviewCard from "../cards/overview-card";
import WorkloadCard from "../cards/workload-card";

interface OverviewCardProps {
  stats: UserStats | null;
}

const SummaryDashboard = ({ stats }: OverviewCardProps) => {
  const priorityColors: { [key: string]: string } = {
    Urgent: "#8B0000", // Dark Red
    High: "#FF4444", // Red
    Medium: "#FFA500", // Orange
    Low: "#008000", // Green
  };

  const priorityData = stats?.priorityDistribution.map((item) => ({
    name: item.priority,
    value: item.count,
    color: priorityColors[item.priority] || "#000000", // Default to black if priority not found
  }));

  return (
    <div className="min-w-fit flex flex-col gap-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="font-custom-black text-lg dark:text-white">Overview</h2>

        {/* Responsive Grid Layout for overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <OverviewCard
            title="Issues Assigned"
            icon={CircleUserRound}
            count={stats?.issueAssigned || 0}
          />
          <OverviewCard
            title="Issues Created"
            icon={CopyPlus}
            count={stats?.issueCreated || 0}
          />
          <OverviewCard
            title="Issues Completed"
            icon={Layers}
            count={stats?.issueCompleted || 0}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-custom-black text-lg dark:text-white">Workload</h2>

        {/* Responsive Grid Layout for Worload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
          <WorkloadCard
            title="Backlog"
            count={stats?.backlogCount || 0}
            color="#D9D9D9"
          />
          <WorkloadCard
            title="To Do"
            count={stats?.todoCount || 0}
            color="#3F76FF"
          />
          <WorkloadCard
            title="In Progress"
            count={stats?.inProgressCount || 0}
            color="#F59E0B"
          />
          <WorkloadCard
            title="Done"
            count={stats?.doneCount || 0}
            color="#16A34A"
          />
          <WorkloadCard
            title="Cancelled"
            count={stats?.cancelledCount || 0}
            color="#DC2626"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2 dark:text-foreground">
            Issues by Priority
          </h2>
          <PriorityBarChart data={priorityData!} />
        </div>

        <div className="p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2 dark:text-foreground">
            Issues by State
          </h2>
          <DonutChart />
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
