import { useEffect, useState } from "react";

import axios from "@/api/axiosConfig";
import WorkHeader from "./header";
import SummaryDashboard from "./components/dashboard/summary-dashboard";
import MyIssues from "./components/table/my-issues";
import { UserStats } from "@/types";
import LoadingDashboard from "./components/dashboard/loading-dashboard";

const Headers = ["Summary", "Assigned", "Created"] as const;
export type HeaderType = (typeof Headers)[number];

const YourWork = () => {
  const [selectedHeader, setSelectedHeader] = useState<HeaderType>(Headers[0]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const url = import.meta.env.VITE_FETCH_USER_STATS_URL;
      try {
        const response = await axios.get<UserStats>(url);
        setStats(response.data);
      } catch (error) {
        console.log("Error occured while fetching user stats, ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const renderUserWorkData = () => {
    switch (selectedHeader) {
      case "Summary":
        return loading ? (
          <LoadingDashboard />
        ) : (
          <SummaryDashboard stats={stats} />
        );
      case "Assigned":
        return <MyIssues showAssinged={true} />;
      case "Created":
        return <MyIssues showAssinged={false} />;
    }
  };

  return (
    <div className="min-h-screen min-w-fit">
      <div className="flex items-center">
        <WorkHeader
          headers={Headers}
          selectedHeader={selectedHeader}
          setSelectedHeader={setSelectedHeader}
        />
      </div>
      <div className="px-8 py-2 ">{renderUserWorkData()}</div>
    </div>
  );
};

export default YourWork;
