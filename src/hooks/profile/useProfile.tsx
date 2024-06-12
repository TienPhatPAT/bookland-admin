import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { Admin } from "@/models/admin";
import { ApiResponseDetail } from "@/models/common";
import { NotifyService } from "@/helpers/notify";

import { ProfileApi } from "@/services/profile.api";

function useProfile(): UseQueryResult<ApiResponseDetail<Admin>> {
  return useQuery({
    queryKey: [queryKeys.profile],
    queryFn: async () => {
      return await ProfileApi.getProfile().catch((error) => {
        NotifyService.error(error);
      });
    },
  });
}

export default useProfile;
