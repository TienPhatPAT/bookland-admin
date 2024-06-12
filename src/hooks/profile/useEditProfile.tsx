import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { PostAdminRequest } from "@/models/admin";
import { NotifyService } from "@/helpers/notify";

import { ProfileApi } from "@/services/profile.api";

const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PostAdminRequest) => {
      return ProfileApi.editProfile(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.profile] });
      NotifyService.success("Profile edited successfully");
    },
    onError: (e) => {
      NotifyService.error(e);
    },
  });
};

export default useEditProfile;
