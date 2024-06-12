import { OptionItem } from "./common";

export enum StatusArticle {
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished",
  DRAFT = "draft",
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  picture: string;
  content: string;
  status: string;
  type: string;
  authorId: string;
  categoryId: string;
  timeToRead: number | undefined;
  createdAt: string;
  updatedAt: string;
  category: OptionItem;
  author: string;
  role?: boolean;
}

export interface PostArticleRequest {
  categoryId: string;
  content: string;
  picture: string;
  status: string;
  timeToRead: number;
  title: string;
  type: string;
  author: string;
  isEdit?: boolean;
  id?: string;
  category?: OptionItem;
}
