/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from "@/constants";
import APIInstance from "@/utils/apiConfig";

import { IFormLogin, LoginResponse } from "@/models/auth";

const authApi = {
  login: async (data: IFormLogin): Promise<LoginResponse> => {
    const response = await APIInstance.post(API.AUTH.LOGIN, data);
    return response.data;
  },
  refreshToken(payload: { refreshToken: string }): Promise<any> {
    return APIInstance.post(API.AUTH.REFRESH_TOKEN, payload);
  },
  logout: async (): Promise<LoginResponse> => {
    const response = await APIInstance.post(API.AUTH.LOGOUT);
    return response.data;
  },
};
export default authApi;
