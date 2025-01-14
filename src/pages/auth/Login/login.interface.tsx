export interface LoginUser {
  email: string;
  password: string;
}

export interface LoggedInUserInfo {
  publicId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string;
  username: string;
  ownedProjects?: string[];
  coOwnedProjects?: string[];
  projectsAsTeamMember?: string[];
}

export interface LoginResponse {
  [key: string]: string | LoggedInUserInfo;
}