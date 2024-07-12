import { API } from "@/constants";
import APIInstance from "@/utils/apiConfig";

import { ApiResponse } from "@/models/common";
import { GetUserParams, PostUserRequest, UserType } from "@/models/user";

export const UserApi = {
  getList: async (params: GetUserParams): Promise<ApiResponse<UserType>> => {
    return APIInstance.get(API.DASHBOARD.USER.LIST, { params: { ...params } }).then(
      (res) => res.data
    );
  },

  create: async (data: PostUserRequest): Promise<void> => {
    return APIInstance.post(API.DASHBOARD.USER.CREATE, data);
  },

  edit: async (data: PostUserRequest): Promise<void> => {
    return APIInstance.put(`${API.DASHBOARD.USER.EDIT}`, data);
  },

  delete: async (id: string) => {
    return APIInstance.delete(`${API.DASHBOARD.USER.DELETE}/${id}`);
  },
};
