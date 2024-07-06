/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useQuery, UseQueryResult } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { BookType, GetBookParams } from "@/models/book";
import { ApiResponse } from "@/models/common";
import { NotifyService } from "@/helpers/notify";

import { BookApi } from "@/services/books.api";

function useListBook(params: GetBookParams = {}): UseQueryResult<ApiResponse<BookType>, any> {
  return useQuery({
    queryKey: [queryKeys.book, params],
    queryFn: async () => {
      return await BookApi.getList({
        ...params,
      }).catch((error) => {
        NotifyService.error(error);
      });
    },
    placeholderData: keepPreviousData,
  });
}

export default useListBook;
