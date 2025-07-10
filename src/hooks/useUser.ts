import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

const fetchUser = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Error getting user:", error);
    throw error;
  }

  return data.user;
};

export const useUser = () => {
  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (error) {
    console.log("Error getting user:", error);
    throw error;
  }

  return { user: data };
};
