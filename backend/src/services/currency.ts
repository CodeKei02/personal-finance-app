import axios from "axios";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { env } from "../lib/env";

const BASE = "USD";
const SUPPORTED = ["USD", "VES", "EUR"];

interface RatesResponse {
  rates: Record<string, number>;
}

function isFresh(fetchedAt: Date): boolean {
  const ageMinutes = (Date.now() - fetchedAt.getTime()) / 60000;
  return ageMinutes < env.fxCacheTtlMinutes;
}

async function readCache(): Promise<{ rates: Record<string, number>; fetchedAt: Date } | null> {
  const cached = await prisma.exchangeRate.findMany({ where: { base: BASE } });
  if (cached.length === 0) return null;

  const rates: Record<string, number> = {};
  let oldest = new Date();
  for (const row of cached) {
    rates[row.currency] = Number(row.rate.toString());
    if (row.fetchedAt < oldest) oldest = row.fetchedAt;
  }
  return { rates, fetchedAt: oldest };
}

async function writeCache(rates: Record<string, number>): Promise<void> {
  const now = new Date();
  await prisma.$transaction(
    SUPPORTED.filter((c) => rates[c] !== undefined).map((currency) =>
      prisma.exchangeRate.upsert({
        where: { base_currency: { base: BASE, currency } },
        update: { rate: new Prisma.Decimal(rates[currency]), fetchedAt: now },
        create: {
          base: BASE,
          currency,
          rate: new Prisma.Decimal(rates[currency]),
          fetchedAt: now,
        },
      })
    )
  );
}

/**
 * Returns the conversion rates relative to USD for the supported currencies.
 * Uses the ExchangeRate cache table with a TTL; only hits the external API
 * when the cache is missing or stale.
 */
export async function getRates(): Promise<{
  base: string;
  rates: Record<string, number>;
  fetchedAt: string;
  cached: boolean;
}> {
  const cache = await readCache();
  if (cache && isFresh(cache.fetchedAt)) {
    return { base: BASE, rates: cache.rates, fetchedAt: cache.fetchedAt.toISOString(), cached: true };
  }

  try {
    const { data } = await axios.get<RatesResponse>(env.fxApiUrl, { timeout: 8000 });
    const fresh: Record<string, number> = { USD: 1 };
    for (const currency of SUPPORTED) {
      if (data.rates && typeof data.rates[currency] === "number") {
        fresh[currency] = data.rates[currency];
      }
    }
    await writeCache(fresh);
    return { base: BASE, rates: fresh, fetchedAt: new Date().toISOString(), cached: false };
  } catch (error) {
    if (cache) {
      // External provider failed: serve stale cache rather than erroring out.
      return { base: BASE, rates: cache.rates, fetchedAt: cache.fetchedAt.toISOString(), cached: true };
    }
    throw error;
  }
}
