import { supabase } from "@/src/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBook = (userId?: string, bookId?: string) => {
  const { data: userBook, isLoading } = useQuery({
    queryKey: ["book", userId, bookId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_books")
        .select("*")
        .eq("book_id", bookId)
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.log("Error getting user book:", error);
        throw error;
      }

      return data;
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
