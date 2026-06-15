import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

export const usersRouter = Router();

usersRouter.use(requireAuth);

const currencySchema = z.object({
  preferredCurrency: z.enum(["VES", "USD", "EUR"]),
});

usersRouter.patch("/me/currency", async (req, res) => {
  const { preferredCurrency } = currencySchema.parse(req.body);
  const user = await prisma.user.update({
    where: { id: req.userId! },
    data: { preferredCurrency },
  });
  return res.json({ preferredCurrency: user.preferredCurrency });
});
