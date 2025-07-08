import { kakaoBookApi } from "@/src/api/kakao/api";
import { BookSearchParams, BookSearchResponse } from "@/src/api/kakao/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

/**
 * 기본 책 검색 Hook
 */
export const useBookSearch = (params: BookSearchParams) => {
  console.log("params", params);
  return useQuery<BookSearchResponse>({
    queryKey: ["bookSearch", params],
    queryFn: () => kakaoBookApi.searchBooks(params),
    enabled: !!params.query?.trim(),
  });
};

/**
 * 무한 스크롤 책 검색 Hook
 */
export const useBookSearchInfinite = (params: BookSearchParams) => {
  return useInfiniteQuery<BookSearchResponse>({
    queryKey: ["bookSearchInfinite", params],
    queryFn: ({ pageParam = 1 }) =>
      kakaoBookApi.searchBooks({
        ...params,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.meta.is_end && allPages.length < 50) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: !!params.query?.trim(),
    initialPageParam: 1,
  });
};

export default useBookSearch;
