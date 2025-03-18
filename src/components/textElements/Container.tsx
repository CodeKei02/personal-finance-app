import styled from "styled-components";
import { breakpoints } from "../../styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ContainerProps {
    children?: any;
}

interface IsOpenProps {
    $isOpen: boolean;
}

const ContainerStyles = styled.section<IsOpenProps>`
    width: 100%;
    padding: 1rem;
    margin-bottom: 2rem;
    min-height: 100vh;
    
      @media (min-width: 786px) {
        margin-bottom: 3rem;
      }
    
      @media (min-width: ${breakpoints.desktop}){
        max-width: ${({ $isOpen }) => ($isOpen ? "80%" : "92%")};
        transition: max-width 0.5s cubic-bezier(.01,.98,0,.98);
        display: grid;
        place-self: flex-end;
      }
`;

export const Container: React.FC<ContainerProps> = ({ children }) => {
    const isOpen = useSelector((state: RootState) => state.ui.isOpen);

    return (
        <ContainerStyles $isOpen={isOpen}>
            {children}
        </ContainerStyles>
    )
}
