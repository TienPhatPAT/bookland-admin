import { API } from "@/constants";
import APIInstance from "@/utils/apiConfig";

import { Admin, IChangePassword, PostAdminRequest } from "@/models/admin";
import { ApiResponseDetail } from "@/models/common";

export const ProfileApi = {
  getProfile: async (): Promise<ApiResponseDetail<Admin>> => {
    return APIInstance.get(`${API.DASHBOARD.PROFILE}`);
  },

  editProfile: async (data: PostAdminRequest): Promise<void> => {
    return APIInstance.put(`${API.DASHBOARD.PROFILE}`, data);
  },

  changePassword: async (data: IChangePassword): Promise<void> => {
    return APIInstance.patch(`${API.DASHBOARD.PROFILE}`, data);
  },
};
