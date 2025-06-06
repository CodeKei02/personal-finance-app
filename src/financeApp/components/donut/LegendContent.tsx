import styled from "styled-components";
import { colors, typography } from "../../../styles/theme";

const LegendContainer = styled.div<{ align?: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || "flex-start"};

  h2 {
    align-self: center;
    margin: 20px 0;
    font-size: 1.5rem;
    line-height: ${typography.textPreset2.lineHeight};
    font-weight: 900;
    color: ${colors.greyDark};
  }

  @media (min-width: 670px) {
    margin-top: 0;
    flex-grow: 0.5;

    h2 {
      align-self: flex-start;
    }
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 10px;
  width: 300px;
  border-bottom: 1px solid ${colors.greyLight};
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  .color-box {
    width: 4px;
    height: 21px;
    margin-right: 10px;
  }

  .label {
    font-size: 1rem;
    color: ${colors.greyNormal};
    font-weight: 600;
    margin-left: 0.25rem;
  }

  @media (min-width: 670px) {
    margin: 0;
  }
`;

const LegendText = styled.div`
  display: flex;
`;

const LegendInfo = styled.article`
  display: flex;
  gap: 0.25rem;
`;

interface LegendContentProps {
  items: any[];
  transactions: any[];
  title?: boolean;
  align?: string;
  direction?: string;
}

export const LegendContent: React.FC<LegendContentProps> = ({
  items,
  transactions,
  title,
  align,
}) => {
  return (
    <LegendContainer align={align} className="legend">
      {title && <h2 className="spending-summary">Spending Summary</h2>}
      {items.map((budget: any, index: number) => (
        <LegendItem key={index} className="legend-item">
          <LegendText>
            <div
              className="color-box"
              style={{ backgroundColor: budget.theme }}
            ></div>
            <span className="label">{budget.category}</span>
          </LegendText>
          <LegendInfo>
            <strong>
              {transactions
                .filter(
                  (transaction: any) => transaction.category === budget.category
                )
                .reduce(
                  (acc, transaction) => acc + Number(transaction.amount),
                  0
                )}
              $
            </strong>
            {title && <span className="label">of {budget.maximum}$</span>}
          </LegendInfo>
        </LegendItem>
      ))}
    </LegendContainer>
  );
};
