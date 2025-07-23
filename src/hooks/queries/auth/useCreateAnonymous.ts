import { supabase } from "@/src/utils/supabase";
import { useMutation } from "@tanstack/react-query";

export const useCreateAnonymous = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase
        .from("users")
        .insert({
          id: userId,
          name: `Guest_${userId.substring(0, 8)}`,
          is_anonymous: true,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
