import SearchBookList from "@/src/features/search/components/SearchBookList";
import SearchInput from "@/src/features/search/components/SearchInput";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <Container edges={["top"]}>
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
  padding: 16px 20px 0 20px;
`;
