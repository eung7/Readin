import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

interface HeaderProps {
  leftComponent?: React.ReactNode;
  centerTextKey?: string;
  rightComponent?: React.ReactNode;
  showBottomBorder?: boolean;
}

export default function Header({
  leftComponent,
  centerTextKey,
  rightComponent,
  showBottomBorder = false,
}: HeaderProps) {
  const { t } = useTranslation();

  return (
    <Container showBottomBorder={showBottomBorder}>
      <LeftSection>{leftComponent}</LeftSection>

      <CenterSection>
        {centerTextKey && <CenterText>{t(centerTextKey)}</CenterText>}
      </CenterSection>

      <RightSection>{rightComponent}</RightSection>
    </Container>
  );
}

const Container = styled.View<{ showBottomBorder: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 20px;
  ${({ showBottomBorder, theme }) =>
    showBottomBorder &&
    `
    border-bottom-width: 1px;
    border-bottom-color: ${theme.gray.border};
  `}
`;

const LeftSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const CenterSection = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const RightSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const CenterText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.gray.text_primary};
  text-align: center;
`;
