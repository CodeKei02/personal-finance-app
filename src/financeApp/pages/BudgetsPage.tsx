import { Button } from "../../components";
import {
  Headline,
  Container,
  Header,
  BudgetsCard,
} from "../components/textElements";
import { breakpoints, colors, typography } from "../../styles/theme";
import { PlanModal } from "../components/modals";
import { Chart } from "../components/donut/Chart";
import { useState } from "react";
import { FormInput } from "../components/modals";
import * as Yup from "yup";
import { addBudgetItem } from "../../store/slices/budgetsSlice";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LegendContent } from "../components/donut/LegendContent";

const ChartContainer = styled.div`
  width: 100%;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  margin: 1.5rem 0;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    height: 350px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    max-width: 100%;
    height: max-content;
    margin: 1rem 1rem 0 0;
    flex-direction: column;

    .legend {
      width: 100%;
      margin-top: 1rem;
      padding: 0 1rem;

      .legend-item {
        width: 100%;
      }
    }
  }
`;

const BudgetContainer = styled.div`
  @media (min-width: ${breakpoints.desktop}) {
    display: flex;
  }
`;

export const BudgetsPage = () => {
  const categories = [
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining Out",
    "Transportation",
    "Personal Care",
    "Education",
  ];

  const budgetInputs: FormInput[] = [
    {
      id: "budget-category",
      type: "select",
      label: "Category",
      name: "category",
      placeholder: "Enter category name",
      options: categories,
    },
    {
      id: "budget-maximum",
      type: "number",
      label: "Maximum Spend",
      name: "maximum",
      placeholder: "$ e.g 2000",
    },
  ];
  const budgetValidationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    maximum: Yup.number().positive().required(),
  });

  const [openModal, setOpenModal] = useState(false);
  const { items } = useSelector((state: RootState) => state.budget);
  const { transactions } = useSelector((state: RootState) => state.transaction);
  const usedColors = items.map((item: any) => item.theme);
  return (
    <Container>
      <Header>
        <Headline title="Budgets" />
        <Button
          children="+Add New Budget"
          background={colors.greyDark}
          color={colors.white}
          weight={typography.textPreset4Bold.fontWeight}
          border="transparent"
          size={typography.textPreset4Bold.size}
          width="auto"
          onClick={() => setOpenModal(true)}
        />
      </Header>
      <PlanModal
        title="Add New Budget"
        paragraph="Choose a category to set a spending budget. These categories can help you monitor spending"
        buttonText="Add Budget"
        dispatchAction={addBudgetItem}
        inputs={budgetInputs}
        initialValues={{ category: "", maximum: 0 }}
        validationSchema={budgetValidationSchema}
        showModal={openModal}
        usedColors={usedColors}
        onClose={() => setOpenModal(false)}
      />
      <BudgetContainer>
        {items.length === 0 ? (
          <p style={{ color: colors.beigeNormal }}>There are no budgets yet</p>
        ) : (
          <>
            <ChartContainer>
              <Chart items={items} transactions={transactions} />
              <LegendContent
                title={true}
                items={items}
                transactions={transactions}
              />
            </ChartContainer>
            <BudgetsCard
              budgets={budgetInputs}
              validationSchema={budgetValidationSchema}
            />
          </>
        )}
      </BudgetContainer>
    </Container>
  );
};
