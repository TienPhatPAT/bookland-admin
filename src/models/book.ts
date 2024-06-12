import { CommonParams } from "./common";

export interface BookType {
  id: string;
  slug: string;
  title: string;
  name: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetBookParams extends CommonParams {
  f_name?: string;
}

export interface PostBookRequest {
  id?: string;
  title: string;
  name: string;
  image: string;
  status: string;
}
