import { colors } from "@/styles/colors";
import { Paragraph } from "./Paragraph";
import { Motion } from "./Motion";
import { ListElementsProps, ListItem } from "./types";
import { RecurringBill } from "@/features/bills/types";

export const ListElements: React.FC<ListElementsProps> = ({
  items,
  theader,
  isCategory,
  isTheader,
  repeat,
}) => {
  const transactionType = (item: ListItem | RecurringBill) => {
    return item.transactiontype === "income" ? colors.green : colors.red;
  };
  return (
    <>
      <div className={`w-full flex flex-col`}>
        {isTheader && (
          <div
            className="w-full grid justify-between place-items-center mt-6 mb-4 pb-4 border-b border-beigeLight text-preset5 text-beigeNormal"
            style={{ gridTemplateColumns: `repeat(${repeat}, 1fr)` }}
          >
            {theader?.map((header, index) => (
              <div key={index}>{header}</div>
            ))}
          </div>
        )}

        {items.length > 0 &&
          items.map((data: ListItem | RecurringBill, index: number) => (
            <Motion
              key={index}
              card={index}
              index={index}
              style={{ display: "block", width: "100%" }}
            >
              <div
                key={index}
                className=" grid justify-between border-b border-beigeLight last:border-b-0"
                style={{ gridTemplateColumns: `repeat(${repeat}, 1fr)` }}
              >
                <div className="flex gap-4 my-4">
                  <strong>{data.name}</strong>
                </div>
                {isCategory && (
                  <div className="text-preset5 text-greyNormal self-center justify-self-center">
                    {data.category}
                  </div>
                )}
                <div className="text-preset5 text-greyNormal self-center justify-self-center">
                  {data.date}
                </div>

                <div
                  className="text-preset4Bold font-extrabold text-greyDark self-center justify-self-center"
                  style={{ color: transactionType(data) }}
                >
                  $ {data.transactiontype === "income" ? "+" : "-"}
                  {Math.abs(data.amount).toFixed(2)}
                </div>
              </div>
            </Motion>
          ))}
      </div>
      {items.length < 0 && <Paragraph align="center">No results</Paragraph>}
    </>
  );
};
