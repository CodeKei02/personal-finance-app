import { Button } from "@/components";
import { Headline } from "@/features/shared/components/textElements/Headline";
import { Container } from "@/features/shared/components/textElements/Container";
import { Header } from "@/features/shared/components/textElements/Header";
import { BudgetsCard } from "./components/BudgetsCard";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";
import { PlanModal } from "@/features/shared/components/modals/PlanModal";
import { Chart } from "@/features/shared/components/donut/Chart";
import { useState } from "react";
import { FormInput } from "@/features/shared/components/modals/type";
import * as Yup from "yup";
import { addBudgetItem } from "@/store/slices/budgetsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LegendContent } from "@/features/shared/components/donut/LegendContent";
import type { Budget } from "@/features/budgets/types";

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
  const usedColors = items.map((item) => item.theme);

  return (
    <Container>
      <Header>
        <Headline title="Budgets" />
        <Button
          children="+Add New Budget"
          background={colors.greyDark}
          backgroundhover={colors.greyMedium}
          color={colors.white}
          weight={typography.textPreset4Bold.fontWeight}
          border="transparent"
          size={typography.textPreset4Bold.size}
          width="auto"
          onClick={() => setOpenModal(true)}
        />
      </Header>
      <PlanModal<{ category: string; maximum: number }, Budget>
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
      <div className="lg:flex">
        {items.length === 0 ? (
          <p style={{ color: colors.beigeNormal }}>There are no budgets yet</p>
        ) : (
          <>
            <div className="w-full bg-white flex flex-col py-6 px-4 my-6 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] min-[600px]:flex-row min-[600px]:items-center min-[600px]:h-[350px] lg:max-w-full lg:h-max lg:my-4 lg:mr-4 lg:mt-0 lg:flex-col [&_.legend]:w-full [&_.legend]:mt-4 [&_.legend]:px-4 [&_.legend-item]:w-full">
              <Chart items={items} transactions={transactions} />
              <LegendContent
                title={true}
                budgets={items}
                transactions={transactions}
              />
            </div>
            <BudgetsCard
              budgets={budgetInputs}
              validationSchema={budgetValidationSchema}
            />
          </>
        )}
      </div>
    </Container>
  );
};
