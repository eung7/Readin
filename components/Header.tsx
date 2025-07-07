import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Headline } from "./Typography";

interface HeaderProps {
  title: string;
  onSearchPress?: () => void;
  showSearchButton?: boolean;
}

export default function Header({
  title,
  onSearchPress,
  showSearchButton = true,
}: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[200],
        backgroundColor: "#fff",
      }}
    >
      <Headline style={{ color: theme.colors.gray[900] }}>{title}</Headline>

      {showSearchButton && (
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={onSearchPress}
        >
          <Ionicons name="search" size={24} color={theme.colors.gray[700]} />
        </TouchableOpacity>
      )}
    </View>
  );
}
