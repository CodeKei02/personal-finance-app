import { Router } from "express";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { serializeAmounts } from "../utils/serialize";

export const potsRouter = Router();

potsRouter.use(requireAuth);

const bodySchema = z.object({
  potName: z.string().min(1),
  amount: z.coerce.number(),
  target: z.coerce.number(),
  theme: z.string().min(1),
});

potsRouter.get("/", async (req, res) => {
  const items = await prisma.pot.findMany({ where: { userId: req.userId! } });
  return res.json(items.map((p) => serializeAmounts(p, ["amount", "target"])));
});

potsRouter.post("/", async (req, res) => {
  const body = bodySchema.parse(req.body);
  const created = await prisma.pot.create({
    data: {
      userId: req.userId!,
      potName: body.potName,
      amount: new Prisma.Decimal(body.amount),
      target: new Prisma.Decimal(body.target),
      theme: body.theme,
    },
  });
  return res.status(201).json(serializeAmounts(created, ["amount", "target"]));
});

potsRouter.put("/:id", async (req, res) => {
  const body = bodySchema.partial().parse(req.body);
  const existing = await prisma.pot.findFirst({
    where: { id: req.params.id, userId: req.userId! },
  });
  if (!existing) {
    return res.status(404).json({ message: "Pot not found" });
  }
  const updated = await prisma.pot.update({
    where: { id: existing.id },
    data: {
      potName: body.potName,
      amount: body.amount !== undefined ? new Prisma.Decimal(body.amount) : undefined,
      target: body.target !== undefined ? new Prisma.Decimal(body.target) : undefined,
      theme: body.theme,
    },
  });
  return res.json(serializeAmounts(updated, ["amount", "target"]));
});

potsRouter.delete("/:id", async (req, res) => {
  const existing = await prisma.pot.findFirst({
    where: { id: req.params.id, userId: req.userId! },
  });
  if (!existing) {
    return res.status(404).json({ message: "Pot not found" });
  }
  await prisma.pot.delete({ where: { id: existing.id } });
  return res.status(204).send();
});
