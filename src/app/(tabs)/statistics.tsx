import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Body02, Container, Display03 } from "../../components/Typography";

export default function StatisticsScreen() {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Container>
        <Display03 style={{ marginTop: 60, marginBottom: 24 }}>
          {t("statistics.title")}
        </Display03>
        <Body02>{t("statistics.description")}</Body02>
      </Container>
    </View>
  );
}
