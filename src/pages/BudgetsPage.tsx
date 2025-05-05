import { Button } from "../components/form/index"
import { Headline, Container, Header, BudgetsCard } from "../components/textElements"
import { colors, typography } from "../styles/theme"
import { PlanModal } from "../components/modals"
import { Chart } from "../components/donut/Chart"
import { useState } from "react"
import { FormInput } from "../components/modals"
import * as Yup from "yup"
import { addBudgetItem } from "../store/slices/budgetsSlice"

export const BudgetsPage = () => {
  const categories = ["Entertainment", "Bills", "Groceries", "Dining Out", "Transportation", "Personal Care", "Education"];

  const budgetInputs: FormInput[] = [
    {
      id: 'budget-category',
      type: 'select',
      label: 'Category',
      name: 'category',
      placeholder: 'Enter category name',
      options: categories,
    },
    {
      id: 'budget-maximum',
      type: 'number',
      label: 'Maximum Spend',
      name: 'maximum',
      placeholder: '$ e.g 2000',
    },
  ];
  const budgetValidationSchema = Yup.object({
    category: Yup.string().required('Category is required'),
    maximum: Yup.number().positive().required(),
  });

  const [openModal, setOpenModal] = useState(false)
  return (
    <Container >
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
        initialValues={{ category: '', maximum: 0 }}
        validationSchema={budgetValidationSchema}
        showModal={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Chart />
      <BudgetsCard
        budgets={budgetInputs}
        validationSchema={budgetValidationSchema}
        />

    </Container >
  )
}
