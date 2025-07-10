import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Body01, Subhead03 } from "./Typography";

interface BookCommentProps {
  comment: string;
  onCommentChange: (comment: string) => void;
}

export default function BookComment({
  comment,
  onCommentChange,
}: BookCommentProps) {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempComment, setTempComment] = useState(comment);

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
          <TouchableOpacity onPress={handleOpenModal}>
            <CommentInputPreview>
              <CommentInputText isPlaceholder={!comment}>
                {comment || placeholderText}
              </CommentInputText>
            </CommentInputPreview>
          </TouchableOpacity>
          {comment && (
            <CommentPreview>
              <CommentText>{comment}</CommentText>
            </CommentPreview>
          )}
        </CommentContainer>
      </CommentSection>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleCancel}
      >
        <ModalContainer>
          <ModalHeader>
            <CancelButton onPress={handleCancel}>
              <ButtonText>{t("common.cancel")}</ButtonText>
            </CancelButton>
            <ModalTitle>{t("bookDetail.comment")}</ModalTitle>
            <SaveButton onPress={handleSave}>
              <SaveButtonText>{t("common.save")}</SaveButtonText>
            </SaveButton>
          </ModalHeader>

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
  margin-bottom: 24px;
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
  padding: 16px;
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

const ModalContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.gray.bg_primary};
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.gray.border};
`;

const ModalTitle = styled(Subhead03)`
  color: ${({ theme }) => theme.gray.text_primary};
  flex: 1;
  text-align: center;
`;

const CancelButton = styled(Pressable)`
  padding: 8px;
`;

const SaveButton = styled(Pressable)`
  padding: 8px;
`;

const ButtonText = styled(Body01)`
  color: ${({ theme }) => theme.gray.text_secondary};
`;

const SaveButtonText = styled(Body01)`
  color: ${({ theme }) => theme.primary[500]};
  font-weight: 600;
`;

const ModalContent = styled.View`
  flex: 1;
  padding: 20px;
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
