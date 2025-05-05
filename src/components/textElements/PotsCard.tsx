import { useSelector } from "react-redux"
import { CardHeader } from "./index"
import { Button } from "../form";
import { colors } from "../../styles/theme";
import styled from "styled-components";
import { useState } from "react";
import { PotActionModal } from "../modals/index";
import { RootState } from "../../store/store";
import { potActions } from "../../store/slices/potsSlice";

const Paragraph = styled.p`
  color: ${colors.beigeNormal};
  margin: 1rem 0;
  letter-spacing: 1px;
`;

const Card = styled.div`
    background-color: ${colors.white};
    padding: 1.5rem;
    position: relative;
    border-radius: 8px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`

const ProgressBar = styled.div`
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
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

const Flex = styled.div`
  display: flex;
  
`


export const PotsCard = () => {
  const { items, selectedItem, isEditModalOpen } = useSelector((state: RootState) => state.pot)
  const [action, setAction] = useState<"add" | "withdran" | null>(null)
  const [openModal, setOpenModal] = useState(false)

  console.log("items", items)
  console.log("selectedItem", selectedItem)
  return (
    <>
      {items.length > 0 ?
        <>
          {items.map((item: any) => (
            <Card key={item.id}>
              <CardHeader
                type={item}
                name={item.potName}
                handleDropdownToggle={() => { }}
              />
              <Flex>
                <Paragraph>Total saved</Paragraph>
                <h1>{}</h1>
              </Flex>
              <ProgressBar>
                <ProgressFill percent={1} />
              </ProgressBar>
              <Flex>
                <span></span>
                <Paragraph>Target of ${item.target}</Paragraph>
              </Flex>
              <Flex>
                <Button
                  children="+ Add Money"
                  background={colors.greyLight}
                  color={colors.greyDark}
                  weight="bold"
                  border="transparent"
                  size="1rem"
                  width="auto"
                  onClick={() => { setAction("add"); setOpenModal(true) }}
                ></Button>
                <Button
                  children="Withdraw"
                  background={colors.greyLight}
                  color={colors.greyDark}
                  weight="bold"
                  border="transparent"
                  size="1rem"
                  width="auto"
                ></Button>
              </Flex>
              
                <PotActionModal
                  showModal={isEditModalOpen}
                  onClose={() => potActions.openEditModal(false)}
                  title="Add Money"
                  action="add"
                  selectedPot={item}
                />
          
            </Card>

          ))
          }
        </>
        : <Paragraph> No pots available</Paragraph>
      }
    </>
  )
}
