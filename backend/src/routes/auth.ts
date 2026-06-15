import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { signToken } from "../utils/jwt";
import { requireAuth } from "../middleware/auth";

export const authRouter = Router();

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(1).optional(),
});

function publicUser(user: {
  id: string;
  email: string;
  displayName: string | null;
  isGuest: boolean;
  preferredCurrency: string;
}) {
  return {
    uid: user.id,
    email: user.email,
    displayName: user.displayName,
    isGuest: user.isGuest,
    preferredCurrency: user.preferredCurrency,
  };
}

authRouter.post("/register", async (req, res) => {
  const { email, password, displayName } = credentialsSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, displayName: displayName ?? email.split("@")[0] },
  });

  const token = signToken({ userId: user.id });
  return res.status(201).json({ token, user: publicUser(user) });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = credentialsSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ userId: user.id });
  return res.json({ token, user: publicUser(user) });
});

authRouter.post("/guest", async (_req, res) => {
  const suffix = Math.random().toString(36).slice(2, 10);
  const user = await prisma.user.create({
    data: {
      email: `guest_${suffix}@guest.local`,
      isGuest: true,
      displayName: "Guest",
    },
  });

  const token = signToken({ userId: user.id });
  return res.status(201).json({ token, user: publicUser(user) });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({ user: publicUser(user) });
});
