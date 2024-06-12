export enum ELogin {
  username = "username",
  password = "password",
}

export enum EResetPassword {
  password = "new_password",
  confirmPassword = "confirmPassword",
  resetPasswordToken = "reset_password_token",
}

export interface IFormLogin {
  [ELogin.username]: string;
  [ELogin.password]: string;
}

export interface Administrator {
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
  deletedAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface Data {
  admin: Administrator;
  tokens: Tokens;
}

export interface LoginResponse {
  message: string;
  data: Data;
}
