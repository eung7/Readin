import { theme } from "@/common/theme";
import { Body02, Container, Display03 } from "@/components/Typography";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function MyScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: "ko" | "en") => {
    setLanguage(lang);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Container>
        <Display03 style={{ marginTop: 60, marginBottom: 24 }}>
          {t("my.title")}
        </Display03>
        <Body02 style={{ color: theme.colors.gray[500], marginBottom: 32 }}>
          {t("my.description")}
        </Body02>

        {/* 언어 설정 섹션 */}
        <View style={styles.settingsSection}>
          <Display03 style={{ marginBottom: 16, fontSize: 18 }}>
            {t("my.languageSettings")}
          </Display03>

          <View style={styles.languageOptions}>
            <TouchableOpacity
              style={[
                styles.languageOption,
                language === "ko" && styles.selectedLanguageOption,
              ]}
              onPress={() => handleLanguageChange("ko")}
            >
              <Body02
                style={[
                  styles.languageText,
                  language === "ko" && styles.selectedLanguageText,
                ]}
              >
                {t("my.korean")}
              </Body02>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.languageOption,
                language === "en" && styles.selectedLanguageOption,
              ]}
              onPress={() => handleLanguageChange("en")}
            >
              <Body02
                style={[
                  styles.languageText,
                  language === "en" && styles.selectedLanguageText,
                ]}
              >
                {t("my.english")}
              </Body02>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsSection: {
    marginBottom: 32,
  },
  languageOptions: {
    flexDirection: "row",
    gap: 12,
  },
  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.gray.white,
  },
  selectedLanguageOption: {
    borderColor: theme.colors.primary[700],
    backgroundColor: theme.colors.primary[100],
  },
  languageText: {
    color: theme.colors.gray[700],
  },
  selectedLanguageText: {
    color: theme.colors.primary[700],
    fontWeight: "600",
  },
});
