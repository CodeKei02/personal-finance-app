import styled from "styled-components";

const ProgressBarStyled = styled.div`
  background-color: #e0e0e0;
  border-radius: 10px;
  width: 100%;

  height: 8px;
  position: relative;
`;

const ProgressFill = styled.div<{ percent: number; backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: ${({ percent }) => percent}%;
  height: 100%;
  max-width: 100%;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

interface ProgressBarProps {
  backgroundColor: string;
  amount: number;
  target: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  backgroundColor,
  amount,
  target,
}) => {
  const calculateProgress = (amount: number, target?: number): number => {
    if (!target || target <= 0) return 0;
    return Math.min(Math.max((amount / target) * 100, 0), 100);
  };
  const progress = calculateProgress(amount, target);

  return (
    <ProgressBarStyled>
      <ProgressFill percent={progress} backgroundColor={backgroundColor} />
    </ProgressBarStyled>
  );
};
