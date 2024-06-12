import { useMutation } from "@tanstack/react-query";

import { IChangePassword } from "@/models/admin";
import { NotifyService } from "@/helpers/notify";

import { ProfileApi } from "@/services/profile.api";

const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: IChangePassword) => {
      return ProfileApi.changePassword(payload);
    },
    onSuccess: () => {
      NotifyService.success("Profile edited successfully");
    },
    onError: (e) => {
      NotifyService.error(e);
    },
  });
};

export default useChangePassword;
