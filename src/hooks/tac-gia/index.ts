import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { GetTacGiaParams } from "@/models/tacgia";
import { NotifyService } from "@/helpers/notify";

import { TacGiaApi } from "@/services/tac-gia.api";

export const useTacGia = () => {
  const useGetList = (params: GetTacGiaParams) => {
    const { data, ...rest } = useQuery({
      queryKey: [queryKeys.tac_gia.list, params],
      queryFn: async () => {
        return await TacGiaApi.getList({
          ...params,
        }).catch((error) => {
          NotifyService.error(error);
        });
      },
      placeholderData: keepPreviousData,
    });

    return { data, ...rest };
  };

  return { useGetList };
};
