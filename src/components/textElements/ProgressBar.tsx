import styled from "styled-components";


const ProgressBarStyled = styled.div`
  background-color: #e0e0e0;
  border-radius: 10px;
  width: 100%;
  
  height: 8px;
  position: relative;
`;

const ProgressFill = styled.div<{ percent: number }>`
  background-color: #2acfcf;
  width: ${({ percent }) => percent}%;
  height: 100%;
  max-width: 100%;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

interface ProgressBarProps {
    percent: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({percent}) => {
    return (
        <ProgressBarStyled>
            <ProgressFill percent={percent} />
        </ProgressBarStyled>
    )
}
