import { User } from "@/context/AuthState";

export interface LoginUser {
  email: string;
  password: string;
}

type AuthResponse = 'token' | 'user';

export type LoginResponse = {
  [key in AuthResponse]: string | User;
};