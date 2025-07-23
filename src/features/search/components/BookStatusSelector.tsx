import { BookStatus } from "@/src/supabase/user-book/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Caption } from "../../../components/Typography";

interface BookStatusSelectorProps {
  status: BookStatus | null;
  onStatusChange: (status: BookStatus | null) => void;
  isLoading?: boolean;
}

const statusOptions = [
  {
    value: "wishlist" as BookStatus,
    translationKey: "bookDetail.statuses.wishlist" as const,
    icon: "heart-outline" as const,
  },
  {
    value: "reading" as BookStatus,
    translationKey: "bookDetail.statuses.reading" as const,
    icon: "book-outline" as const,
  },
  {
    value: "completed" as BookStatus,
    translationKey: "bookDetail.statuses.completed" as const,
    icon: "checkmark-circle-outline" as const,
  },
  {
    value: "stopped" as BookStatus,
    translationKey: "bookDetail.statuses.stopped" as const,
    icon: "stop-circle-outline" as const,
  },
];

const SkeletonItem = () => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [pulseAnim]);

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <SkeletonButton>
      <Animated.View style={{ opacity }}>
        <SkeletonIcon />
        <SkeletonText />
      </Animated.View>
    </SkeletonButton>
  );
};

export default function BookStatusSelector({
  status,
  onStatusChange,
  isLoading = false,
}: BookStatusSelectorProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <StatusSection>
        <StatusContainer>
          {statusOptions.map((option) => (
            <StatusButton key={option.value} active={false}>
              <SkeletonIcon />
              <SkeletonText />
            </StatusButton>
          ))}
        </StatusContainer>
      </StatusSection>
    );
  }

  return (
    <StatusSection>
      <StatusContainer>
        {statusOptions.map((option) => (
          <StatusButton
            key={option.value}
            active={status === option.value}
            onPress={() =>
              onStatusChange(status === option.value ? null : option.value)
            }
          >
            <Ionicons
              name={option.icon}
              size={16}
              color={status === option.value ? "#fff" : "#9CA3AF"}
            />
            <StatusButtonText active={status === option.value}>
              {t(option.translationKey)}
            </StatusButtonText>
          </StatusButton>
        ))}
      </StatusContainer>
    </StatusSection>
  );
}

const StatusSection = styled.View`
  margin-bottom: 24px;
`;

const StatusContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const baseButtonStyles = `
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  padding: 8px 12px;
  flex: 1;
  border-radius: 20px;
  gap: 4px;
  min-height: 52px;
  justify-content: center;
`;

const StatusButton = styled(TouchableOpacity)<{ active: boolean }>`
  ${baseButtonStyles}
  background-color: ${({ theme, active }) =>
    active ? theme.primary[900] : theme.gray.bg_secondary};
  border: 1px solid
    ${({ theme, active }) => (active ? theme.primary[900] : theme.gray.border)};
`;

const StatusButtonText = styled(Caption)<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? "#fff" : theme.gray.text_secondary};
  font-family: "Pretendard-Medium";
`;

const SkeletonButton = styled.View`
  ${baseButtonStyles}
  background-color: ${({ theme }) => theme.gray.bg_secondary};
  border: 1px solid ${({ theme }) => theme.gray.border};
`;

const SkeletonIcon = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.gray.border};
  margin-bottom: 4px;
`;

const SkeletonText = styled.View`
  width: 40px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.gray.border};
`;
