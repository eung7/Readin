import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { createAnonymousUser } from "../api/user";
import { supabase } from "../utils/supabase";

export default function AuthLayout() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        SplashScreen.hideAsync();
      } else {
        supabase.auth.signInAnonymously().then(({ data }) => {
          if (data.user) {
            createAnonymousUser(data.user.id);
            SplashScreen.hideAsync();
          }
        });
      }
    });
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
