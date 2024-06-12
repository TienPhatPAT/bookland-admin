export enum StatusArticle {
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished",
  DRAFT = "draft",
}

export interface Subscriptions {
  id: string;
  createdAt: string;
  createdBy: string;
  description: string;
  name: string;
  featureList: Array<{
    content: string;
    title: string;
  }>;
  price: Array<{
    amount: number | undefined;
    count: number | undefined;
    interval: string | undefined;
    name?: string;
    description?: string;
  }>;
  updatedAt: string;
  updatedBy: string | null;
  status: string;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
  };
  updater: string | null;
}

export interface PostSubscriptionsRequest {
  id?: string;
  description: string;
  featureList: {
    content: string;
    title: string;
  }[];
  price: {
    name: string;
    amount: number | undefined;
    count: number | undefined;
    interval: string | undefined;
    description: string;
  }[];
  name?: string;
  status: string;
  isEdit?: boolean;
}
