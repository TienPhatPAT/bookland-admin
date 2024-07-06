import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { NotifyService } from "@/helpers/notify";

import { BookApi } from "@/services/books.api";

const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return BookApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.book] });
      NotifyService.success("Book deleted successfully");
    },
    onError: (e) => {
      NotifyService.error(e);
    },
  });
};

export default useDeleteBook;
