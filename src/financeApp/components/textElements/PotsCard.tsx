import { useSelector } from "react-redux";
import { CardHeader, ProgressBar } from "./index";
import { Button } from "../../../components";
import { breakpoints, colors } from "../../../styles/theme";
import styled from "styled-components";
import React, { useState } from "react";
import { PotActionModal } from "../modals/index";
import { RootState } from "../../../store/store";
import { DropdownEditDelete } from "../dropdown";
import { updatePotItem, deletePotItem } from "../../../store/slices/potsSlice";

const PotsCardContainer = styled.div`
  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const Paragraph = styled.p`
  color: ${colors.beigeNormal};
  margin: 1rem 0;
  letter-spacing: 1px;
`;

const Card = styled.div`
  width: 100%;
  background-color: ${colors.white};
  padding: 1.5rem;
  margin: 1.5rem 0;
  position: relative;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  @media (min-width: 670px) {
    margin: 1rem 3.5rem 0 0;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;

  button {
    width: 100%;
  }
`;

interface ItemsInput {
  id: string;
  potName: string;
  amount: number;
  target: number;
  theme: string;
}

interface FormPot {
  pots: ItemsInput[] | any;
  validationSchema: any;
}

export const PotsCard: React.FC<FormPot> = ({ pots, validationSchema }) => {
  const { items, selectedItem } = useSelector((state: RootState) => state.pot);
  const [action, setAction] = useState<"add" | "withdraw" | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(null);

  const handleDropdownToggle = (id: any) => {
    setIsOpenDropdown((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {items.length > 0 ? (
        <PotsCardContainer className="PotsCard">
          {items.map((item: any) => (
            <Card key={item.id}>
              <CardHeader
                type={item}
                name={item.potName}
                handleDropdownToggle={() => {
                  handleDropdownToggle(item.id);
                }}
              />
              <Flex>
                <Paragraph>Total saved</Paragraph>
                <h1>{`$${item.amount.toFixed(2)}`}</h1>
              </Flex>
              <ProgressBar
                amount={item.amount}
                target={item.target}
                backgroundColor={item.theme}
              ></ProgressBar>
              <Flex>
                <Paragraph>
                  <strong>
                    {((item.amount * item.target) / 100).toFixed(2)}%
                  </strong>
                </Paragraph>
                <Paragraph>Target of ${item.target}</Paragraph>
              </Flex>
              <ButtonContainer>
                <Button
                  children="+ Add Money"
                  background={colors.greyLight}
                  color={colors.greyDark}
                  weight="bold"
                  border="transparent"
                  size="1rem"
                  width="auto"
                  onClick={() => {
                    setAction("add");
                    handleDropdownToggle(item.id);
                    setIsOpenModal(true);
                  }}
                ></Button>
                <Button
                  children="Withdraw"
                  background={colors.greyLight}
                  color={colors.greyDark}
                  weight="bold"
                  border="transparent"
                  size="1rem"
                  width="auto"
                  onClick={() => {
                    setAction("withdraw");
                    setIsOpenModal(true);
                  }}
                ></Button>
              </ButtonContainer>

              {action === "add" && isOpenDropdown === item.id && (
                <PotActionModal
                  showModal={isOpenModal}
                  onClose={() => setIsOpenModal(false)}
                  title="Add Money"
                  action="add"
                  selectedPot={item}
                />
              )}
              {action === "withdraw" && isOpenDropdown === item.id && (
                <PotActionModal
                  showModal={isOpenModal}
                  onClose={() => setIsOpenModal(false)}
                  title="Withdraw Money"
                  action="withdraw"
                  selectedPot={item}
                />
              )}

              {isOpenDropdown === item.id && (
                <DropdownEditDelete
                  method="pot"
                  name="Pot"
                  category={item.potName}
                  title="Edit Pot"
                  paragraph="If your savings targets change, feel free to update your pots."
                  item={item.id}
                  onEdit={updatePotItem}
                  onDelete={() => deletePotItem(item.id)}
                  inputs={pots}
                  initialValues={{
                    id: item.id,
                    potName: selectedItem?.potName || "",
                    amount: selectedItem?.amount || 0,
                    target: selectedItem?.target ?? 0,
                    theme: selectedItem?.theme,
                  }}
                  validationSchema={validationSchema}
                />
              )}
            </Card>
          ))}
        </PotsCardContainer>
      ) : (
        <Paragraph>You don't have a pot account yet.</Paragraph>
      )}
    </>
  );
};
