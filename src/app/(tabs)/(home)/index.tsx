import Header from "@/src/features/home/components/Header";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();

  const handleSearchPress = () => {
    // 검색 기능 추가 예정
    console.log("검색 버튼 클릭");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title={t("home.title")} onSearchPress={handleSearchPress} />

      {/* 메인 컨텐츠 영역 */}
      <View style={{ flex: 1, padding: 20 }}>
        {/* 여기에 메인 컨텐츠가 들어갑니다 */}
      </View>
    </SafeAreaView>
  );
}
