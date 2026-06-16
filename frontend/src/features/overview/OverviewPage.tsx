import { Header } from "@/features/shared/components/textElements/Header";
import { Container } from "@/features/shared/components/textElements/Container";
import { Headline } from "@/features/shared/components/textElements/Headline";
import { ListElements } from "@/features/shared/components/textElements";
import { Summary } from "@/features/shared/components/textElements/Summary";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";
import { Link } from "react-router-dom";
import { Chart } from "@/features/shared/components/donut/Chart";
import { LegendContent } from "@/features/shared/components/donut/LegendContent";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { OverviewDetails } from "./types";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { usePotStore } from "@/store/usePotStore";
import { useBudgetStore } from "@/store/useBudgetStore";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useAuthStore } from "@/store/useAuthStore";
import { CurrencySelector } from "@/features/shared/components/currency/CurrencySelector";
import { api } from "@/lib/api";
import type { Pot } from "@/features/pots/types";

export const OverviewPage = () => {
  const pots = usePotStore((state) => state.items);
  const budgets = useBudgetStore((state) => state.items);
  const transactions = useTransactionStore((state) => state.all);
  const format = useCurrencyStore((state) => state.format);
  const currency = useCurrencyStore((state) => state.currency);
  const logout = useAuthStore((state) => state.logout);

  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  // Demonstrates the server-side aggregate endpoint (prisma aggregate _sum).
  useEffect(() => {
    api
      .get<{ month: string; totalExpenses: number }>("/transactions/summary/monthly")
      .then((res) => setMonthlyExpenses(res.totalExpenses))
      .catch(() => setMonthlyExpenses(0));
  }, [transactions.length]);

  const totalIncome = transactions
    .filter((transaction) => transaction.transactiontype === "income")
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.transactiontype === "expense")
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  const currentBalance = totalIncome + totalExpenses;
  const totalSaved = pots.reduce((acc: number, item: Pot) => acc + item.amount, 0);

  const details: OverviewDetails[] = [
    {
      title: "Current Balance",
      amount: format(currentBalance),
      background: colors.greyDark,
      color: colors.white,
    },
    {
      title: "Income",
      amount: format(totalIncome),
      background: colors.green,
      color: colors.white,
    },
    {
      title: "Expenses",
      amount: format(Math.abs(totalExpenses)),
      background: colors.red,
      color: colors.white,
    },
  ];

  return (
    <Container>
      <Header className="text-2xl font-bold">
        <Headline title="Overview" />
        <div className="flex items-center gap-4">
          <CurrencySelector />
          <Button
            children={
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <img src="/images/logout.png" alt="Logout" />
                Logout
              </div>
            }
            background={colors.greyDark}
            backgroundhover={colors.greyMedium}
            color={colors.white}
            weight="700"
            border="transparent"
            size={typography.textPreset4Bold.size}
            width="auto"
            onClick={() => logout()}
          />
        </div>
      </Header>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-4 mt-6 md:flex-row">
          {details.map((detail, index) => (
            <div
              key={index}
              className="rounded-lg min-w-[350px] p-4 leading-normal md:w-full md:min-w-[240px] md:mx-auto"
              style={{
                backgroundColor: detail.background,
                color: detail.color,
              }}
            >
              <p className="text-[0.8rem]">{detail.title}</p>
              <h2>{detail.amount}</h2>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-white p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.1)]">
          <p className="text-[0.8rem] text-greyNormal">
            Expenses this month ({currency})
          </p>
          <h2 className="font-bold text-greyDark">{format(monthlyExpenses)}</h2>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:auto-rows-auto lg:gap-8">
          <section className="column-1">
            <div className="bg-white my-6 rounded-lg p-4 lg:pots lg:min-w-[500px] lg:h-[300px]">
              <div className="flex justify-between my-4">
                <h2 className="font-extrabold">Pots</h2>
                <Link
                  to="/finance/pots"
                  className="no-underline text-greyDark flex items-center gap-2 [&_img]:w-2.5 [&_img]:h-2.5"
                >
                  See Details <ArrowRightIcon />
                </Link>
              </div>

              <div className="bg-white my-6 rounded-lg p-4 md:flex md:items-center md:gap-4">
                <div className="bg-greyLight rounded-lg p-4 flex items-center gap-6 mb-4 md:w-[250px] md:h-[100px] lg:w-[250px] lg:h-[100px] [&_img]:w-[35px] [&_img]:h-[35px]">
                  <img src="/images/icon-pot.svg" alt="Icon Pot Saved" />
                  <div>
                    <p className="text-[0.8rem] text-greyDark">Total Saved</p>
                    <h2 className="saved-amount md:text-3xl md:mt-2 lg:text-3xl lg:mt-2">
                      {format(totalSaved)}
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-[repeat(2,200px)] lg:grid-cols-2 lg:gap-4 potsLegend">
                  {pots.slice(0, 4).map((item: Pot) => (
                    <div
                      key={item.id}
                      className="border-l-[5px] my-2 [&_div]:ml-4"
                      style={{
                        borderLeftColor: item.theme || colors.greyLight,
                      }}
                    >
                      <div>
                        <p className="text-[0.8rem] text-greyDark">
                          {item.potName}
                        </p>
                        <strong>{format(item.amount)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white my-6 rounded-lg p-4 lg:transactions lg:h-[550px]">
              <div className="flex justify-between my-4">
                <h2 className="font-extrabold">Transactions</h2>
                <Link
                  to="/finance/transactions"
                  className="no-underline text-greyDark flex items-center gap-2 [&_img]:w-2.5 [&_img]:h-2.5"
                >
                  See Details <ArrowRightIcon />
                </Link>
              </div>

              <div className="mx-4">
                <ListElements items={transactions.slice(0, 8)} repeat="3" />
              </div>
            </div>
          </section>
          <section className="column-2">
            <div className="bg-white my-6 rounded-lg p-4 lg:budgets lg:min-w-[450px] lg:h-[400px] [&_strong]:ml-4">
              <div className="flex justify-between my-4">
                <h2 className="font-extrabold">Budgets</h2>
                <Link
                  to="/finance/budgets"
                  className="no-underline text-greyDark flex items-center gap-2 [&_img]:w-2.5 [&_img]:h-2.5"
                >
                  See Details <ArrowRightIcon />
                </Link>
              </div>
              <div className="bg-white my-6 rounded-lg p-4 md:flex md:items-center md:gap-4 lg:budgetChart lg:gap-0">
                <Chart items={budgets} transactions={transactions} />
                <LegendContent
                  align="center"
                  title={false}
                  budgets={budgets.slice(0, 4)}
                  transactions={transactions}
                />
              </div>
            </div>
            <div className="bg-white my-6 rounded-lg p-4 lg:bills lg:h-[450px]">
              <div className="flex justify-between my-4">
                <h2 className="font-extrabold">Recurring Bills</h2>
                <Link
                  to="/finance/bills"
                  className="no-underline text-greyDark flex items-center gap-2 [&_img]:w-2.5 [&_img]:h-2.5"
                >
                  See Details <ArrowRightIcon />
                </Link>
              </div>
              <Summary transactions={transactions} />
            </div>
          </section>
        </div>
      </motion.div>
    </Container>
  );
};
