import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { PostBookRequest } from "@/models/book";
import { NotifyService } from "@/helpers/notify";

import { BookApi } from "@/services/books.api";

const useEditCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PostBookRequest) => {
      return BookApi.edit(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.book] });
      NotifyService.success("Success");
    },
    onError: (e) => {
      NotifyService.error(e);
    },
  });
};

export default useEditCategory;
