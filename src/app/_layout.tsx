import { queryClient } from "@/src/api/queryClient";
import { theme } from "@/src/constants/theme";
import { LanguageProvider } from "@/src/contexts/LanguageContext";
import "@/src/locales/i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: theme.gray.white }}
            >
              <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
