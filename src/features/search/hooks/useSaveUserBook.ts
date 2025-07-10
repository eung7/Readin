import { upsertBook } from "@/src/api/books";
import { Document } from "@/src/api/kakao/types";
import { upsertUserBook } from "@/src/api/user-books";
import { CreateUserBookData } from "@/src/api/user-books/types";
import { useMutation } from "@tanstack/react-query";

interface SaveUserBookData extends CreateUserBookData {
  book: Document;
}

export const useSaveUserBook = () => {
  const mutation = useMutation({
    mutationFn: async (data: SaveUserBookData) => {
      console.log("data", data);
      const bookData = await upsertBook(data.book);

      if (!bookData) {
        throw new Error("Failed to save book data");
      }

      // 2. 그 다음 User-Books 테이블에 사용자 책 정보 저장
      return await upsertUserBook({
        bookId: data.bookId,
        userId: data.userId,
        status: data.status,
        rating: data.rating,
        comment: data.comment,
      });
    },
  });

  return mutation;
};
