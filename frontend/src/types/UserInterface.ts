import { Role } from "./common";

export interface UserInterface {
  user_id: string;
  full_name: string;
  email: string;
  is_active: string;
  role: string;
  last_login: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserLoginPayload {
  username: string;
  password: string;
}

export interface UserRegisterPayload {
  full_name: string;
  email: string;
  password: string;
  role: Role | Role.GUEST;
}

export interface UserDetail {
  user_id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  role: string;
  last_login: Date;
}