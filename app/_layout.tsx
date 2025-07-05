import { theme } from "@/constants/theme";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "@/locales/i18n";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.gray.white }}
          >
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
