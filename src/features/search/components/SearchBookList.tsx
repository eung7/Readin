import { Body01 } from "@/src/components/Typography";
import { useBookSearchInfinite } from "@/src/features/search/hooks/useBookList";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList } from "react-native";
import styled from "styled-components/native";
import SearchBookListItem from "./SearchBookListItem";

interface SearchBookListProps {
  searchQuery: string;
}

export default function SearchBookList({ searchQuery }: SearchBookListProps) {
  const { t } = useTranslation();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBookSearchInfinite({
      query: searchQuery,
    });

  // 모든 페이지의 데이터를 평면화
  const books = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.documents);
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 로딩 중 (첫 번째 페이지)
  if (isLoading && books.length === 0) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" />
      </LoadingContainer>
    );
  }

  // 검색 결과가 없음
  if (books.length === 0 && searchQuery.trim()) {
    return (
      <EmptyContainer>
        <Body01>{t("search.no_results")}</Body01>
      </EmptyContainer>
    );
  }

  // 검색 결과 표시
  return (
    <Container>
      <FlatList
        data={books}
        renderItem={({ item }) => {
          return <SearchBookListItem book={item} />;
        }}
        keyExtractor={(item, index) => `${item.isbn || item.title}-${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (!isFetchingNextPage) return null;
          return (
            <FooterLoader>
              <ActivityIndicator size="small" />
            </FooterLoader>
          );
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          books.length > 0 ? (
            <ResultHeader>
              <ResultText>
                {t("search.result_count", {
                  count: data?.pages[0]?.meta.total_count || 0,
                })}
              </ResultText>
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
  padding: 0px 0px 12px 0px;
`;

const ResultText = styled(Body01)`
  color: ${(p) => p.theme.gray.text_primary};
`;
