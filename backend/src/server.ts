import { createApp } from "./app";
import { env } from "./lib/env";
import { prisma } from "./lib/prisma";
import { scheduleRecurringBills } from "./jobs/recurringBills";

async function main() {
  const app = createApp();

  scheduleRecurringBills();

  const server = app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });

  const shutdown = async () => {
    console.log("Shutting down...");
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
