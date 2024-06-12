import { API } from "@/constants";
import APIInstance from "@/utils/apiConfig";

import { BookType, GetBookParams, PostBookRequest } from "@/models/book";
import { ApiResponse, ApiResponseDetail } from "@/models/common";

export const BookApi = {
  getList: async (params: GetBookParams): Promise<ApiResponse<BookType>> => {
    return APIInstance.get(API.DASHBOARD.BOOK.LIST, { params: { ...params } }).then(
      (res) => res.data
    );
  },
  getDetail: async (id: string): Promise<ApiResponseDetail<BookType>> => {
    return APIInstance.get(`${API.DASHBOARD.BOOK.DETAIL}/${id}`);
  },

  create: async (data: PostBookRequest): Promise<void> => {
    return APIInstance.post(API.DASHBOARD.BOOK.CREATE, data);
  },

  edit: async (data: PostBookRequest): Promise<void> => {
    const { id, ...rest } = data;
    return APIInstance.put(`${API.DASHBOARD.BOOK.EDIT}/${id}`, rest);
  },

  delete: async (data: { ids: string[] }) => {
    return APIInstance.delete(`${API.DASHBOARD.BOOK.DELETE}`, { data });
  },
};
