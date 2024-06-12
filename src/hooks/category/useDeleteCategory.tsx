import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { NotifyService } from "@/helpers/notify";

import { BookApi } from "@/services/books.api";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { ids: string[] }) => {
      return BookApi.delete(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.book] });
      NotifyService.success("Category deleted successfully");
    },
    onError: (e) => {
      NotifyService.error(e);
    },
  });
};

export default useDeleteCategory;
