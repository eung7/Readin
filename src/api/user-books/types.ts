import { Tables, TablesInsert } from "@/src/types/supabase";
import { supabase } from "@/src/utils/supabase";

export type BookStatus = "wishlist" | "reading" | "completed" | "stopped";
export type UserBook = Tables<"user_books">;

export interface CreateUserBookData {
  bookdId: string;
  userId: string;
  status?: BookStatus;
  rating?: number;
  comment?: string;
}

export interface UpdateUserBookData {
  status?: BookStatus;
  rating?: number;
  comment?: string;
}

