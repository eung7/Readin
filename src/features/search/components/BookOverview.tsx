import { Document } from "@/src/api/kakao/types";
import {
  Body01,
  Caption,
  Display01,
  Subhead03,
} from "@/src/components/Typography";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

interface BookOverviewProps {
  book: Document;
}

export default function BookOverview({ book }: BookOverviewProps) {
  const [imageError, setImageError] = useState(false);

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
    <BookOverviewSection>
      {/* 좌측: 책 이미지 */}
      <BookImageContainer>
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
      </BookImageContainer>

      {/* 우측: 책 정보 */}
      <BookInfoContainer>
        <BookTitle numberOfLines={3}>{book.title}</BookTitle>

        <AuthorInfo>
          <AuthorText numberOfLines={1}>
            {book.authors.join(" · ") + " · " + book.publisher}
          </AuthorText>
        </AuthorInfo>

        <DateText>{formatDate(book.datetime)}</DateText>
      </BookInfoContainer>
    </BookOverviewSection>
  );
}

const BookOverviewSection = styled.View`
  flex-direction: row;
  padding: 24px 20px 32px;
  gap: 20px;
  background-color: ${({ theme }) => theme.primary[900]};
  border-radius: 0 0 16px 16px;
  margin: 0 -20px 24px -20px;
  align-items: flex-end;
`;

const BookImageContainer = styled.View`
  align-items: center;
`;

const BookImage = styled(Image)`
  width: 120px;
  height: 174px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.gray.bg_tertiary};
`;

const PlaceholderImage = styled.View`
  width: 120px;
  height: 174px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.gray.bg_tertiary};
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.gray.border};
`;

const BookInfoContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BookTitle = styled(Display01)`
  color: ${({ theme }) => theme.gray.white};
  margin-bottom: 12px;
`;

const AuthorInfo = styled.View`
  margin-bottom: 4px;
`;

const AuthorText = styled(Subhead03)`
  color: ${({ theme }) => theme.gray.white};
  opacity: 0.9;
`;

const PublisherText = styled(Body01)`
  color: ${({ theme }) => theme.gray.white};
  opacity: 0.8;
`;

const DateText = styled(Caption)`
  color: ${({ theme }) => theme.gray.white};
  opacity: 0.8;
`;
