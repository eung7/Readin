import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";
import styled from "styled-components/native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
}

export default function SearchInput({
  value,
  onChangeText,
  onSubmitEditing,
}: SearchInputProps) {
  const { t } = useTranslation();

  return (
    <SearchContainer>
      <SearchIcon name="search" size={20} color="#666" />
      <StyledTextInput
        placeholder={t("search.placeholder")}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <ClearIcon
          name="close-circle"
          size={20}
          color="#666"
          onPress={() => onChangeText("")}
        />
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.gray.input};
  border-radius: 12px;
  padding: 8px 16px 8px 20px;
  margin: 0 20px 16px 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.gray.border};
`;

const SearchIcon = styled(Ionicons)`
  margin-right: 8px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.gray.text_primary};
  padding: 4px 0;
`;

const ClearIcon = styled(Ionicons)`
  margin-left: 8px;
`;
