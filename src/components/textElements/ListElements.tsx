import styled from "styled-components";
import imageData from "../../images.json";
import { breakpoints, colors, typography } from "../../styles/theme";
import { prevPage, nextPage } from "../../store/slices/transactionsSlice";
import { useEffect, useMemo, useState } from "react";
import iconArrowLeft from "../../../public/images/icon-caret-left.svg"
import iconArrowRight from "../../../public/images/icon-caret-right.svg"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ListItem {
  transactionName: string;
  category: string;
  date: string;
  amount: number;
}

interface ListElementsProps {
  items: ListItem[][];
}

const Table = styled.table`
  width: 100%;
`;

const Theadtr = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0rem 1.5rem 0rem .5rem;
  font-size: ${typography.textPreset5.size};
  letter-spacing: ${typography.textPreset5.letterSpacing};
  line-height: ${typography.textPreset5.lineHeight};
  color: ${colors.beigeNormal};
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.beigeLight};
`;

const Tr = styled.tr`
  display: grid;
  grid-template-columns: repeat(4, 60px);
  justify-content: space-between;
  border-bottom: 1px solid ${colors.beigeLight};


  &:last-child{
    border-bottom: none;
  }

  figure{
    margin-right: 1rem;
  }

  img{
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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width:${breakpoints.tablet}){
    justify-content: space-between;
  }
`;

const ButtonArrow = styled.button`
  width: 60px;
  height: 40px;
  background: transparent;
  border-radius: .5rem;
  border: 1px solid ${colors.beigeNormal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  cursor: pointer;
  
  img{
    width: 1rem;
    height: 1rem;
  }

  span{
    font-size: ${typography.textPreset4.size};
    display: none;
  }

  @media (min-width: ${breakpoints.tablet}){
    width: 100px;
    gap: 1rem;
    
    span{
      display: flex;
    }
  }
`;

const ListNumbers = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: .5rem;
  
  li{
    width: 40px;
    height: 40px;
    padding: .5rem;
    text-align: center;
    border-radius: .5rem;
    border: 1px solid ${colors.beigeNormal};
  }
`;

const Paragraph = styled.p`
  color: ${colors.beigeNormal};
  margin: 1rem 0;
  letter-spacing: 1px;
`;

const getRandomImage = (imageData: { src: string; name: string }[]) => {
  let randomIndex = Math.floor(Math.random() * imageData.length);
  return imageData[randomIndex];
}

export const ListElements: React.FC<ListElementsProps> = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; name: string; } | null>(null);
  const { currentList } = useSelector((state: RootState) => state.transactions);
  const dispatch = useDispatch();
  const transactions = items[currentList] || [];


  useEffect(() => {
    if (imageData.length > 0) {
      setSelectedImage(getRandomImage(imageData))
    }
  }, [imageData]);

  return (
    <>
      <Table>
        <thead>
          <Theadtr>
            <th>Recipient/Sender</th>
            <th>Category</th>
            <th>Transaction Date</th>
            <th>Amount</th>
          </Theadtr>
        </thead>
        <tbody>
          {Array.isArray(items[currentList]) && items[currentList].length > 0 ? (
            transactions.map((data, index) => (
              <Tr key={index}>
                <Td>
                  <div>
                    <img src={selectedImage?.src} alt={selectedImage?.name} />
                  </div>
                  <div>
                    <strong>{data.transactionName}</strong>
                  </div>
                </Td>
                <Text>{data.category}</Text>
                <Text>{data.date}</Text>
                <TextBold>${data.amount}</TextBold>
              </Tr>
            ))
          ) : (
            <Paragraph>No results</Paragraph>
          )}
        </tbody>
      </Table>
      <ButtonContainer>
        <ButtonArrow onClick={() => dispatch(prevPage())}>
          <img src={iconArrowLeft} alt="prev" />
          <span>Prev</span>
        </ButtonArrow>
        <ListNumbers>
          <li>{currentList + 1}</li>
        </ListNumbers>
        <ButtonArrow onClick={() => dispatch(nextPage())}>
          <span>Next</span>
          <img src={iconArrowRight} alt="next" />
        </ButtonArrow>
      </ButtonContainer>
    </>

  )
}
