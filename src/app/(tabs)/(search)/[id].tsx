import { Document } from "@/src/api/kakao/types";
import Header from "@/src/components/Header";
import { Body01, Caption, Subhead03 } from "@/src/components/Typography";
import BookOverview from "@/src/features/search/components/BookOverview";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

type BookStatus = "wishlist" | "reading" | "completed" | "stopped";

export default function BookDetailScreen() {
  const { id, bookData } = useLocalSearchParams();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<BookStatus>("wishlist");
  const [comment, setComment] = useState("");
  const theme = useTheme();

  // bookData는 JSON string으로 전달될 예정
  const book: Document = bookData ? JSON.parse(bookData as string) : null;

  if (!book) {
    return (
      <Container>
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

  return (
    <Container>
      <StatusBar style="dark" backgroundColor={theme.primary[900]} />
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              style={{ color: theme.gray.white }}
              name="chevron-back"
              size={24}
            />
          </TouchableOpacity>
        }
        style={{ backgroundColor: theme.primary[900] }}
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
          <StatusSection>
            <SectionTitle>읽기 상태</SectionTitle>
            <StatusContainer>
              <StatusButton
                active={status === "wishlist"}
                onPress={() => setStatus("wishlist")}
              >
                <Ionicons
                  name="heart-outline"
                  size={16}
                  color={status === "wishlist" ? "#fff" : "#9CA3AF"}
                />
                <StatusButtonText active={status === "wishlist"}>
                  위시리스트
                </StatusButtonText>
              </StatusButton>

              <StatusButton
                active={status === "reading"}
                onPress={() => setStatus("reading")}
              >
                <Ionicons
                  name="book-outline"
                  size={16}
                  color={status === "reading" ? "#fff" : "#9CA3AF"}
                />
                <StatusButtonText active={status === "reading"}>
                  읽는 중
                </StatusButtonText>
              </StatusButton>

              <StatusButton
                active={status === "completed"}
                onPress={() => setStatus("completed")}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={16}
                  color={status === "completed" ? "#fff" : "#9CA3AF"}
                />
                <StatusButtonText active={status === "completed"}>
                  다 읽음
                </StatusButtonText>
              </StatusButton>

              <StatusButton
                active={status === "stopped"}
                onPress={() => setStatus("stopped")}
              >
                <Ionicons
                  name="stop-circle-outline"
                  size={16}
                  color={status === "stopped" ? "#fff" : "#9CA3AF"}
                />
                <StatusButtonText active={status === "stopped"}>
                  중단
                </StatusButtonText>
              </StatusButton>
            </StatusContainer>
          </StatusSection>

          {/* 평점 */}
          <RatingSection>
            <SectionTitle>평점</SectionTitle>
            <RatingContainer>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  style={{ marginRight: 8 }}
                >
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={32}
                    color={star <= rating ? "#FFD700" : "#E5E7EB"}
                  />
                </TouchableOpacity>
              ))}
              <RatingText>{rating > 0 ? `${rating}점` : "평가하기"}</RatingText>
            </RatingContainer>
          </RatingSection>

          {/* 코멘트 */}
          <CommentSection>
            <SectionTitle>내 코멘트</SectionTitle>
            <CommentContainer>
              <CommentInput
                placeholder="이 책에 대한 생각을 남겨보세요..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
              />
              {comment && (
                <CommentPreview>
                  <CommentText>{comment}</CommentText>
                </CommentPreview>
              )}
            </CommentContainer>
          </CommentSection>

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

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.gray.bg_primary};
`;

const Content = styled.View`
  padding: 0 20px 40px 20px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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

/* Status Section */
const StatusSection = styled.View`
  margin-bottom: 24px;
`;

const StatusContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const StatusButton = styled(TouchableOpacity)<{ active: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border-radius: 20px;
  background-color: ${({ theme, active }) =>
    active ? theme.gray.text_primary : theme.gray.bg_secondary};
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.gray.text_primary : theme.gray.border};
  gap: 4px;
`;

const StatusButtonText = styled(Caption)<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? "#fff" : theme.gray.text_secondary};
  font-family: "Pretendard-Medium";
`;

/* Rating Section */
const RatingSection = styled.View`
  margin-bottom: 24px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

const RatingText = styled(Body01)`
  color: ${({ theme }) => theme.gray.text_secondary};
  margin-left: 12px;
  font-family: "Pretendard-Medium";
`;

/* Comment Section */
const CommentSection = styled.View`
  margin-bottom: 24px;
`;

const CommentContainer = styled.View`
  margin-top: 12px;
  gap: 12px;
`;

const CommentInput = styled.TextInput`
  background-color: ${({ theme }) => theme.gray.bg_secondary};
  border-radius: 12px;
  padding: 16px;
  color: ${({ theme }) => theme.gray.text_primary};
  font-family: "Pretendard-Regular";
  font-size: 16px;
  line-height: 24px;
  text-align-vertical: top;
  border: 1px solid ${({ theme }) => theme.gray.border};
`;

const CommentPreview = styled.View`
  background-color: ${({ theme }) => theme.gray.bg_tertiary};
  border-radius: 12px;
  padding: 16px;
  border-left: 4px solid ${({ theme }) => theme.gray.text_primary};
`;

const CommentText = styled(Body01)`
  color: ${({ theme }) => theme.gray.text_secondary};
  line-height: 24px;
`;
