import { Prisma } from "@prisma/client";

type WithDecimals = Record<string, unknown>;

export function toNumber(value: Prisma.Decimal | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  return typeof value === "number" ? value : Number(value.toString());
}

export function serializeAmounts<T extends WithDecimals>(record: T, fields: (keyof T)[]): T {
  const clone: WithDecimals = { ...record };
  for (const field of fields) {
    clone[field as string] = toNumber(record[field] as Prisma.Decimal);
  }
  return clone as T;
}
