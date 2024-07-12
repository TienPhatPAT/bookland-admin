import { CommonParams } from "./common";

export interface UserType {
  _id: string;
  loaitaikhoan: number;
  password: string;
  email: string;
  ten: string;
  gioitinh: number;
  avt: string;
  sdt: string;
  ngaytao: string;
  is_active: boolean;
  __v: number;
}

export interface GetUserParams extends CommonParams {
  f_name?: string;
}

export interface PostUserRequest {
  id_user?: string;
  ten?: string;
  password: string;
  email: string;
  gioitinh?: number;
  avt?: string;
  sdt?: string;
  ngaytao?: string;
  loaitaikhoan?: number;
  is_active: boolean;
}
