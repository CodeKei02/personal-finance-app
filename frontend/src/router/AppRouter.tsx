import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "@/auth/routes/AuthRoutes";
import { FinanceMainApp } from "@/features/shared/routes/FinanceMainApp";
import { useAuthStore } from "@/store/useAuthStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { CheckingAuth } from "@/ui/CheckingAuth";

export const AppRouter = () => {
  const status = useAuthStore((state) => state.status);
  const loadSession = useAuthStore((state) => state.loadSession);
  const fetchRates = useCurrencyStore((state) => state.fetchRates);

  useEffect(() => {
    void loadSession();
    void fetchRates();
  }, [loadSession, fetchRates]);

  if (status === "checking") return <CheckingAuth />;

  if (status !== "authenticated") {
    return (
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/finance/*" element={<FinanceMainApp />} />
      <Route path="*" element={<Navigate to="/finance" replace />} />
    </Routes>
  );
};
