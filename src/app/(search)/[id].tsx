import { Document } from "@/src/api/kakao/types";
import Header from "@/src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export default function BookDetailScreen() {
  const { id, bookData } = useLocalSearchParams();
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
    <Container>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>
        }
      />
      <ScrollView style={{ flex: 1, backgroundColor: "blue" }}>
        {/* 기본 정보 */}
        <View style={styles.content}>
          <Text style={styles.label}>ID: {id}</Text>

          <Image
            source={{ uri: book.thumbnail }}
            style={styles.bookImage}
            resizeMode="cover"
          />

          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>저자: {book.authors.join(", ")}</Text>
          <Text style={styles.publisher}>출판사: {book.publisher}</Text>
          <Text style={styles.date}>출간일: {formatDate(book.datetime)}</Text>
          <Text style={styles.isbn}>ISBN: {book.isbn || "N/A"}</Text>
          <Text style={styles.price}>
            가격: {book.price ? `${book.price.toLocaleString()}원` : "N/A"}
          </Text>

          {book.contents && (
            <View style={styles.contentsSection}>
              <Text style={styles.contentsTitle}>책 소개:</Text>
              <Text style={styles.contents}>{book.contents}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  scrollView: {
    flex: 1,
  },

  content: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  publisher: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  isbn: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  contentsSection: {
    marginTop: 16,
  },
  contentsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  contents: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
});
