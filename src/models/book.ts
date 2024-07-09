import { CommonParams } from "./common";

export interface BookType {
  _id: string;
  tacgia: string;
  nxb: string;
  img: string;
  description: string;
  ngayxuatban: string;
  ngaytao: string;
  isRecommended: boolean;
  name: string;
  view: number;
  price: number;
  recomendedPriority: number;
  star: number;
  sold: number;
  theloai: string[];
  hien_thi: boolean;
  __v: number;
}

export interface GetBookParams extends CommonParams {
  f_name?: string;
}

export interface PostBookRequest {
  id?: string;
  id_tacgia?: string;
  nxb?: string;
  img: string;
  description?: string;
  ngayxuatban?: string;
  ngaytao?: string;
  isRecommended: boolean;
  name: string;
  view: number;
  price: number;
  recomendedPriority: number;
  star: number;
  sold: number;
  language?: string;
  hien_thi: boolean;
}
