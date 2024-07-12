import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { GetUserParams, PostUserRequest } from "@/models/user";
import { NotifyService } from "@/helpers/notify";

import { UserApi } from "@/services/user.api";

export const useUser = () => {
  const queryClient = useQueryClient();
  const useGetList = (params: GetUserParams) => {
    const { data, ...rest } = useQuery({
      queryKey: [queryKeys.user.list, params],
      queryFn: async () => {
        return await UserApi.getList({
          ...params,
        }).catch((error) => {
          NotifyService.error(error);
        });
      },
      placeholderData: keepPreviousData,
    });

    return { data, ...rest };
  };

  const create = useMutation({
    mutationKey: [queryKeys.user.add],
    mutationFn: (payload: PostUserRequest) => {
      return UserApi.create(payload);
    },
    onSuccess: () => {
      NotifyService.success("Created successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.list] });
    },
    onError: (error) => {
      NotifyService.error(error);
    },
  });

  const update = useMutation({
    mutationKey: [queryKeys.user.edit],
    mutationFn: (payload: PostUserRequest) => {
      return UserApi.edit(payload);
    },
    onSuccess: () => {
      NotifyService.success("Updated successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.list] });
    },
    onError: (error) => {
      NotifyService.error(error);
    },
  });

  const del = useMutation({
    mutationKey: [queryKeys.user.delete],
    mutationFn: async (id: string) => {
      return UserApi.delete(id).catch((error) => {
        NotifyService.error(error);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.list] });
      NotifyService.success("deleted successfully");
    },
  });

  return { useGetList, update, create, del };
};
