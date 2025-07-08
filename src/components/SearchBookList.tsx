import { Document } from "@/src/api/kakao/types";
import { useBookSearchInfinite } from "@/src/features/search/hooks/useBookList";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Text,
} from "react-native";
import styled from "styled-components/native";
import SearchBookListItem from "./SearchBookListItem";

interface SearchBookListProps {
  searchQuery: string;
}

export default function SearchBookList({ searchQuery }: SearchBookListProps) {
  const { t } = useTranslation();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBookSearchInfinite({
    query: searchQuery,
  });

  // 모든 페이지의 데이터를 평면화
  const books = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.documents);
  }, [data]);

  // 총 검색 결과 수
  const totalCount = data?.pages[0]?.meta.total_count || 0;

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderBook = ({ item }: ListRenderItemInfo<Document>) => (
    <SearchBookListItem book={item} />
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <FooterLoader>
        <ActivityIndicator size="small" />
        <Text>{t("search.loading_more")}</Text>
      </FooterLoader>
    );
  };

  // 로딩 중 (첫 번째 페이지)
  if (isLoading && books.length === 0) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" />
        <Text>{t("search.searching")}</Text>
      </LoadingContainer>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <ErrorContainer>
        <Text>{t("search.error", { message: error.message })}</Text>
      </ErrorContainer>
    );
  }

  // 검색 결과가 없음
  if (books.length === 0 && searchQuery.trim()) {
    return (
      <EmptyContainer>
        <Text>{t("search.no_results")}</Text>
      </EmptyContainer>
    );
  }

  // 검색 결과 표시
  return (
    <Container>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item, index) => `${item.isbn || item.title}-${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          books.length > 0 ? (
            <ResultHeader>
              <Text>{t("search.result_count", { count: totalCount })}</Text>
            </ResultHeader>
          ) : null
        }
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FooterLoader = styled.View`
  padding: 20px;
  align-items: center;
  gap: 10px;
`;

const ResultHeader = styled.View`
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  margin-bottom: 10px;
`;
