import styled from "styled-components";
import { colors, typography } from "../../styles/theme";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface DropdownMobileProps {
    text: string;
    items: string[];
    dispatchAction: (value: any) => any;
}

const Div = styled.div`
    width: max-content;
    background-color: ${colors.white};
    color: ${colors.greyDark};
    position: absolute;
    right: 45px;
    top: 200px;
    padding: 1rem;
    box-shadow: 0px 0px 5px 0px ${colors.greyDark};
    border-radius: 8px;
    

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
`;

const Title = styled.span`
    font-size: ${typography.textPreset4Bold.size};
    font-weight: ${typography.textPreset4Bold.fontWeight};
    line-height: ${typography.textPreset4Bold.lineHeight};
`;

const Button = styled.button`
    background: transparent;
    border: 0;
    color: ${colors.greyDark};
    cursor: pointer;
`;

export const DropdownMobile: React.FC<DropdownMobileProps> = ({ text, items, dispatchAction }) => {
    const [selected, setSelected] = useState(text);
    const dispatch = useDispatch();
    
    const handleSelect = (value: string) => {
        setSelected(value)
        dispatch(dispatchAction(value));
    }
    return (
        <Div>
            <Title>{selected}</Title>
            {items.map((item, index) => (
               <Button key={index} onClick={() => handleSelect(item)} >{item}</Button>
            ))}
        </Div>
    )
    
}
