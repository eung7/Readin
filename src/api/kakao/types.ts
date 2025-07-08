export interface BookSearchResponse {
  /** 응답 관련 정보 */
  meta: Meta;
  /** 응답 결과 */
  documents: Document[];
}

export interface Meta {
  /** 검색된 문서 수 */
  total_count: number;
  /** 중복된 문서를 제외하고, 처음부터 요청 페이지까지의 노출 가능 문서 수 */
  pageable_count: number;
  /** 현재 페이지가 마지막 페이지인지 여부, 값이 false면 page를 증가시켜 다음 페이지를 요청할 수 있음 */
  is_end: boolean;
}

export interface Document {
  /** 도서 제목 */
  title: string;
  /** 도서 소개 */
  contents: string;
  /** 도서 상세 URL */
  url: string;
  /** ISBN10 또는 ISBN13 형식의 국제 표준 도서번호, 두 값이 모두 제공될 경우 공백(' ')으로 구분 */
  isbn: string;
  /** 도서 출판날짜, ISO 8601 형식 [YYYY]-[MM]-[DD]T[hh]:[mm]:[ss].000+[tz] */
  datetime: string;
  /** 도서 저자 리스트 */
  authors: string[];
  /** 도서 출판사 */
  publisher: string;
  /** 도서 번역자 리스트 */
  translators: string[];
  /** 도서 정가 */
  price: number;
  /** 도서 판매가 */
  sale_price: number;
  /** 도서 표지 미리보기 URL */
  thumbnail: string;
  /** 도서 판매 상태 정보 (정상, 품절, 절판 등) - 단순 노출 요소로 활용 권장 */
  status: string;
}

// 기존 Book 인터페이스 별칭 (하위 호환성을 위해)
export type Book = Document;

export interface BookSearchParams {
  /** 검색을 원하는 질의어 (필수) */
  query: string;
  /** 결과 문서 정렬 방식 (기본값: accuracy) */
  sort?: "accuracy" | "latest";
  /** 결과 페이지 번호 (1~50, 기본값: 1) */
  page?: number;
  /** 한 페이지에 보여질 문서 수 (1~50, 기본값: 10) */
  size?: number;
  /** 검색 필드 제한 */
  target?: "title" | "isbn" | "publisher" | "person";
}

export const DEFAULT_SEARCH_PARAMS = {
  sort: "accuracy" as const,
  page: 1,
  size: 10,
} as const;
