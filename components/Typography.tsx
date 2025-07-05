import styled from "styled-components/native";

// BaseText 컴포넌트 - 모든 텍스트 컴포넌트의 기본
const BaseText = styled.Text.attrs({
  lineBreakStrategyIOS: "hangul-word",
  textBreakStrategy: "balanced",
})``;

// --- Title & Display ---
export const Display05 = styled(BaseText)`
  font-family: "Pretendard-Bold";
  font-size: 40px;
  line-height: 52px;
  letter-spacing: -0.3px;
`;

export const Display04 = styled(BaseText)`
  font-family: "Pretendard-Bold";
  font-size: 36px;
  line-height: 46px;
  letter-spacing: -0.3px;
`;

export const Display03 = styled(BaseText)`
  font-family: "Pretendard-Bold";
  font-size: 32px;
  line-height: 42px;
  letter-spacing: -0.3px;
`;

export const Display02 = styled(BaseText)`
  font-family: "Pretendard-Bold";
  font-size: 28px;
  line-height: 38px;
  letter-spacing: -0.3px;
`;

export const Display01 = styled(BaseText)`
  font-family: "Pretendard-Bold";
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.3px;
`;

export const Headline = styled(BaseText)`
  font-family: "Pretendard-Bold";
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.3px;
`;

// --- Subheads ---
export const Subhead05 = styled(BaseText)`
  font-family: "Pretendard-SemiBold";
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.3px;
`;

export const Subhead04 = styled(BaseText)`
  font-family: "Pretendard-SemiBold";
  font-size: 18px;
`;

export const Subhead03 = styled(BaseText)`
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.3px;
`;

export const SubheadLong03 = styled(BaseText)`
  font-family: "Pretendard-Medium";
  font-size: 16px;
  line-height: 28px;
  letter-spacing: -0.3px;
`;

export const Subhead02 = styled(BaseText)`
  font-family: "Pretendard-SemiBold";
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

export const SubheadLong02 = styled(BaseText)`
  font-family: "Pretendard-Medium";
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.3px;
`;

export const Subhead01 = styled(BaseText)`
  font-family: "Pretendard-SemiBold";
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.3px;
`;

// --- Body ---
export const Body02 = styled(BaseText)`
  font-family: "Pretendard-Regular";
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.3px;
`;

export const BodyLong02 = styled(BaseText)`
  font-family: "Pretendard-Regular";
  font-size: 16px;
  line-height: 28px;
  letter-spacing: -0.3px;
`;

export const Body01 = styled(BaseText)`
  font-family: "Pretendard-Regular";
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

export const BodyLong01 = styled(BaseText)`
  font-family: "Pretendard-Regular";
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.3px;
`;

export const Caption = styled(BaseText)`
  font-family: "Pretendard-Regular";
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.3px;
`;

// 편의를 위한 컨테이너 컴포넌트들
export const Container = styled.View`
  padding: 0 20px;
`;

export const Section = styled.View`
  margin-top: 24px;
`;

// 기본 컴포넌트 (호환성을 위해)
export const Typography = BaseText;

// Default export for expo-router compatibility
export default Typography;
