import { theme } from "@/src/constants/theme";
import { LanguageProvider } from "@/src/contexts/LanguageProvider";
import "@/src/i18n";
import { queryClient } from "@/src/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import AuthLayout from "../components/AuthLayout";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <AuthLayout />
          </SafeAreaProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
