import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: "Not found" });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Validation error", issues: err.issues });
  }

  console.error(err);
  const message = err instanceof Error ? err.message : "Internal server error";
  return res.status(500).json({ message });
}
