import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../common/theme";

export default function RootLayout() {
  return (
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
  );
}
