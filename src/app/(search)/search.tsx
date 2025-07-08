import Header from "@/src/components/Header";
import SearchBookList from "@/src/features/search/components/SearchBookList";
import SearchInput from "@/src/features/search/components/SearchInput";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default function SearchBooksScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [executeQuery, setExecuteQuery] = useState("");

  const handleSubmitSearch = () => {
    if (searchQuery.trim()) {
      setExecuteQuery(searchQuery.trim());
    }
  };

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
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSubmitSearch}
        />
        <SearchBookList searchQuery={executeQuery} />
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
