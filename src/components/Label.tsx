import styled from "styled-components";
import { colors, typography } from "../styles/theme";

interface LabelProps {
  text: string;
  htmlFor?: string;
}

const LabelStyled = styled.label`
  color: ${colors.greyNormal};
  font-size: ${typography.textPreset5Bold.size};
  font-weight: ${typography.textPreset5Bold.fontWeight};
  margin-bottom: 0.25rem;
  margin-right: 0.25rem;
`;

export const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
  return <LabelStyled htmlFor={htmlFor}>{text}</LabelStyled>;
};
