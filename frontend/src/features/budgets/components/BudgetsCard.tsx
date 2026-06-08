import { Link } from "react-router-dom";
import { DropdownEditDelete } from "@/features/shared/components/dropdown/DropdownEditDelete";
import { useBudgetStore } from "@/store/useBudgetStore";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useState } from "react";
import { CardHeader } from "@/features/shared/components/textElements/CardHeader";
import { Motion } from "@/features/shared/components/textElements/Motion";
import { FormBudgets } from "../types";
import type { Budget } from "../types";
import type { Transaction } from "@/features/transactions/types";
import type { FormInput } from "@/features/shared/components/modals/type";

export const BudgetsCard: React.FC<FormBudgets> = ({
  budgets,
  validationSchema,
}) => {
  const transactions = useTransactionStore((state) => state.all);
  const items = useBudgetStore((state) => state.items);
  const selectedItem = useBudgetStore((state) => state.selectedItem);
  const updateBudget = useBudgetStore((state) => state.updateBudget);
  const deleteBudget = useBudgetStore((state) => state.deleteBudget);
  const [dropdownId, setDropdownId] = useState<string | null>(null);

  const handleDropdownToggle = (id: string) => {
    setDropdownId((prevId) => (prevId === id ? null : id));
  };

  const totalSpentByCategory = (budget: Budget) => {
    const totalSpent = transactions.reduce(
      (acc: number, transaction: Transaction) => {
        if (transaction.category === budget.category) {
          return acc + parseFloat(String(transaction.amount));
        }
        return acc;
      },
      0
    );
    return totalSpent;
  };

  const budgetInputs: FormInput[] = budgets ?? [];

  return (
    <div className="flex flex-col gap-4 w-full mx-auto lg:my-4 lg:mr-4 lg:mt-0 card-container">
      {items.map((budget: Budget, index: number) => (
        <Motion key={budget.id} card={budget.id} index={index}>
          <div
            key={budget.id}
            id={budget.id}
            className="bg-white p-6 relative rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] [&_ul]:list-none [&_a]:no-underline [&_p]:text-greyNormal [&_p]:text-preset4 [&_p]:font-medium"
          >
            <CardHeader
              type={budget}
              name={budget.category}
              handleDropdownToggle={handleDropdownToggle}
            />
            <p className="my-4 paragraph">
              Maximum of ${budget.maximum.toFixed(2)}
            </p>
            <div>
              <div
                style={{ backgroundColor: budget.theme }}
                className="barra"
              ></div>
            </div>
            <div className="relative w-full h-10 bg-greyLight rounded-md py-4 px-1 z-100 barra-container">
              <div
                className="h-[30px] rounded-md absolute mr-2.5 max-w-[96%] top-[5px] barra-horizontal"
                style={{
                  backgroundColor: budget.theme,
                  width: `${Math.abs(budget.maximum)}px`,
                }}
              ></div>
            </div>
            <div className="mt-4 grid grid-cols-2 card-content [&_.card-text]:grid [&_.card-text]:grid-cols-[20px_10px] [&_.barra-vertical]:rounded-md [&_.barra-vertical]:bg-greyLight [&_.barra-vertical]:w-1 [&_.barra-vertical]:h-10">
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
            <div className="bg-greyLight p-4 flex flex-col mt-4 rounded-md ListContainer [&_.list-header]:flex [&_.list-header]:justify-between [&_.list-header]:mb-4 [&_.name]:text-preset4 [&_.name]:font-bold [&_.name]:text-greyDark [&_a]:no-underline [&_a]:text-greyNormal [&_li>div]:flex [&_li>div]:justify-between [&_li>div]:items-center [&_li>div]:border-b [&_li>div]:border-greyMedium [&_li>div]:py-1 [&_li:last-child>div]:border-b-0">
              <div className="list-header">
                <p className="name">Latest Spending</p>
                <Link to="/transactions">See All</Link>
              </div>

              <ul>
                {transactions
                  .filter(
                    (transaction: Transaction) =>
                      transaction.category === budget.category
                  )
                  .slice(0, 3)
                  .map((transaction: Transaction) => (
                    <li key={transaction.id}>
                      <div>
                        <p>{transaction.name}</p>
                        <div className="flex flex-col items-end">
                          <strong> {transaction.amount}$ </strong>
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            {dropdownId === budget.id && (
              <DropdownEditDelete
                method="budget"
                name="Budget"
                title="Edit Budget"
                paragraph="As your budgets changes, feel free to update your spending limits"
                category={budget.category}
                item={budget}
                onEdit={updateBudget}
                onDelete={(item: Budget) => deleteBudget(item.id)}
                inputs={budgetInputs}
                initialValues={{
                  id: budget.id,
                  category: selectedItem?.category ?? budget.category,
                  maximum: selectedItem?.maximum ?? budget.maximum,
                  theme: selectedItem?.theme ?? budget.theme,
                }}
                validationSchema={validationSchema}
              />
            )}
          </div>
        </Motion>
      ))}
    </div>
  );
};
