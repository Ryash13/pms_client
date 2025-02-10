import { User } from "@/context/AuthState";
import { Home, Briefcase, User, Star, Folder } from "lucide-react";

export interface ProjectMember {
  id: number;
  name: string;
  username: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  icon: string;
  status: ProjectStatus;
  owner: ProjectMember;
  coOwner: ProjectMember;
  teamMembers: ProjectMember[];
  createdAt: string;
  lastModifiedAt: string;
}

export interface Issues {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  labels: string;
  points: number;
  createdAt: string;
  lastModifiedAt: string;
  assignee: string;
  createdBy: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string;
  username: string;
  role: string;
  bio: string;
  coverImageUrl: string;
  ownerProjects: number[];
  coOwnedProjects: number[];
  projectsAsTeamMember: number[];
  createdAt: string;
  lastModifiedAt: string;
}

export interface UserStats {
  issueCreated: number;
  issueAssigned: number;
  issueCompleted: number;
  backlogCount: number;
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
  cancelledCount: number;

  priorityDistribution: {
    priority: string;
    count: number;
    color: string;
  }[];
  stateDistribution: {
    state: string;
    count: number;
    color: string;
  }[];
}

export interface QuickLinks {
  id: number;
  url: string;
  displayText: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  role: string;
  coverImageUrl: string;
}

export interface ApiResponse<T> {
  data: T;
}

export type ProjectStatus =
  | "Backlog"
  | "InProgress"
  | "Completed"
  | "Cancelled"
  | "OnHold"
  | "Delayed";

export type AuthResponse = "token" | "user";

export type IssueStatus =
  | "BACKLOG"
  | "TO_DO"
  | "IN_PROGRESS"
  | "DONE"
  | "CANCELLED";

export type IssuePriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type LoginResponse = {
  [key in AuthResponse]: string | User;
};
