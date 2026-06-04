import { colors } from "@/styles/colors";
import {
  getTotalAmount,
  getPaidBills,
  getUpcomingBills,
  getDueSoonBills,
} from "@/features/bills/utils/billsUtils";
import { SummaryProps } from "./types";

export const Summary: React.FC<SummaryProps> = ({ transactions }) => {
  const summaryData = [
    {
      title: "Paid Bills",
      amount: getTotalAmount(getPaidBills(transactions)),
      borderColor: colors.green,
      billsLenght: getPaidBills(transactions).length,
    },
    {
      title: "Total Upcoming",
      amount: getTotalAmount(getUpcomingBills(transactions)),
      borderColor: colors.red,
      billsLenght: getUpcomingBills(transactions).length,
    },
    {
      title: "Due Soon",
      amount: getTotalAmount(getDueSoonBills(transactions)),
      borderColor: colors.yellow,
      billsLenght: getDueSoonBills(transactions).length,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-4 my-6">
      {summaryData.map((item, index) => (
        <div
          key={index}
          className="flex justify-between rounded-lg bg-beigeLight py-6 px-2 overflow-x-scroll min-[1000px]:overflow-x-hidden min-[1000px]:px-4 min-[1000px]:py-6"
          style={{ borderLeft: `7px solid ${item.borderColor}` }}
        >
          <p className="ml-4 text-[0.9rem] font-normal text-greyNormal">
            {item.title}
          </p>
          <p className="ml-4 text-base font-bold text-greyDark">
            {item.billsLenght}
            (${item.amount})
          </p>
        </div>
      ))}
    </div>
  );
};
