import { Router } from "express";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { serializeAmounts, toNumber } from "../utils/serialize";

export const transactionsRouter = Router();

transactionsRouter.use(requireAuth);

const AMOUNT_FIELDS = ["amount"] as const;

function orderByFromSort(sortBy: string): Prisma.TransactionOrderByWithRelationInput {
  switch (sortBy) {
    case "Oldest":
      return { date: "asc" };
    case "A to Z":
      return { name: "asc" };
    case "Z to A":
      return { name: "desc" };
    case "Highest":
      return { amount: "desc" };
    case "Lowest":
      return { amount: "asc" };
    case "Latest":
    default:
      return { date: "desc" };
  }
}

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  category: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
});

transactionsRouter.get("/", async (req, res) => {
  const { page, limit, category, search, sortBy } = listQuerySchema.parse(req.query);

  const where: Prisma.TransactionWhereInput = { userId: req.userId! };
  if (category && category !== "All Transactions") {
    where.category = category;
  }
  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const [total, data] = await Promise.all([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      orderBy: orderByFromSort(sortBy ?? "Latest"),
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return res.json({
    data: data.map((t) => serializeAmounts(t, [...AMOUNT_FIELDS])),
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  });
});

const transactionBodySchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  amount: z.coerce.number(),
  date: z.coerce.date(),
  recurring: z.boolean().default(false),
  transactiontype: z.enum(["income", "expense"]),
});

transactionsRouter.post("/", async (req, res) => {
  const body = transactionBodySchema.parse(req.body);
  const created = await prisma.transaction.create({
    data: {
      userId: req.userId!,
      name: body.name,
      category: body.category,
      amount: new Prisma.Decimal(body.amount),
      date: body.date,
      recurring: body.recurring,
      transactionType: body.transactiontype,
    },
  });
  return res.status(201).json(serializeAmounts(created, [...AMOUNT_FIELDS]));
});

transactionsRouter.put("/:id", async (req, res) => {
  const body = transactionBodySchema.partial().parse(req.body);
  const existing = await prisma.transaction.findFirst({
    where: { id: req.params.id, userId: req.userId! },
  });
  if (!existing) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const updated = await prisma.transaction.update({
    where: { id: existing.id },
    data: {
      name: body.name,
      category: body.category,
      amount: body.amount !== undefined ? new Prisma.Decimal(body.amount) : undefined,
      date: body.date,
      recurring: body.recurring,
      transactionType: body.transactiontype,
    },
  });
  return res.json(serializeAmounts(updated, [...AMOUNT_FIELDS]));
});

transactionsRouter.delete("/:id", async (req, res) => {
  const existing = await prisma.transaction.findFirst({
    where: { id: req.params.id, userId: req.userId! },
  });
  if (!existing) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  await prisma.transaction.delete({ where: { id: existing.id } });
  return res.status(204).send();
});

transactionsRouter.get("/summary/monthly", async (req, res) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const result = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: {
      userId: req.userId!,
      transactionType: "expense",
      date: { gte: start, lt: end },
    },
  });

  return res.json({
    month: start.toISOString().slice(0, 7),
    totalExpenses: Math.abs(toNumber(result._sum.amount)),
  });
});

transactionsRouter.get("/summary/by-category", async (req, res) => {
  const grouped = await prisma.transaction.groupBy({
    by: ["category"],
    _sum: { amount: true },
    where: { userId: req.userId! },
  });

  return res.json(
    grouped.map((row) => ({
      category: row.category,
      total: toNumber(row._sum.amount),
    }))
  );
});
