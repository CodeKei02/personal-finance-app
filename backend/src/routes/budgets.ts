import { Router } from "express";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { serializeAmounts } from "../utils/serialize";

export const budgetsRouter = Router();

budgetsRouter.use(requireAuth);

const bodySchema = z.object({
  category: z.string().min(1),
  maximum: z.coerce.number(),
  theme: z.string().min(1),
});

budgetsRouter.get("/", async (req, res) => {
  const items = await prisma.budget.findMany({ where: { userId: req.userId! } });
  return res.json(items.map((b) => serializeAmounts(b, ["maximum"])));
});

budgetsRouter.post("/", async (req, res) => {
  const body = bodySchema.parse(req.body);
  const created = await prisma.budget.create({
    data: {
      userId: req.userId!,
      category: body.category,
      maximum: new Prisma.Decimal(body.maximum),
      theme: body.theme,
    },
  });
  return res.status(201).json(serializeAmounts(created, ["maximum"]));
});

budgetsRouter.put("/:id", async (req, res) => {
  const body = bodySchema.partial().parse(req.body);
  const existing = await prisma.budget.findFirst({
    where: { id: req.params.id, userId: req.userId! },
  });
  if (!existing) {
    return res.status(404).json({ message: "Budget not found" });
  }
  const updated = await prisma.budget.update({
    where: { id: existing.id },
    data: {
      category: body.category,
      maximum: body.maximum !== undefined ? new Prisma.Decimal(body.maximum) : undefined,
      theme: body.theme,
    },
  });
  return res.json(serializeAmounts(updated, ["maximum"]));
});

budgetsRouter.delete("/:id", async (req, res) => {
  const existing = await prisma.budget.findFirst({
    where: { id: req.params.id, userId: req.userId! },
  });
  if (!existing) {
    return res.status(404).json({ message: "Budget not found" });
  }
  await prisma.budget.delete({ where: { id: existing.id } });
  return res.status(204).send();
});
