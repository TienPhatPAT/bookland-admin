import { CommonParams } from "./common";

export interface StaticContentType {
  category: string;
  content: string;
  created_at: string | Date;
  hasContent: boolean;
  id: string;
  slug: string;
  isRequired: boolean;
  status: string;
  title: string;
  updated_at: string | Date;
}

export interface GetStaticContentParams extends CommonParams {
  f_category?: string;
  f_title?: string;
}

export interface PostStaticContentRequest {
  id?: string;
  title: string;
  category: string;
  slug?: string;
  content?: string;
  isRequired: boolean;
  hasContent: boolean;
}
