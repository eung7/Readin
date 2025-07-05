import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import "../common/i18n";
import { theme } from "../common/theme";
import { LanguageProvider } from "../providers/LanguageProvider";

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
