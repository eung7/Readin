import { Body02, Container, Display03 } from "@/src/components/Typography";
import { useLanguage } from "@/src/contexts/LanguageProvider";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

export default function MyScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const theme = useTheme();

  const handleLanguageChange = (lang: "ko" | "en") => {
    setLanguage(lang);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Container>
        <Display03 style={{ marginTop: 60, marginBottom: 24 }}>
          {t("my.title")}
        </Display03>
        <Body02 style={{ marginBottom: 32 }}>{t("my.description")}</Body02>
      </Container>
    </View>
  );
}
