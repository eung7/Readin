import { Document } from "@/src/api/kakao/types";
import { BookStatus } from "@/src/api/user-books/types";
import BookComment from "@/src/components/BookComment";
import BookRatingSelector from "@/src/components/BookRatingSelector";
import BookStatusSelector from "@/src/components/BookStatusSelector";
import Header from "@/src/components/Header";
import { Body01, Subhead03 } from "@/src/components/Typography";
import BookOverview from "@/src/features/search/components/BookOverview";
import { useSaveUserBook } from "@/src/features/search/hooks/useSaveUserBook";
import { useUserBook } from "@/src/features/search/hooks/useUserBook";
import { useUser } from "@/src/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

export default function BookDetailScreen() {
  const { id, bookData } = useLocalSearchParams();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<BookStatus | null>(null);
  const [comment, setComment] = useState("");
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUser();
  const book: Document = bookData ? JSON.parse(bookData as string) : null;
  const { userBook, isLoading: isUserBookLoading } = useUserBook(
    user?.id,
    book?.isbn
  );
  const { mutate: saveUserBook } = useSaveUserBook();

  useEffect(() => {
    if (userBook) {
      setStatus(userBook.status);
      setRating(userBook.rating);
      setComment(userBook.comment);
    }
  }, [userBook]);

  const saveBookData = useCallback(
    (
      newStatus: BookStatus | null,
      newRating: number,
      newComment: string | null
    ) => {
      if (user && book) {
        saveUserBook({
          book: book,
          bookId: book.isbn,
          userId: user.id,
          status: newStatus,
          rating: newRating,
          comment: newComment,
        });
      }
    },
    [user, book, saveUserBook]
  );

  const handleStatusChange = (newStatus: BookStatus | null) => {
    setStatus(newStatus);
    saveBookData(newStatus, rating, comment);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    saveBookData(status, newRating, comment);
  };

  return (
    <Container paddingTop={insets.top}>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>
        }
        showBottomBorder={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
        bounces={false}
      >
        <Content>
          {/* 책 기본 정보 */}
          <BookOverview book={book} />

          {/* 상태 선택 */}
          <BookStatusSelector
            status={status}
            onStatusChange={handleStatusChange}
            isLoading={isUserBookLoading}
          />

          {/* 평점 */}
          <BookRatingSelector
            rating={rating}
            onRatingChange={handleRatingChange}
          />

          {/* 코멘트 */}
          <BookComment comment={comment} onCommentChange={setComment} />

          {/* 책 소개 */}
          {book.contents && (
            <DescriptionSection>
              <SectionTitle>{t("bookDetail.bookIntro")}</SectionTitle>
              <DescriptionText>{book.contents}</DescriptionText>
            </DescriptionSection>
          )}
        </Content>
      </ScrollView>
    </Container>
  );
}

const Container = styled(View)<{ paddingTop: number }>`
  flex: 1;
  padding-top: ${({ paddingTop }) => paddingTop}px;
`;

const Content = styled.View`
  padding: 0 20px 40px 20px;
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
