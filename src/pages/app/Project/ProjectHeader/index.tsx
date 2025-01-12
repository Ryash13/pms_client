import { Clock, Grid3X3, PlusSquare, Table } from "lucide-react";
import { useState } from "react";
import { ActiveTabTypes } from "..";
import TabButton from "../TabButton";

type Props = {
  activeTab: ActiveTabTypes;
  setActiveTab: (tab: ActiveTabTypes) => void;
};

const ProjectHeader = (props: Props) => {
  const [isModelNewProjectOpen, setIsModelNewProjectOpen] =
    useState<boolean>(false);
  return (
    <div className="px-4 xl:px-6">
      {/* Modal for New project */}

      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="font-semibold text-2xl dark:text-white">
            Project Design Board
          </h1>
          <button
            className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => setIsModelNewProjectOpen(true)}
          >
            <PlusSquare className="mr-2 h-5 w-5" /> New Boards
          </button>
        </div>
      </div>
      {/* Board View Tabs */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-3">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="w-5 h-5" />}
            activeTab={props.activeTab}
            setActiveTab={props.setActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="w-5 h-5" />}
            activeTab={props.activeTab}
            setActiveTab={props.setActiveTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="w-5 h-5" />}
            activeTab={props.activeTab}
            setActiveTab={props.setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
