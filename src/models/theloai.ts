import { CommonParams } from "./common";

export interface TheLoaiType {
  _id: string;
  id_tacgia: string;
  ten: string;
  img: string;
  tieusu: string;
  is_active: boolean;
  __v: number;
}

export interface GetTheLoaiParams extends CommonParams {
  f_name?: string;
}

export interface PostTheLoaiRequest {}
