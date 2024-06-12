import { CommonParams } from "./common";

export interface Admin {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAdminListParams extends CommonParams {
  f_email?: string;
  f_username?: string;
}

export interface PostAdminRequest {
  id?: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  status: string;
  picture?: string;
  email: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
