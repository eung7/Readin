import "styled-components/native";
import { GrayColors, PrimaryColors } from "./colors";

declare module "styled-components/native" {
  export interface DefaultTheme {
    primary: PrimaryColors;
    gray: GrayColors;
  }
}
