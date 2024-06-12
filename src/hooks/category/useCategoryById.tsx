import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { BookType } from "@/models/book";
import { ApiResponseDetail } from "@/models/common";
import { NotifyService } from "@/helpers/notify";

import { BookApi } from "@/services/books.api";

function useCategoryById(id: string | undefined): UseQueryResult<ApiResponseDetail<BookType>> {
  return useQuery({
    queryKey: [queryKeys.bookDetail, id],
    queryFn: async () => {
      if (id) {
        return await BookApi.getDetail(id).catch((error) => {
          NotifyService.error(error);
        });
      }
    },
  });
}

export default useCategoryById;
