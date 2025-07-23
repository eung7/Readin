import { AladinResponse } from "@/src/types/aladin";
import { aladinApi } from "@/src/utils/aladin";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Parameter {
  query: string;
  cover: "Big" | "MidBig" | "Mid" | "Small" | "Mini" | "None";
}

export const useGetAladinBook = (params: Parameter) => {
  return useInfiniteQuery({
    queryKey: ["aladin", "book", params],
    queryFn: ({ pageParam = 1 }) => {
      return aladinApi.get<AladinResponse>("/itemSearch.aspx", {
        params: {
          ...params,
          maxResults: 20,
          start: pageParam,
        },
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.itemsPerPage === 20) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
    enabled: !!params.query,
  });
};
