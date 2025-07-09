import { Document } from "@/src/api/kakao/types";
import Header from "@/src/components/Header";
import {
  Body01,
  Caption,
  Display01,
  Subhead03,
} from "@/src/components/Typography";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export default function BookDetailScreen() {
  const { id, bookData } = useLocalSearchParams();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  // bookData는 JSON string으로 전달될 예정
  const book: Document = bookData ? JSON.parse(bookData as string) : null;

  if (!book) {
    return (
      <Container edges={["bottom", "left", "right"]}>
        <Header
          leftComponent={
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} />
            </TouchableOpacity>
          }
        />
        <ErrorContainer>
          <Body01>책 정보를 불러올 수 없습니다.</Body01>
        </ErrorContainer>
      </Container>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}`;
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          {/* 책 이미지 */}
          <BookImageSection>
            {book.thumbnail && !imageError ? (
              <BookImage
                source={{ uri: book.thumbnail }}
                onError={() => setImageError(true)}
                resizeMode="cover"
              />
            ) : (
              <PlaceholderImage>
                <Ionicons name="book-outline" size={48} color="#9CA3AF" />
              </PlaceholderImage>
            )}
          </BookImageSection>

          {/* 책 기본 정보 */}
          <BookInfoSection>
            <BookTitle numberOfLines={3}>{book.title}</BookTitle>

            <AuthorInfo>
              <AuthorText numberOfLines={2}>
                {book.authors.join(", ")}
              </AuthorText>
              <PublisherText>{book.publisher}</PublisherText>
            </AuthorInfo>

            <DateText>{formatDate(book.datetime)}</DateText>
          </BookInfoSection>

          {/* 추가 정보 */}
          <MetaSection>
            {book.isbn && (
              <MetaItem>
                <MetaLabel>ISBN</MetaLabel>
                <MetaValue>{book.isbn}</MetaValue>
              </MetaItem>
            )}

            {book.price && (
              <MetaItem>
                <MetaLabel>가격</MetaLabel>
                <MetaValue>{book.price.toLocaleString()}원</MetaValue>
              </MetaItem>
            )}
          </MetaSection>

          {/* 책 소개 */}
          {book.contents && (
            <DescriptionSection>
              <SectionTitle>책 소개</SectionTitle>
              <DescriptionText>{book.contents}</DescriptionText>
            </DescriptionSection>
          )}
        </Content>
      </ScrollView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.gray.bg_primary};
`;

const Content = styled.View`
  padding: 0 20px 40px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BookImageSection = styled.View`
  align-items: center;
  padding: 24px 0 32px;
`;

const BookImage = styled(Image)`
  width: 160px;
  height: 220px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.gray.bg_tertiary};
`;

const PlaceholderImage = styled.View`
  width: 160px;
  height: 220px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.gray.bg_tertiary};
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.gray.border};
`;

const BookInfoSection = styled.View`
  margin-bottom: 32px;
`;

const BookTitle = styled(Display01)`
  color: ${({ theme }) => theme.gray.text_primary};
  text-align: center;
  margin-bottom: 16px;
`;

const AuthorInfo = styled.View`
  align-items: center;
  margin-bottom: 8px;
`;

const AuthorText = styled(Subhead03)`
  color: ${({ theme }) => theme.gray.text_secondary};
  text-align: center;
  margin-bottom: 4px;
`;

const PublisherText = styled(Body01)`
  color: ${({ theme }) => theme.gray.text_tertiary};
  text-align: center;
`;

const DateText = styled(Caption)`
  color: ${({ theme }) => theme.gray.text_tertiary};
  text-align: center;
`;

const MetaSection = styled.View`
  background-color: ${({ theme }) => theme.gray.bg_secondary};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  gap: 16px;
`;

const MetaItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MetaLabel = styled(Body01)`
  color: ${({ theme }) => theme.gray.text_secondary};
`;

const MetaValue = styled(Body01)`
  color: ${({ theme }) => theme.gray.text_primary};
  font-family: "Pretendard-Medium";
`;

const DescriptionSection = styled.View`
  gap: 16px;
`;

const SectionTitle = styled(Subhead03)`
  color: ${({ theme }) => theme.gray.text_primary};
`;

const DescriptionText = styled(Body01)`
  color: ${({ theme }) => theme.gray.text_secondary};
  line-height: 24px;
`;
