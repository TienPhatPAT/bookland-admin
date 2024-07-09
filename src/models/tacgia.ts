import { CommonParams } from "./common";

export interface TacGiaType {
  _id: string;
  id_tacgia: string;
  ten: string;
  img: string;
  tieusu: string;
  is_active: boolean;
  __v: number;
}

export interface GetTacGiaParams extends CommonParams {
  f_name?: string;
}

export interface PostTacGiaRequest {}
