import { KakaoBookResponse } from "@/src/types/kakao";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface Params {
  query: string;
  sort?: "accuracy" | "latest";
  page?: number;
  size?: number;
  target?: "title" | "isbn" | "publisher" | "person";
}

const getKakaoBooks = async (params: Params) => {
  const queryParams = new URLSearchParams({
    query: params.query,
    sort: params.sort ?? "accuracy",
    page: params.page?.toString() ?? "1",
    size: params.size?.toString() ?? "20",
    target: params.target ?? "title", // 검색 필드 제한
  });

  const response = await fetch(
    `https://dapi.kakao.com/v3/search/book?${queryParams}`,
    {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${process.env.EXPO_PUBLIC_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const useSearchKakaoBook = (params: Params) => {
  return useQuery<KakaoBookResponse>({
    queryKey: ["kakao-books", params],
    queryFn: () => getKakaoBooks(params),
    enabled: !!params.query,
  });
};

export const useInfiniteSearchKakaoBook = (params: Params) => {
  return useInfiniteQuery<KakaoBookResponse>({
    queryKey: ["kakao-books", params],
    queryFn: ({ pageParam = 1 }) =>
      getKakaoBooks({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.meta.is_end && allPages.length < 50) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: !!params.query,
    initialPageParam: 1,
  });
};
