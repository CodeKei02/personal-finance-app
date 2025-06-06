import styled from "styled-components";
import { colors } from "../../../styles/theme";

interface ParagraphProps {
  children: any;
  align?: string;
}

const ParagraphStyles = styled.p<{ align?: string }>`
  color: ${colors.beigeNormal};
  margin: 1rem 0;
  letter-spacing: 1px;
  text-align: ${(props) => props.align || "left"};
`;

export const Paragraph: React.FC<ParagraphProps> = ({ children, align }) => {
  return <ParagraphStyles align={align}>{children}</ParagraphStyles>;
};
