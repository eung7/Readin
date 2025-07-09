import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";

export default function SearchLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="search" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
