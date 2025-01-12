import { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectHeader from "./ProjectHeader";

export enum ActiveTabTypes {
  BOARD = "Board",
  TIMELINE = "Timeline",
  TABLE = "Table",
}

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<ActiveTabTypes>(
    ActiveTabTypes.BOARD
  );
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false);
  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Project;
