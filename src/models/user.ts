import { CommonParams } from "./common";

export interface UserType {
  id_user: string;
  loaitaikhoan: number;
  password: string;
  email: string;
  ten: string;
  mieuta: string;
  language: string;
  ngayxuatban: string;
  ngaytao: string;
  isbn: string;
  page_count: number;
  dexuat: boolean;
}

export interface GetUserParams extends CommonParams {
  f_name?: string;
}

export interface PostUserRequest {
  id?: string;
  title: string;
  name: string;
  image: string;
  status: string;
}
