import Header from "@/src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default function SearchBooksScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={24} />
          </TouchableOpacity>
        }
        centerTextKey="search.title"
      />
      <Content>
        <SearchContainer>
          <SearchIcon name="search" size={20} color="#666" />
          <SearchInput
            placeholder={t("search.placeholder")}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <ClearIcon
              name="close-circle"
              size={20}
              color="#666"
              onPress={() => setSearchQuery("")}
            />
          )}
        </SearchContainer>
        <Text>search</Text>
      </Content>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.gray.bg_primary};
`;

const Content = styled.View`
  flex: 1;
  padding: 20px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.gray.input};
  border-radius: 12px;
  padding: 12px 20px 12px 20px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.gray.border};
`;

const SearchIcon = styled(Ionicons)`
  margin-right: 8px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.gray.text_primary};
  padding: 4px 0;
`;

const ClearIcon = styled(Ionicons)`
  margin-left: 8px;
`;
