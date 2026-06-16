import { ListItem } from "@/features/shared/components/textElements/types"
import { Budget } from "@/features/budgets/types"


interface LegendContentProps {
  budgets: Budget[];
  transactions: ListItem[];
  title?: boolean;
  align?: string;
  direction?: string;
}

export const LegendContent: React.FC<LegendContentProps> = ({
  budgets,
  transactions,
  title,
  align,
}) => {
  const alignClass = align === "center" ? "items-center" : align === "flex-end" ? "items-end" : "items-start";

  return (
    <div className={`flex flex-col ${alignClass} min-[670px]:mt-0 min-[670px]:grow-[0.5] legend`}>
      {title && (
        <h2 className="self-center my-5 text-2xl font-black text-greyDark min-[670px]:self-start spending-summary">
          Spending Summary
        </h2>
      )}
      {budgets.map((budget: Budget, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between mx-auto mb-2.5 w-[300px] border-b border-greyLight py-2.5 last:border-b-0 min-[670px]:mx-0 legend-item"
        >
          <div className="flex">
            <div
              className="w-1 h-[21px] mr-2.5 color-box"
              style={{ backgroundColor: budget.theme }}
            ></div>
            <span className="text-base text-greyNormal font-semibold ml-1 label">{budget.category}</span>
          </div>
          <article className="flex gap-1">
            <strong>
              {transactions
                .filter(
                  (transaction: ListItem) =>
                    transaction.category === budget.category,
                )
                .reduce(
                  (acc, transaction) => acc + Number(transaction.amount),
                  0
                )}
              $
            </strong>
            {title && <span className="text-base text-greyNormal font-semibold ml-1 label">of {budget.maximum}$</span>}
          </article>
        </div>
      ))}
    </div>
  );
};
