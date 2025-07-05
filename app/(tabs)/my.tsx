import { View } from "react-native";
import { theme } from "../../common/theme";
import { Body02, Container, Display03 } from "../../components/Typography";

export default function MyScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Container>
        <Display03 style={{ marginTop: 60, marginBottom: 24 }}>마이</Display03>
        <Body02 style={{ color: theme.colors.gray[500] }}>
          마이 화면입니다. 여기에 프로필 설정과 개인 정보를 표시할 예정입니다.
        </Body02>
      </Container>
    </View>
  );
}
