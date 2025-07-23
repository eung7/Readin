import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

interface BookRatingSelectorProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function BookRatingSelector({
  rating,
  onRatingChange,
}: BookRatingSelectorProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleStarPress = (starValue: number) => {
    // 현재 별점과 클릭한 별점이 같으면 0.5점 차이로 토글
    if (rating === starValue) {
      onRatingChange(starValue - 0.5);
    } else if (rating === starValue - 0.5) {
      onRatingChange(starValue);
    } else {
      onRatingChange(starValue);
    }
  };

  const renderStar = (starIndex: number) => {
    const isFullStar = rating >= starIndex;
    const isHalfStar = rating >= starIndex - 0.5 && rating < starIndex;

    return (
      <>
        <TouchableOpacity
          key={starIndex}
          onPress={() => handleStarPress(starIndex)}
          style={{ marginRight: 8 }}
        >
          {isHalfStar ? (
            <View style={{ position: "relative" }}>
              <Ionicons name="star-outline" size={40} color="#E5E7EB" />
              <View
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  width: "50%",
                }}
              >
                <Ionicons name="star" size={40} color={theme.primary[900]} />
              </View>
            </View>
          ) : (
            <Ionicons
              name={isFullStar ? "star" : "star-outline"}
              size={40}
              color={isFullStar ? theme.primary[900] : "#E5E7EB"}
            />
          )}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Container>
      <RatingContainer>
        <StarsContainer>
          {[1, 2, 3, 4, 5].map((star) => renderStar(star))}
        </StarsContainer>
      </RatingContainer>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StarsContainer = styled.View`
  flex-direction: row;
  margin-right: 12px;
`;
