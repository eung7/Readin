import { AladinBook } from "@/src/types/aladin";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { Body01, Caption, Subhead03 } from "../../../components/Typography";
import { gray } from "../../../constants/colors";

interface SearchBookListItemProps {
  book: AladinBook;
}

export default function SearchBookListItem({ book }: SearchBookListItemProps) {
  const [imageError, setImageError] = useState(false);
  const scale = useSharedValue(1);
  const router = useRouter();

  // 날짜 포맷팅 함수
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

  const handlePress = () => {
    const bookId = book.isbn || book.title;
    router.push({
      pathname: "/(tabs)/(search)/[id]",
      params: {
        id: bookId,
        bookData: JSON.stringify(book),
      },
    });
  };

  return (
    <Container
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
      }}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={() => (scale.value = withTiming(0.95, { duration: 100 }))}
        onPressOut={() => (scale.value = withTiming(1, { duration: 100 }))}
      >
        <Animated.View
          style={useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
          }))}
        >
          <BookCard>
            <BookImageContainer>
              {book.cover && !imageError ? (
                <BookImage
                  source={{ uri: book.cover }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <PlaceholderImage>
                  <Ionicons name="book-outline" size={28} color={gray[400]} />
                </PlaceholderImage>
              )}
            </BookImageContainer>

            <BookInfo>
              <BookTitleText numberOfLines={2}>{book.title}</BookTitleText>

              <BookMetaContainer>
                <AuthorPublisherText numberOfLines={1}>
                  {book.author} · {book.publisher}
                </AuthorPublisherText>
                <DateText>{formatDate(book.pubdate)}</DateText>
              </BookMetaContainer>
            </BookInfo>

            <ChevronIcon>
              <Ionicons name="chevron-forward" size={16} color={gray[400]} />
            </ChevronIcon>
          </BookCard>
        </Animated.View>
      </Pressable>
    </Container>
  );
}

const Container = styled.View`
  margin: 0 20px 8px 20px;
`;

const BookCard = styled.View`
  background-color: ${(p) => p.theme.gray.bg_primary};
  border-radius: 16px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${(p) => p.theme.gray.border};
`;

const BookImageContainer = styled.View`
  margin-right: 16px;
`;

const BookImage = styled(Image)`
  width: 64px;
  height: 80px;
  border-radius: 8px;
  border-width: 1px;
  background-color: ${(p) => p.theme.gray.bg_tertiary};
`;

const PlaceholderImage = styled.View`
  width: 64px;
  height: 80px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.gray.bg_tertiary};
  justify-content: center;
  align-items: center;
  border: 1px solid ${(p) => p.theme.gray[200]};
`;

const BookInfo = styled.View`
  flex: 1;
  justify-content: center;
`;

const BookTitleText = styled(Subhead03)`
  color: ${(p) => p.theme.gray.text_primary};
  margin-bottom: 6px;
`;

const BookMetaContainer = styled.View`
  margin-bottom: 8px;
`;

const AuthorPublisherText = styled(Body01)`
  color: ${(p) => p.theme.gray.text_secondary};
  margin-bottom: 2px;
`;

const DateText = styled(Caption)`
  color: ${(p) => p.theme.gray.text_tertiary};
`;

const ChevronIcon = styled.View`
  margin-left: 8px;
`;
