export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Organization {
  name: string;
  description: string;
  slug: string;
}
