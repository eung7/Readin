import { TablesInsert } from "@/src/types/supabase";
import { supabase } from "@/src/utils/supabase";
import { BookStatus, CreateUserBookData, UpdateUserBookData } from "./types";

/**
 * 유저의 책 정보를 생성하거나 업데이트
 */
export const upsertUserBook = async (data: CreateUserBookData) => {
  const userBookData: TablesInsert<"user_books"> = {
    book_id: data.bookId,
    user_id: data.userId,
    status: data.status,
    rating: data.rating,
    comment: data.comment,
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
};

/**
 * 유저의 책 정보 조회
 */
export const getUserBook = async (bookId: string, userId: string) => {
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
};

/**
 * 유저의 책 정보 업데이트
 */
export const updateUserBook = async (
  bookId: string,
  userId: string,
  updateData: UpdateUserBookData
) => {
  const { data, error } = await supabase
    .from("user_books")
    .update(updateData)
    .eq("book_id", bookId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.log("Error updating user book:", error);
    throw error;
  }

  return data;
};

/**
 * 유저의 모든 책 조회 (상태별 필터링 가능)
 */
export const getUserBooks = async (userId: string, status?: BookStatus) => {
  let query = supabase
    .from("user_books")
    .select(`*, books (id, title, authors, thumbnail, publisher)`)
    .eq("user_id", userId);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.log("Error getting user books:", error);
    throw error;
  }

  return data;
};

/**
 * 유저의 책 삭제
 */
export const deleteUserBook = async (bookId: string, userId: string) => {
  const { data, error } = await supabase
    .from("user_books")
    .delete()
    .eq("book_id", bookId)
    .eq("user_id", userId);

  if (error) {
    console.log("Error deleting user book:", error);
    throw error;
  }

  return data;
};
