import "server-only";
import { and, eq, gt, lt } from "drizzle-orm";
import { cookies } from "next/headers";
import { getDb } from "@/src/db";
import { grantSessions, grantUsers } from "@/src/db/schema";
import type { IdentityContext } from "@/src/types/govfund";

const COOKIE_NAME = "grant_plus_session";
const SESSION_SECONDS = 60 * 60 * 24 * 30;

export class SessionError extends Error {
  constructor(
    public code:
      "REMEMBERED_LOGIN_REQUIRED" | "EMAIL_MISMATCH" | "PROFILE_EXISTS",
  ) {
    super(code);
  }
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function registerRememberedUser(identity: IdentityContext) {
  const db = getDb();
  const email = normalizeEmail(
    identity.registrantEmail || identity.researcherEmail,
  );
  const now = new Date();
  const normalizedIdentity = {
    ...identity,
    registrantEmail: normalizeEmail(identity.registrantEmail),
    researcherEmail: normalizeEmail(identity.researcherEmail),
  };

  const [existing] = await db
    .select({ id: grantUsers.id })
    .from(grantUsers)
    .where(eq(grantUsers.email, email))
    .limit(1);
  if (existing) {
    const remembered = await getRememberedUser();
    if (!remembered || remembered.id !== existing.id) {
      throw new SessionError("PROFILE_EXISTS");
    }
  }

  const [user] = await db
    .insert(grantUsers)
    .values({
      email,
      ...normalizedIdentity,
    })
    .onConflictDoUpdate({
      target: grantUsers.email,
      set: {
        ...normalizedIdentity,
        updatedAt: now,
      },
    })
    .returning();

  await createRememberedSession(user.id);
  return toIdentity(user);
}

export async function loginWithRememberedEmail(emailInput: string) {
  const remembered = await getRememberedUser();
  if (!remembered) throw new SessionError("REMEMBERED_LOGIN_REQUIRED");
  if (normalizeEmail(emailInput) !== remembered.email) {
    throw new SessionError("EMAIL_MISMATCH");
  }
  return toIdentity(remembered);
}

export async function getRememberedEmail() {
  const user = await getRememberedUser();
  return user?.email ?? null;
}

export async function requireRememberedUser() {
  const user = await getRememberedUser();
  if (!user) throw new SessionError("REMEMBERED_LOGIN_REQUIRED");
  return user;
}

export async function forgetRememberedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    const tokenHash = await hashToken(token);
    await getDb()
      .delete(grantSessions)
      .where(eq(grantSessions.tokenHash, tokenHash));
  }
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

async function getRememberedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const tokenHash = await hashToken(token);
  const now = new Date();
  const [result] = await getDb()
    .select({ user: grantUsers })
    .from(grantSessions)
    .innerJoin(grantUsers, eq(grantSessions.userId, grantUsers.id))
    .where(
      and(
        eq(grantSessions.tokenHash, tokenHash),
        gt(grantSessions.expiresAt, now),
      ),
    )
    .limit(1);
  return result?.user ?? null;
}

async function createRememberedSession(userId: string) {
  const db = getDb();
  const token = randomToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000);

  await db
    .delete(grantSessions)
    .where(
      and(
        eq(grantSessions.userId, userId),
        lt(grantSessions.expiresAt, new Date()),
      ),
    );
  await db.insert(grantSessions).values({ tokenHash, userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
    priority: "high",
  });
}

function toIdentity(user: typeof grantUsers.$inferSelect): IdentityContext {
  return {
    role: user.role,
    registrantName: user.registrantName,
    registrantEmail: user.registrantEmail,
    researcherName: user.researcherName,
    researcherEmail: user.researcherEmail,
    institution: user.institution,
  };
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

async function hashToken(token: string) {
  const data = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}
