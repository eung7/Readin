import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import ko from "../locales/ko.json";

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
  compatibilityJSON: "v4",
});

export default i18n;
