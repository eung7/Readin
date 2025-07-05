import { ScrollView, View } from "react-native";
import { theme } from "../../common/theme";
import { Body02, Container, Display03 } from "../../components/Typography";

export default function LibraryScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <Container>
          <Display03 style={{ marginTop: 60, marginBottom: 24 }}>
            라이브러리
          </Display03>
          <Body02 style={{ color: theme.colors.gray[500] }}>
            라이브러리 화면입니다. 여기에 읽은 책들과 독서 기록을 표시할
            예정입니다.
          </Body02>
        </Container>
      </ScrollView>
    </View>
  );
}
