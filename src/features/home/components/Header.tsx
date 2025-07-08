import { Headline } from "@/src/components/Typography";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

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
    <Container>
      <Headline>{title}</Headline>

      {showSearchButton && (
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={onSearchPress}
        >
          <Ionicons name="search" size={24} />
        </TouchableOpacity>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray.border};
`;
