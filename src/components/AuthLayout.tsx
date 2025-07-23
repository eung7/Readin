import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useCreateAnonymous } from "../hooks/queries/auth/useCreateAnonymous";
import { supabase } from "../utils/supabase";

export default function AuthLayout() {
  const { mutate: createAnonymous } = useCreateAnonymous();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        SplashScreen.hideAsync();
      } else {
        supabase.auth.signInAnonymously().then(({ data }) => {
          if (data.user) {
            createAnonymous(data.user.id);
            SplashScreen.hideAsync();
          }
        });
      }
    });
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
