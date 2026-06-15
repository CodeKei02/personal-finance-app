import { Router } from "express";
import { getRates } from "../services/currency";

export const currencyRouter = Router();

currencyRouter.get("/rates", async (_req, res) => {
  const rates = await getRates();
  return res.json(rates);
});
