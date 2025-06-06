import styled from "styled-components";
import { breakpoints } from "../../../styles/theme";

interface HeaderProps {
  children: any;
}

const HeaderStyles = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: space-between;

  @media (min-width: ${breakpoints.desktop}) {
    margin: 0 1rem 1rem 0;
  }
`;

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return <HeaderStyles>{children}</HeaderStyles>;
};
