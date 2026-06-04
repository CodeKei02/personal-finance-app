import { Routes, Route, Navigate } from "react-router";
import { OverviewPage } from "@/features/overview/OverviewPage";
import { TransactionsPage } from "@/features/transactions/TransactionsPage";
import { BudgetsPage } from "@/features/budgets/BudgetsPage";
import { BillsPage } from "@/features/bills/BillsPage";
import { PotsPage } from "@/features/pots/PotsPage";

export const FinanceAppRoutes = () => {
  return (
    <Routes>
      <Route path="/overview" element={<OverviewPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/budgets" element={<BudgetsPage />} />
      <Route path="/pots" element={<PotsPage />} />
      <Route path="/bills" element={<BillsPage />} />
      <Route
        path="/finance"
        element={<Navigate to="/finance/overview" replace />}
      />
      <Route path="/*" element={<OverviewPage />} />
    </Routes>
  );
};
