import { theme } from "@/common/theme";
import {
  Body01,
  Body02,
  BodyLong01,
  BodyLong02,
  Caption,
  Display01,
  Display02,
  Display03,
  Display04,
  Display05,
  Headline,
  Section,
  Subhead01,
  Subhead02,
  Subhead03,
  Subhead04,
  Subhead05,
  SubheadLong02,
  SubheadLong03,
} from "@/components/Typography";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        {/* Display */}
        <Display05 style={{ color: theme.colors.gray[300] }}>
          Readin Typography System
        </Display05>

        {/* Display 시리즈 */}
        <Section>
          <Display04>Display 04 - 매우 큰 제목</Display04>
        </Section>

        <Section>
          <Display03>Display 03 - 큰 제목</Display03>
        </Section>

        <Section>
          <Display02>Display 02 - 중간 제목</Display02>
        </Section>

        <Section>
          <Display01>Display 01 - 작은 제목</Display01>
        </Section>

        {/* Headline */}
        <Section>
          <Headline>Headline - 헤드라인</Headline>
        </Section>

        {/* Subheads */}
        <Section>
          <Subhead05>Subhead 05 - 가장 큰 서브헤드</Subhead05>
        </Section>

        <Section>
          <Subhead04>Subhead 04 - 큰 서브헤드</Subhead04>
        </Section>

        <Section>
          <Subhead03>Subhead 03 - 중간 서브헤드</Subhead03>
        </Section>

        <Section>
          <SubheadLong03>
            SubheadLong 03 - 긴 텍스트를 위한 서브헤드입니다. 이 컴포넌트는 더
            넓은 줄 간격을 가지고 있어 가독성이 좋습니다.
          </SubheadLong03>
        </Section>

        <Section>
          <Subhead02>Subhead 02 - 작은 서브헤드</Subhead02>
        </Section>

        <Section>
          <SubheadLong02>
            SubheadLong 02 - 긴 텍스트를 위한 작은 서브헤드입니다. 이 컴포넌트도
            더 넓은 줄 간격을 가지고 있습니다.
          </SubheadLong02>
        </Section>

        <Section>
          <Subhead01>Subhead 01 - 가장 작은 서브헤드</Subhead01>
        </Section>

        {/* Body */}
        <Section>
          <Body02>
            Body 02 - 기본 본문 텍스트입니다. 16px 크기로 일반적인 본문에
            사용됩니다.
          </Body02>
        </Section>

        <Section>
          <BodyLong02>
            BodyLong 02 - 긴 본문을 위한 텍스트입니다. 더 넓은 줄 간격(28px)을
            가지고 있어 긴 텍스트를 읽기에 편합니다. 이런 식으로 여러 줄의
            텍스트가 있을 때 사용하면 좋습니다.
          </BodyLong02>
        </Section>

        <Section>
          <Body01>
            Body 01 - 작은 본문 텍스트입니다. 14px 크기로 보조 설명에
            사용됩니다.
          </Body01>
        </Section>

        <Section>
          <BodyLong01>
            BodyLong 01 - 긴 작은 본문을 위한 텍스트입니다. 더 넓은 줄 간격을
            가지고 있어 긴 보조 설명을 읽기에 편합니다.
          </BodyLong01>
        </Section>

        {/* Caption */}
        <Section>
          <Caption>
            Caption - 캡션이나 주석에 사용되는 가장 작은 텍스트입니다.
          </Caption>
        </Section>

        <Section>
          <Body02 style={{ color: theme.colors.gray[500] }}>
            한글 단어 단위 줄바꿈(hangul-word)과 균형 잡힌 텍스트 배치(balanced)
            속성이 모든 텍스트 컴포넌트에 자동으로 적용됩니다.
          </Body02>
        </Section>
      </ScrollView>
    </View>
  );
}
