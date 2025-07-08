import { Document } from "@/src/api/kakao/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { Body01, Caption, Subhead03 } from "./Typography";

interface SearchBookListItemProps {
  book: Document;
}

export default function SearchBookListItem({ book }: SearchBookListItemProps) {
  const [imageError, setImageError] = useState(false);

  // 날짜 포맷팅 함수
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
    <BookItem>
      <ThumbnailContainer>
        {book.thumbnail && !imageError ? (
          <BookThumbnail
            source={{ uri: book.thumbnail }}
            onError={() => setImageError(true)}
          />
        ) : (
          <SkeletonThumbnail>
            <Ionicons name="image-outline" size={24} color="#ccc" />
          </SkeletonThumbnail>
        )}
      </ThumbnailContainer>
      <ContentContainer>
        <Title numberOfLines={2}>{book.title}</Title>
        <AuthorText numberOfLines={1}>{book.authors.join(", ")}</AuthorText>
        <PublisherText numberOfLines={1}>{book.publisher}</PublisherText>
        <DateText>{formatDate(book.datetime)}</DateText>
      </ContentContainer>
    </BookItem>
  );
}

const BookItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.gray.bg_secondary || "#ffffff"};
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

const ThumbnailContainer = styled.View`
  margin-right: 16px;
`;

const BookThumbnail = styled(Image)`
  width: 60px;
  height: 80px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const SkeletonThumbnail = styled.View`
  width: 60px;
  height: 80px;
  border-radius: 6px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Title = styled(Subhead03)`
  color: ${({ theme }) => theme.gray.text_primary || "#333"};
  margin-bottom: 4px;
`;

const AuthorText = styled(Body01)`
  color: ${({ theme }) => theme.gray.text_secondary || "#666"};
`;

const PublisherText = styled(Body01)`
  color: ${({ theme }) => theme.gray.text_secondary || "#666"};
  margin-bottom: 2px;
`;

const DateText = styled(Caption)`
  color: ${({ theme }) => theme.gray.text_tertiary || "#999"};
`;
