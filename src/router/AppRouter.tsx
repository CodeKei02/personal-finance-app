import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { FinanceMainApp } from "../financeApp/routes/FinanceMainApp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { CheckingAuth } from "../ui/CheckingAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { login, logout } from "../store/auth";

export const AppRouter = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && location.pathname.startsWith("/auth")) {
      navigate("/finance", { replace: true });
    }
  }, [status, location, navigate]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });

    return () => {};
  }, []);

  if (status === "checking") return <CheckingAuth />;
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/finance/*" element={<FinanceMainApp />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
