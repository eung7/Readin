import { BookStatus } from "@/src/types/book";
import { KakaoBook } from "@/src/types/kakao";
import { TablesInsert } from "@/src/types/supabase";
import { supabase } from "@/src/utils/supabase";
import { useMutation } from "@tanstack/react-query";

export interface UpsertUserBookParams {
  kakaoBook?: KakaoBook;
  bookId: string;
  userId: string;
  status: BookStatus | null;
  rating: number;
  comment: string | null;
}

export const useUpsertUserBook = () => {
  const mutation = useMutation({
    mutationFn: async (param: UpsertUserBookParams) => {
      // 만약 검색된 책을 저장하려고 하는 경우, books 테이블에 해당 책을 저장한다.
      if (param.kakaoBook) {
        await supabase.from("books").upsert(
          {
            isbn: param.kakaoBook.isbn,
            title: param.kakaoBook.title,
            contents: param.kakaoBook.contents,
            url: param.kakaoBook.url,
            datetime: param.kakaoBook.datetime,
            authors: param.kakaoBook.authors,
            publisher: param.kakaoBook.publisher,
            translators: param.kakaoBook.translators,
            price: param.kakaoBook.price,
            sale_price: param.kakaoBook.sale_price,
            thumbnail: param.kakaoBook.thumbnail,
          },
          {
            onConflict: "isbn",
            ignoreDuplicates: false,
          }
        );
      }

      const userBookData: TablesInsert<"user_books"> = {
        book_id: param.bookId,
        user_id: param.userId,
        status: param.status,
        rating: param.rating,
        comment: param.comment,
      };

      const { data: result, error } = await supabase
        .from("user_books")
        .upsert(userBookData, {
          onConflict: "book_id, user_id",
          ignoreDuplicates: false,
        })
        .select()
        .single();

      if (error) {
        console.log("Error upserting user book:", error);
      }

      return result;
    },
  });

  return mutation;
};
