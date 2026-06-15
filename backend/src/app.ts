import express from "express";
import cors from "cors";
import { env } from "./lib/env";
import { authRouter } from "./routes/auth";
import { transactionsRouter } from "./routes/transactions";
import { budgetsRouter } from "./routes/budgets";
import { potsRouter } from "./routes/pots";
import { recurringBillsRouter } from "./routes/recurringBills";
import { currencyRouter } from "./routes/currency";
import { usersRouter } from "./routes/users";
import { errorHandler, notFound } from "./middleware/errorHandler";

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/transactions", transactionsRouter);
  app.use("/api/budgets", budgetsRouter);
  app.use("/api/pots", potsRouter);
  app.use("/api/recurring-bills", recurringBillsRouter);
  app.use("/api/currency", currencyRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
