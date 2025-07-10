import { TablesInsert } from "@/src/types/supabase";
import { supabase } from "@/src/utils/supabase";
import { Document } from "../kakao/types";

/**
 * 카카오 검색 API의 Document를 Supabase books 테이블 형식으로 변환
 */
export const transformKakaoBookToSupabase = (
  kakaoBook: Document
): TablesInsert<"books"> => {
  return {
    isbn: kakaoBook.isbn,
    title: kakaoBook.title,
    contents: kakaoBook.contents,
    url: kakaoBook.url,
    datetime: kakaoBook.datetime,
    authors: kakaoBook.authors,
    publisher: kakaoBook.publisher,
    translators: kakaoBook.translators,
    price: kakaoBook.price,
    sale_price: kakaoBook.sale_price,
    thumbnail: kakaoBook.thumbnail,
  };
};

/**
 * 검색된 책 정보를 books 테이블에 저장
 * 이미 존재하는 책이면 업데이트하고, 없으면 새로 생성
 */
export const upsertBook = async (kakaoBook: Document) => {
  const bookData = transformKakaoBookToSupabase(kakaoBook);

  const { data, error } = await supabase
    .from("books")
    .upsert(bookData, {
      onConflict: "isbn",
      ignoreDuplicates: false,
    })
    .select()
    .single();

  if (error) {
    console.log("Error upserting book:", error);
  }

  return data;
};

/**
 * ISBN으로 책 정보 조회
 */
export const getBookByIsbn = async (isbn: string) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("isbn", isbn)
    .single();

  if (error && error.code !== "PGRST116") {
    console.log("Error getting book by isbn:", error);
  }

  return data;
};

/**
 * ID로 책 정보 조회
 */
export const getBookById = async (id: string) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.log("Error getting book by id:", error);
  }

  return data;
};
