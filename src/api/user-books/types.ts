import { Tables } from "@/src/types/supabase";

export type BookStatus = "wishlist" | "reading" | "read" | "paused";
export type UserBook = Tables<"user_books">;

export interface CreateUserBookData {
  bookId: string;
  userId: string;
  status: BookStatus | null;
  rating: number;
  comment: string | null;
}

export interface UpdateUserBookData {
  status: BookStatus | null;
  rating: number;
  comment: string | null;
}
