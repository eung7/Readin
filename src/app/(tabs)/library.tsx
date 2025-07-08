import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Body02, Container, Display03 } from "../../components/Typography";

export default function LibraryScreen() {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <Container>
          <Display03 style={{ marginTop: 60, marginBottom: 24 }}>
            {t("library.title")}
          </Display03>
          <Body02>{t("library.description")}</Body02>
        </Container>
      </ScrollView>
    </View>
  );
}
