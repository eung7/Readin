export interface KakaoBookResponse {
  meta: KakaoMeta;
  documents: KakaoBook[];
}

export interface KakaoMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface KakaoBook {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}
