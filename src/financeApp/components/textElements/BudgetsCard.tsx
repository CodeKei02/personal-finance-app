import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { breakpoints, colors, typography } from "../../../styles/theme";
import { DropdownEditDelete } from "../dropdown";
import {
  updateBudgetItem,
  deleteBudgetItem,
} from "../../../store/slices/budgetsSlice";
import { useState } from "react";
import { RootState } from "../../../store/store";
import { CardHeader } from "./index";

const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${breakpoints.desktop}) {
    margin: 1rem 1rem 0 0;
  }
`;

const Card = styled.div`
  background-color: ${colors.white};
  padding: 1.5rem;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  p {
    color: ${colors.greyNormal};
    font-size: ${typography.textPreset4.size};
    font-weight: 500;
  }

  .paragraph {
    margin: 1rem 0;
  }

  .barra-container {
    position: relative;
    width: 100%;
    height: 40px;
    background-color: ${colors.greyLight};
    border-radius: 5px;
    padding: 1rem 0.25rem;
    z-index: 100;

    .barra-horizontal {
      height: 30px;
      border-radius: 5px;
      position: absolute;
      margin-right: 10px;
      max-width: 96%;
      top: 5px;
    }
  }

  .card-content {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .card-text {
      display: grid;
      grid-template-columns: 20px 10px;
    }

    .barra-vertical {
      border-radius: 5px;
      background-color: ${colors.greyLight};
      width: 5px;
      height: 40px;
    }
  }
`;

const ListContainer = styled.div`
  background-color: ${colors.greyLight};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  border-radius: 5px;

  .list-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .name {
      font-size: ${typography.textPreset4.size};
      font-weight: 700;
      color: ${colors.greyDark};
    }
  }

  a {
    text-decoration: none;
    color: ${colors.greyNormal};
  }

  li > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${colors.greyMedium};
    padding: 0.25rem;
  }

  li:last-child > div {
    border-bottom: none;
  }
`;
const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

interface ItemsInput {
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

interface FormBudgets {
  budgets?: ItemsInput[] | any;
  validationSchema: any;
}

export const BudgetsCard: React.FC<FormBudgets> = ({
  budgets,
  validationSchema,
}) => {
  const { transactions } = useSelector((state: RootState) => state.transaction);
  const { selectedItem, items } = useSelector(
    (state: RootState) => state.budget
  );
  const [dropdownId, setDropdownId] = useState(null);

  const handleDropdownToggle = (id: any) => {
    setDropdownId((prevId) => (prevId === id ? null : id));
  };

  const totalSpentByCategory = (budget: any) => {
    const totalSpent = transactions.reduce((acc: number, transaction: any) => {
      if (transaction.category === budget.category) {
        return acc + parseFloat(transaction.amount);
      }
      return acc;
    }, 0);
    return totalSpent;
  };

  return (
    <ContainerCard className="card-container">
      {items.map((budget: any) => (
        <Card key={budget.id} id={budget.id}>
          <CardHeader
            type={budget}
            name={budget.category}
            handleDropdownToggle={handleDropdownToggle}
          />
          <p className="paragraph">Maximum of ${budget.maximum.toFixed(2)}</p>
          <div>
            <div
              style={{ backgroundColor: budget.theme }}
              className="barra"
            ></div>
          </div>
          <div className="barra-container">
            <div
              className="barra-horizontal"
              style={{
                backgroundColor: budget.theme,
                width: `${Math.abs(budget.maximum)}px`,
              }}
            ></div>
          </div>
          <div className="card-content">
            <div className="card-text">
              <div
                className="barra-vertical"
                style={{ backgroundColor: budget.theme }}
              ></div>
              <div>
                <p>Spent</p>
                <strong>{totalSpentByCategory(budget)}$</strong>
              </div>
            </div>

            <div className="card-text">
              <div className="barra-vertical"></div>
              <div>
                <p>Free</p>
                <strong>
                  {budget.maximum - totalSpentByCategory(budget)}$
                </strong>
              </div>
            </div>
          </div>
          <ListContainer>
            <div className="list-header">
              <p className="name">Latest Spending</p>
              <Link to="/transactions">See All</Link>
            </div>

            <ul>
              {transactions
                .filter(
                  (transaction: any) => transaction.category == budget.category
                )
                .slice(0, 3)
                .map((transaction: any) => (
                  <li key={transaction.id}>
                    <div>
                      <p>{transaction.name}</p>
                      <ListContent>
                        <strong> {transaction.amount}$ </strong>
                        <span>{transaction.date}</span>
                      </ListContent>
                    </div>
                  </li>
                ))}
            </ul>
          </ListContainer>

          {dropdownId === budget.id && (
            <DropdownEditDelete
              method="budget"
              name="Budget"
              title="Edit Budget"
              paragraph="As your budgets changes, feel free to update your spending limits"
              category={budget.category}
              item={budget.id}
              onEdit={updateBudgetItem}
              onDelete={() => deleteBudgetItem(budget.id)}
              inputs={budgets}
              initialValues={{
                id: budget.id,
                category: selectedItem?.category || "",
                maximum: selectedItem?.maximum ?? 0,
                theme: selectedItem?.theme,
              }}
              validationSchema={validationSchema}
            />
          )}
        </Card>
      ))}
    </ContainerCard>
  );
};
