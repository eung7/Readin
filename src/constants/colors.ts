// Primary 색상
export const primary = {
  100: "#F5F7F6",
  200: "#E8EEEA",
  300: "#DBE5DE",
  400: "#CEDCD3",
  500: "#C1D3C7",
  600: "#A4B5AB",
  700: "#87978F",
  800: "#6A7973",
  900: "#4D5B57",
} as const;

// Gray 색상
export const gray = {
  // 매우 밝은 그레이
  50: "#FAFAFA",
  100: "#F5F5F5",
  200: "#E5E5E5",
  300: "#D4D4D4",

  // 중간 그레이
  400: "#A3A3A3",
  500: "#737373",
  600: "#525252",

  // 어두운 그레이
  700: "#404040",
  800: "#262626",
  900: "#171717",

  // 순수 색상
  white: "#FFFFFF",
  black: "#000000",

  // 특별한 그레이
  border: "#E5E5E5",
  input: "#F5F5F5",
  disabled: "#A3A3A3",
  placeholder: "#9CA3AF",

  // 텍스트용 그레이
  text_primary: "#171717",
  text_secondary: "#525252",
  text_tertiary: "#737373",
  text_disabled: "#A3A3A3",

  // 배경용 그레이
  bg_primary: "#FFFFFF",
  bg_secondary: "#FAFAFA",
  bg_tertiary: "#F5F5F5",
  bg_overlay: "rgba(0, 0, 0, 0.5)",
} as const;

// 테마 타입 정의
export type PrimaryColors = typeof primary;
export type GrayColors = typeof gray;
