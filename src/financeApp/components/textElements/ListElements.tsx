import styled from "styled-components";
import { colors, typography } from "../../../styles/theme";
import { Paragraph } from "./index";

interface ListItem {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  transactiontype: string;
  recurring: boolean;
}

interface ListElementsProps {
  items: ListItem[] | any;
  theader?: string[];
  isCategory?: boolean;
  isTheader?: boolean;
  repeat: string;
}

const Table = styled.table`
  width: 100%;
`;

const Theadtr = styled.tr<{ repeat: string }>`
  display: grid;
  grid-template-columns: repeat(${({ repeat }) => repeat}, 1fr);
  justify-content: space-between;
  font-size: ${typography.textPreset5.size};
  letter-spacing: ${typography.textPreset5.letterSpacing};
  line-height: ${typography.textPreset5.lineHeight};
  color: ${colors.beigeNormal};
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.beigeLight};
`;

const Tr = styled.tr<{ repeat: string }>`
  display: grid;
  grid-template-columns: repeat(${({ repeat }) => repeat}, 1fr);
  justify-content: space-between;
  border-bottom: 1px solid ${colors.beigeLight};

  &:last-child {
    border-bottom: none;
  }

  figure {
    margin-right: 1rem;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    object-fit: cover;
  }
`;

const Td = styled.td`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const Text = styled.td`
  font-size: ${typography.textPreset5.size};
  line-height: ${typography.textPreset5.lineHeight};
  color: ${colors.greyNormal};
  align-self: center;
  justify-self: center;
`;

const TextBold = styled.td`
  font-size: ${typography.textPreset4Bold.size};
  font-weight: ${typography.textPreset4Bold.fontWeight};
  letter-spacing: ${typography.textPreset4Bold.letterSpacing};
  line-height: ${typography.textPreset4Bold.lineHeight};
  color: ${colors.greyDark};
  align-self: center;
  justify-self: center;
`;

export const ListElements: React.FC<ListElementsProps> = ({
  items,
  theader,
  isCategory,
  isTheader,
  repeat,
}) => {
  const transactionType = (item: any) => {
    return item.transactiontype === "income" ? colors.green : colors.red;
  };
  return (
    <>
      <Table>
        {isTheader && (
          <thead>
            <Theadtr repeat={repeat}>
              {theader?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </Theadtr>
          </thead>
        )}

        <tbody>
          {items.length > 0 &&
            items.map((data: any, index: any) => (
              <Tr key={index} repeat={repeat}>
                <Td>
                  <div>
                    <strong>{data.name}</strong>
                  </div>
                </Td>
                {isCategory && <Text>{data.category}</Text>}
                <Text>{data.date}</Text>

                <TextBold style={{ color: transactionType(data) }}>
                  $ {data.transactiontype === "income" ? "+" : "-"}
                  {Math.abs(data.amount).toFixed(2)}
                </TextBold>
              </Tr>
            ))}
        </tbody>
      </Table>
      {items.length < 0 && <Paragraph align="center">No results</Paragraph>}
    </>
  );
};
