import { API } from "@/constants";
import APIInstance from "@/utils/apiConfig";

import { ApiResponse } from "@/models/common";
import { GetTacGiaParams, TacGiaType } from "@/models/tacgia";

export const TacGiaApi = {
  getList: async (params: GetTacGiaParams): Promise<ApiResponse<TacGiaType>> => {
    return APIInstance.get(API.DASHBOARD.TAC_GIA.LIST, { params: { ...params } }).then(
      (res) => res.data
    );
  },
};
