import cron from "node-cron";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

function currentMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export async function runRecurringBillsCheck(now: Date = new Date()): Promise<number> {
  const today = now.getDate();
  const monthKey = currentMonthKey(now);

  const dueBills = await prisma.recurringBill.findMany({
    where: {
      dueDay: today,
      OR: [{ lastGeneratedMonth: null }, { lastGeneratedMonth: { not: monthKey } }],
    },
  });

  let generated = 0;
  for (const bill of dueBills) {
    await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: bill.userId,
          name: bill.name,
          category: bill.category,
          amount: new Prisma.Decimal(-Math.abs(Number(bill.amount.toString()))),
          date: now,
          recurring: true,
          transactionType: "expense",
        },
      }),
      prisma.recurringBill.update({
        where: { id: bill.id },
        data: { status: "PAID", lastGeneratedMonth: monthKey },
      }),
    ]);
    generated += 1;
  }

  if (generated > 0) {
    console.log(`[cron] Generated ${generated} recurring bill transaction(s) for ${monthKey}`);
  }
  return generated;
}

export function scheduleRecurringBills(): void {
  cron.schedule("0 0 * * *", () => {
    runRecurringBillsCheck().catch((err) => {
      console.error("[cron] recurring bills check failed", err);
    });
  });
  console.log("[cron] Recurring bills job scheduled for 00:00 daily");
}
