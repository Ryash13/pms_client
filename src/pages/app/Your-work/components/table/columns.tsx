import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { ArrowDownIcon, CircleSlashed } from "lucide-react";
import { priorityType, statusType } from "./data";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("title")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate capitalize font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      let icon;
      switch (status) {
        case "Backlog":
          const backlogObj = statusType.find((p) => p.value === "Backlog");
          icon = backlogObj ? (
            <backlogObj.icon className="mr-2 size-4" />
          ) : null;
          break;
        case "ToDo":
          const toDoObj = statusType.find((p) => p.value === "ToDo");
          icon = toDoObj ? <toDoObj.icon className="mr-2 size-4" /> : null;
          break;
        case "InProgress":
          const inProgressObj = statusType.find(
            (p) => p.value === "InProgress"
          );
          icon = inProgressObj ? (
            <inProgressObj.icon className="mr-2 size-4" />
          ) : null;
          break;
        case "Done":
          const doneObj = statusType.find((p) => p.value === "Done");
          icon = doneObj ? <doneObj.icon className="mr-2 size-4" /> : null;
          break;
        default:
          icon = <CircleSlashed className="mr-2 size-5" />;
      }
      return (
        <div className="flex w-[100px] items-center">
          {icon && icon}
          <span className="capitalize"> {row.getValue("status")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      let icon;
      switch (priority) {
        case "Urgent":
          const urgentPriorityObj = priorityType.find(
            (p) => p.value === "Urgent"
          );
          icon = urgentPriorityObj ? (
            <urgentPriorityObj.icon className="mr-2 size-4" />
          ) : null;
          break;
        case "High":
          const highPriorityObj = priorityType.find((p) => p.value === "High");
          icon = highPriorityObj ? (
            <highPriorityObj.icon className="mr-2 size-4" />
          ) : null;
          break;
        case "Medium":
          const mediumPriorityObj = priorityType.find(
            (p) => p.value === "Medium"
          );
          icon = mediumPriorityObj ? (
            <mediumPriorityObj.icon className="mr-2 size-4" />
          ) : null;
          break;
        default:
          icon = <ArrowDownIcon className="mr-2 size-4" />;
      }
      return (
        <div className="flex w-[100px] items-center">
          {icon && icon}
          <span className="capitalize"> {row.getValue("priority")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {row.getValue("assignee")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{row.getValue("createdBy")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
