import { API } from "@/constants";
import APIInstance from "@/utils/apiConfig";

import { BookType, GetBookParams, PostBookRequest } from "@/models/book";
import { ApiResponse } from "@/models/common";

export const BookApi = {
  getList: async (params: GetBookParams): Promise<ApiResponse<BookType>> => {
    return APIInstance.get(API.DASHBOARD.BOOK.LIST, { params: { ...params } }).then(
      (res) => res.data
    );
  },

  create: async (data: PostBookRequest): Promise<void> => {
    return APIInstance.post(API.DASHBOARD.BOOK.CREATE, data);
  },

  edit: async (data: PostBookRequest): Promise<void> => {
    const { id, ...rest } = data;
    return APIInstance.put(`${API.DASHBOARD.BOOK.EDIT}/${id}`, rest);
  },

  delete: async (id: string) => {
    return APIInstance.delete(`${API.DASHBOARD.BOOK.DELETE}/${id}`);
  },
};
