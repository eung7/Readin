import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en-US/translation.json";
import ko from "./locales/ko-KR/translation.json";

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
};

const deviceLanguage = getLocales()[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage.startsWith("ko") ? "ko" : "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
