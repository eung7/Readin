import { Document } from "@/src/api/kakao/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookDetailScreen() {
  const { bookData } = useLocalSearchParams();
  const router = useRouter();

  // bookData는 JSON string으로 전달될 예정
  const book: Document = bookData ? JSON.parse(bookData as string) : null;

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>책 정보를 불러올 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch {
      return dateString;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#333"
            onPress={() => router.back()}
          />
          <Text style={styles.headerTitle}>책 상세정보</Text>
          <View style={styles.placeholder} />
        </View>

        {/* 책 이미지 및 기본 정보 */}
        <View style={styles.bookInfoSection}>
          <Image
            source={{ uri: book.thumbnail }}
            style={styles.bookImage}
            resizeMode="cover"
          />
          <View style={styles.bookBasicInfo}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookAuthor}>{book.authors.join(", ")}</Text>
            <Text style={styles.bookPublisher}>{book.publisher}</Text>
            <Text style={styles.bookDate}>
              출간일: {formatDate(book.datetime)}
            </Text>
          </View>
        </View>

        {/* 책 상세 정보 */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>책 소개</Text>
          <Text style={styles.bookContents}>
            {book.contents || "책 소개가 없습니다."}
          </Text>
        </View>

        {/* 추가 정보 */}
        <View style={styles.additionalInfo}>
          <Text style={styles.sectionTitle}>상세 정보</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ISBN:</Text>
            <Text style={styles.infoValue}>{book.isbn || "N/A"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>가격:</Text>
            <Text style={styles.infoValue}>
              {book.price ? `${book.price.toLocaleString()}원` : "N/A"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>할인가:</Text>
            <Text style={styles.infoValue}>
              {book.sale_price
                ? `${book.sale_price.toLocaleString()}원`
                : "N/A"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>상태:</Text>
            <Text style={styles.infoValue}>{book.status || "N/A"}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  placeholder: {
    width: 24,
  },
  bookInfoSection: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginRight: 16,
  },
  bookBasicInfo: {
    flex: 1,
    justifyContent: "flex-start",
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    lineHeight: 26,
  },
  bookAuthor: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  bookPublisher: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  bookDate: {
    fontSize: 14,
    color: "#888",
  },
  detailSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  bookContents: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
  },
  additionalInfo: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
});
