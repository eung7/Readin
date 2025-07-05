import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("ko");
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    loadLanguageFromStorage();
  }, []);

  const loadLanguageFromStorage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("app_language");
      if (savedLanguage && (savedLanguage === "ko" || savedLanguage === "en")) {
        setLanguageState(savedLanguage as Language);
        i18n.changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error("Error loading language from storage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem("app_language", lang);
      setLanguageState(lang);
      i18n.changeLanguage(lang);
    } catch (error) {
      console.error("Error saving language to storage:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
