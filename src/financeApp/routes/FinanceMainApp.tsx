import { Dashboard } from "../components/navigation/Dashboard";
import { FinanceAppRoutes } from "./FinanceAppRoutes";

export const FinanceMainApp = () => {
  return (
    <>
      <Dashboard />
      <FinanceAppRoutes />
    </>
  );
};
