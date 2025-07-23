import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Platform, Pressable } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";
import Header from "../../../components/Header";
import { Body01, Subhead03 } from "../../../components/Typography";

interface BookCommentProps {
  comment: string;
  onCommentChange: (comment: string) => void;
}

export default function BookComment({
  comment,
  onCommentChange,
}: BookCommentProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempComment, setTempComment] = useState(comment);
  const insets = useSafeAreaInsets();

  const handleOpenModal = () => {
    setTempComment(comment);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    onCommentChange(tempComment);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setTempComment(comment);
    setIsModalVisible(false);
  };

  const placeholderText = t("bookDetail.commentPlaceholder");

  return (
    <>
      <CommentSection>
        <SectionTitle>{t("bookDetail.comment")}</SectionTitle>
        <CommentContainer>
          <Pressable onPress={handleOpenModal}>
            <CommentInputPreview>
              <CommentInputText isPlaceholder={!comment}>
                {comment || placeholderText}
              </CommentInputText>
            </CommentInputPreview>
          </Pressable>
        </CommentContainer>
      </CommentSection>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleCancel}
      >
        <ModalContainer
          insets={insets}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Header
            leftComponent={
              <CancelButton onPress={handleCancel}>
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.gray.text_tertiary}
                />
              </CancelButton>
            }
            centerTextKey="bookDetail.comment"
            rightComponent={
              <SaveButton onPress={handleSave}>
                <SaveButtonText>{t("common.save")}</SaveButtonText>
              </SaveButton>
            }
            showBottomBorder={true}
          />

          <ModalContent>
            <CommentTextArea
              placeholder={placeholderText}
              value={tempComment}
              onChangeText={setTempComment}
              multiline
              autoFocus
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
}

const CommentSection = styled.View`
  flex: 1;
`;

const SectionTitle = styled(Subhead03)`
  color: ${({ theme }) => theme.gray.text_primary};
`;

const CommentContainer = styled.View`
  margin-top: 12px;
  gap: 12px;
`;

const CommentInputPreview = styled.View`
  background-color: ${({ theme }) => theme.gray.bg_secondary};
  border-radius: 12px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.gray.border};
  min-height: 96px;
  justify-content: flex-start;
`;

const CommentInputText = styled(Body01)<{ isPlaceholder: boolean }>`
  color: ${({ theme, isPlaceholder }) =>
    isPlaceholder ? theme.gray.text_tertiary : theme.gray.text_primary};
  line-height: 24px;
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

const ModalContainer = styled.KeyboardAvoidingView<{ insets: EdgeInsets }>`
  flex: 1;
  background-color: ${({ theme }) => theme.gray.bg_primary};
  padding-top: ${({ insets }) => insets.top}px;
  padding-bottom: ${({ insets }) => insets.bottom}px;
`;

const CancelButton = styled(Pressable)`
  padding: 8px;
`;

const SaveButton = styled(Pressable)`
  padding: 8px;
`;

const SaveButtonText = styled(Body01)`
  color: ${({ theme }) => theme.primary[500]};
  font-weight: 600;
`;

const ModalContent = styled.View`
  flex: 1;
  padding: 20px;
  margin-bottom: 24px;
`;

const CommentTextArea = styled.TextInput`
  flex: 1;
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
