export interface AladinResponse {
  itemsPerPage: number;
  totalResults: number;
  item: AladinBook[];
}

export interface AladinBook {
  title: string;
  link: string;
  author: string;
  pubdate: string;
  description: string;
  isbn: string;
  isbn13: string;
  pricesales: number;
  pricestandard: number;
  mallType: "BOOK" | "MUSIC" | "DVD" | "FOREIGN" | "EBOOK" | "USED";
  stockstatus: string;
  mileage: number;
  cover: string;
  publisher: string;
  salesPoint: number;
  adult: boolean;
  fixedPrice: boolean;
  subbarcode: string;
  customerReviewRank: number;
  bestDuration?: string;
  bestRank?: number;
}
