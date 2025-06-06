import styled from "styled-components";
import { breakpoints } from "../../../styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface ContainerProps {
  children?: any;
}

interface IsOpenProps {
  $isOpen: boolean;
}

const ContainerStyles = styled.section<IsOpenProps>`
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: ${breakpoints.desktop}) {
    max-width: ${({ $isOpen }) => ($isOpen ? "80%" : "92%")};
    transition: max-width 0.5s cubic-bezier(0.01, 0.98, 0, 0.98);
    display: grid;
    place-self: flex-end;
  }
`;

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const isOpen = useSelector((state: RootState) => state.ui.isOpen);

  return <ContainerStyles $isOpen={isOpen}>{children}</ContainerStyles>;
};
