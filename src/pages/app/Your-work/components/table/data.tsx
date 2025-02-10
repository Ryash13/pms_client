import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  DoubleArrowUpIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { Circle, CircleCheckBig, CircleSlashed } from "lucide-react";

export const statusType = [
  {
    label: "Backlog",
    value: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    label: "ToDo",
    value: "ToDo",
    icon: Circle,
  },
  {
    label: "InProgress",
    value: "InProgress",
    icon: StopwatchIcon,
  },
  {
    label: "Done",
    value: "Done",
    icon: CircleCheckBig,
  },
  {
    label: "Cancelled",
    value: "Cancelled",
    icon: CircleSlashed,
  },
];

export const priorityType = [
  {
    label: "Low",
    value: "Low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "Medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "High",
    icon: ArrowUpIcon,
  },
  {
    label: "Urgent",
    value: "Urgent",
    icon: DoubleArrowUpIcon,
  },
];
