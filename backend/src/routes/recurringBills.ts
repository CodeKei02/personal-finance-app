import { Router } from "express";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { serializeAmounts } from "../utils/serialize";

export const recurringBillsRouter = Router();

recurringBillsRouter.use(requireAuth);

const bodySchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  amount: z.coerce.number(),
  dueDay: z.coerce.number().int().min(1).max(31),
  status: z.enum(["PAID", "PENDING", "UPCOMING"]).optional(),
  theme: z.string().optional(),
});

recurringBillsRouter.get("/", async (req, res) => {
  const items = await prisma.recurringBill.findMany({
    where: { userId: req.userId! },
    orderBy: { dueDay: "asc" },
  });
  return res.json(items.map((b) => serializeAmounts(b, ["amount"])));
});

recurringBillsRouter.post("/", async (req, res) => {
  const body = bodySchema.parse(req.body);
  const created = await prisma.recurringBill.create({
    data: {
      userId: req.userId!,
      name: body.name,
      category: body.category,
      amount: new Prisma.Decimal(body.amount),
      dueDay: body.dueDay,
      status: body.status ?? "UPCOMING",
      theme: body.theme ?? "#277C78",
    },
  });
  return res.status(201).json(serializeAmounts(created, ["amount"]));
});

recurringBillsRouter.put("/:id", async (req, res) => {
  const body = bodySchema.partial().parse(req.body);
  const existing = await prisma.recurringBill.findFirst({
    where: { id: req.params.id, userId: req.userId! },
  });
  if (!existing) {
    return res.status(404).json({ message: "Recurring bill not found" });
  }
  const updated = await prisma.recurringBill.update({
    where: { id: existing.id },
    data: {
      name: body.name,
      category: body.category,
      amount: body.amount !== undefined ? new Prisma.Decimal(body.amount) : undefined,
      dueDay: body.dueDay,
      status: body.status,
      theme: body.theme,
    },
  });
  return res.json(serializeAmounts(updated, ["amount"]));
});

recurringBillsRouter.delete("/:id", async (req, res) => {
  const existing = await prisma.recurringBill.findFirst({
    where: { id: req.params.id, userId: req.userId! },
  });
  if (!existing) {
    return res.status(404).json({ message: "Recurring bill not found" });
  }
  await prisma.recurringBill.delete({ where: { id: existing.id } });
  return res.status(204).send();
});
