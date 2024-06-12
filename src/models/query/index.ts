export enum EQueryParams {
  TimeZone = "TimeZone",
  ContentType = "Content-Type",
}

export enum ESortKey {
  ASC = "ASC",
  DESC = "DESC",
}

export enum ECheckSortKey {
  ASC = "asc",
  DESC = "desc",
}

export type ISortKey = ESortKey.ASC | ESortKey.DESC | string;

export interface IQueryString {
  page: number;
  limit: number;
  totalCount?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: Record<string, any>;
  search?: string;
  orderBy?: ISortKey;
  sortBy?: string;
  sort?: string;
  // scroll
  reset?: boolean;
  // admin
  f_email?: string;
  f_username?: string;
  f_author?: string;
  f_category?: string;
  f_title?: string;
  f_type?: string;
}

export const InitialQuery: IQueryString = {
  limit: 25,
  page: 1,
  // sort: "-createdAt",
  // totalCount: 10,
  // totalPages: 1,
  // hasNextPage: false,
};

export const AllQuery: IQueryString = {
  limit: 9999,
  page: 1,
  // totalCount: 10,
  // totalPages: 1,
  // hasNextPage: false,
};

export interface IListResponse<T> {
  meta: {
    total: number;
    count: number;
  };
  rows: T[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dataInital: IListResponse<any> = {
  meta: {
    total: 0,
    count: 0,
  },
  rows: [],
};

export interface FilterProps {
  query: IQueryString;
  setFilter: (param: Partial<IQueryString>) => void;
}
