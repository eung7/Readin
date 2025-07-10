import { getUserBook } from "@/src/api/user-books";
import { useQuery } from "@tanstack/react-query";

export const useUserBook = (userId?: string, bookId?: string) => {
  const { data: userBook, isLoading } = useQuery({
    queryKey: ["book", userId, bookId],
    queryFn: async () => {
      const userBook = await getUserBook(bookId!, userId!);
      return userBook;
    },
    enabled: !!userId && !!bookId,
    staleTime: 0, // 데이터가 즉시 stale 상태가 됨
    gcTime: 0, // 캐시를 즉시 삭제 (React Query v4+)
    refetchOnMount: "always", // 마운트 시 항상 다시 가져오기
    refetchOnWindowFocus: true, // 윈도우 포커스 시 다시 가져오기
    refetchOnReconnect: true, // 재연결 시 다시 가져오기
  });

  return { userBook, isLoading };
};
