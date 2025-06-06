import styled from "styled-components";
import { colors } from "../../../styles/theme";
import {
  getTotalAmount,
  getPaidBills,
  getUpcomingBills,
  getDueSoonBills,
} from "../../utils/billsUtils";
const SummaryStyles = styled.div<{ borderColor?: string }>`
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;

  p {
    font-size: 1rem;
    color: ${colors.greyDark};
    font-weight: 700;
  }

  div {
    display: flex;
    justify-content: space-between;
    border-left: 7px solid
      ${({ borderColor }) => borderColor || colors.beigeNormal};
    border-radius: 8px;
    background-color: ${colors.beigeLight};
    padding: 1.5rem 0.5rem;
    overflow-x: scroll;

    &:last-child {
      border-bottom: none;
    }

    p {
      margin-left: 1rem;
    }

    p:first-child {
      font-size: 0.9rem;
      font-weight: 400;
      color: ${colors.greyNormal};
    }

    p:last-child {
      font-size: 1rem;
      font-weight: 700;
      color: ${colors.greyDark};
    }

    @media (min-width: 1000px) {
      overflow-x: hidden;
      padding: 1.5rem 1rem;
    }
  }
`;

interface SummaryProps {
  transactions: any[];
}

export const Summary: React.FC<SummaryProps> = ({ transactions }) => {
  const summaryData = [
    {
      title: "Paid Bills",
      amount: getTotalAmount(getPaidBills(transactions)),
      borderColor: colors.green,
      billsLenght: getPaidBills(transactions).length,
    },
    {
      title: "Total Upcoming",
      amount: getTotalAmount(getUpcomingBills(transactions)),
      borderColor: colors.red,
      billsLenght: getUpcomingBills(transactions).length,
    },
    {
      title: "Due Soon",
      amount: getTotalAmount(getDueSoonBills(transactions)),
      borderColor: colors.yellow,
      billsLenght: getDueSoonBills(transactions).length,
    },
  ];

  return (
    <SummaryStyles>
      {summaryData.map((item, index) => (
        <div key={index} style={{ borderLeftColor: item.borderColor }}>
          <p>{item.title}</p>
          <p>
            {item.billsLenght}
            (${item.amount})
          </p>
        </div>
      ))}
    </SummaryStyles>
  );
};
