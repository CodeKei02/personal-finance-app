import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FinanceApp } from "./FinanceApp.tsx";
import "@/styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FinanceApp />
    </BrowserRouter>
  </StrictMode>
);
