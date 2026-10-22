import { NextResponse } from "next/server";
import {
  forgetRememberedUser,
  getRememberedEmail,
  loginWithRememberedEmail,
  normalizeEmail,
  registerRememberedUser,
  SessionError,
} from "@/src/lib/grant-session";
import type { IdentityContext } from "@/src/types/govfund";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ rememberedEmail: await getRememberedEmail() });
  } catch {
    return NextResponse.json({ rememberedEmail: null });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      action?: "register" | "login";
      email?: string;
      identity?: IdentityContext;
    };

    if (body.action === "login") {
      if (!isEmail(body.email)) return invalid("กรุณากรอกอีเมลที่ถูกต้อง");
      return NextResponse.json({
        identity: await loginWithRememberedEmail(body.email),
      });
    }

    if (body.action === "register") {
      if (!isIdentity(body.identity))
        return invalid("กรุณากรอกข้อมูลผู้ใช้งานให้ครบถ้วน");
      return NextResponse.json({
        identity: await registerRememberedUser(body.identity),
      });
    }

    return invalid("คำขอเข้าสู่ระบบไม่ถูกต้อง");
  } catch (error) {
    if (error instanceof SessionError) {
      const message =
        error.code === "EMAIL_MISMATCH"
          ? "อีเมลไม่ตรงกับอุปกรณ์ที่จดจำไว้ กรุณาใช้อีเมลเดิม"
          : error.code === "PROFILE_EXISTS"
            ? "อีเมลนี้มีโปรไฟล์อยู่แล้ว กรุณากลับไปใช้อุปกรณ์ที่จดจำไว้หรือติดต่อผู้ดูแล"
            : "ไม่พบ cookie ที่จดจำการเข้าใช้งาน กรุณากรอกข้อมูลครั้งแรกให้ครบ";
      return NextResponse.json({ error: error.code, message }, { status: 401 });
    }
    console.error("Grant+ session request failed", error);
    return NextResponse.json(
      {
        error: "SESSION_UNAVAILABLE",
        message: "ระบบจดจำผู้ใช้ยังไม่พร้อม กรุณาลองใหม่",
      },
      { status: 503 },
    );
  }
}

export async function DELETE() {
  try {
    await forgetRememberedUser();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Grant+ forget-device request failed", error);
    return NextResponse.json(
      { error: "SESSION_UNAVAILABLE", message: "ไม่สามารถลบการจดจำอุปกรณ์ได้" },
      { status: 503 },
    );
  }
}

function isIdentity(
  value: IdentityContext | undefined,
): value is IdentityContext {
  if (!value || (value.role !== "researcher" && value.role !== "coordinator"))
    return false;
  return (
    [
      value.registrantName,
      value.registrantEmail,
      value.researcherName,
      value.researcherEmail,
      value.institution,
    ].every(
      (item) =>
        typeof item === "string" &&
        item.trim().length > 0 &&
        item.length <= 500,
    ) &&
    isEmail(value.registrantEmail) &&
    isEmail(value.researcherEmail)
  );
}

function isEmail(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 320) return false;
  const normalized = normalizeEmail(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

function invalid(message: string) {
  return NextResponse.json(
    { error: "INVALID_INPUT", message },
    { status: 400 },
  );
}
