import { useEffect } from "react";
import { Dashboard } from "@/features/shared/components/navigation/Dashboard";
import { FinanceAppRoutes } from "./FinanceAppRoutes";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useBudgetStore } from "@/store/useBudgetStore";
import { usePotStore } from "@/store/usePotStore";

export const FinanceMainApp = () => {
  const fetchAll = useTransactionStore((state) => state.fetchAll);
  const fetchBudgets = useBudgetStore((state) => state.fetchBudgets);
  const fetchPots = usePotStore((state) => state.fetchPots);

  useEffect(() => {
    void fetchAll();
    void fetchBudgets();
    void fetchPots();
  }, [fetchAll, fetchBudgets, fetchPots]);

  return (
    <>
      <Dashboard />
      <FinanceAppRoutes />
    </>
  );
};
