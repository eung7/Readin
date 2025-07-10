import { Stack } from "expo-router";
import { useTheme } from "styled-components/native";

export default function SearchLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
