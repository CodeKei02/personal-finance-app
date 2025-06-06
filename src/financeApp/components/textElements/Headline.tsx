import styled from "styled-components";
import { colors, typography } from "../../../styles/theme/index";

const HeadlineStyled = styled.h1`
  width: 100%;
  font-size: ${typography.textPreset1.size};
  letter-spacing: ${typography.textPreset1.letterSpacing};
  line-height: ${typography.textPreset1.lineHeight};
  color: ${colors.greyDark};
  font-weight: 800;
  display: flex;
  justify-content: space-between;
`;

export const Headline: React.FC<{ title: string }> = ({ title }) => {
  return <HeadlineStyled>{title}</HeadlineStyled>;
};
