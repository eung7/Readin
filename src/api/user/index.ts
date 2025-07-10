import { supabase } from "@/src/utils/supabase";

export const createAnonymousUser = async (userId: string) => {
  const { data, error } = await supabase.from("users").insert({
    id: userId,
    name: `Guest_${userId.substring(0, 8)}`,
    is_anonymous: true,
  });

  if (error) {
    throw error;
  }

  return data;
};
