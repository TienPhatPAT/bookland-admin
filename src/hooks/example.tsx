import { useQuery } from "@tanstack/react-query";

import { ExampleApi } from "@/services/example.api";

export const useGetExample = (params?: { version: string; helpers: string }) => {
  return useQuery({
    queryKey: [{}, params],
    queryFn: () => {
      return params
        ? ExampleApi.getExample({
            version: params.version,
            helpers: params.helpers,
          }).catch(() => {})
        : null;
    },
  });
};
