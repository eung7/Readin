import { apiClient } from "./client";
import {
  BookSearchParams,
  BookSearchResponse,
  DEFAULT_SEARCH_PARAMS,
} from "./types";

// 카카오 도서 검색 API
export const kakaoBookApi = {
  /**
   * 도서 검색
   * @param params 검색 파라미터
   * @returns 검색 결과
   */
  searchBooks: async (
    params: BookSearchParams
  ): Promise<BookSearchResponse> => {
    const searchParams = {
      ...DEFAULT_SEARCH_PARAMS,
      ...params,
    };

    // 파라미터 검증
    if (!searchParams.query || searchParams.query.trim() === "") {
      throw new Error("검색어를 입력해주세요.");
    }

    const response = await apiClient.get<BookSearchResponse>(
      "/v3/search/book",
      {
        params: searchParams,
      }
    );

    return response.data;
  },
};

// 기본 export
export default kakaoBookApi;
