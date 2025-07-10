import Header from "@/src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        rightComponent={
          <TouchableOpacity onPress={() => router.push("/book/1")}>
            <Ionicons name="search" size={24} />
          </TouchableOpacity>
        }
        showBottomBorder={true}
      />

      {/* 메인 컨텐츠 영역 */}
      <View style={{ flex: 1, padding: 20 }}>
        {/* 여기에 메인 컨텐츠가 들어갑니다 */}
      </View>
    </SafeAreaView>
  );
}
