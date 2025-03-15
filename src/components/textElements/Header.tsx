import styled from "styled-components";

interface HeaderProps {
    children: any;
}

const HeaderStyles = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
`;

export const Header: React.FC<HeaderProps> = ({children}) => {
    return (
        <HeaderStyles>
            {children}
        </HeaderStyles>
    )
}
