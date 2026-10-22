import { NextResponse } from "next/server";
import {
  loadApplicationWorkspace,
  saveApplication,
  updateApplicationReviewStage,
} from "@/src/lib/grant-applications";
import { requireRememberedUser, SessionError } from "@/src/lib/grant-session";
import type { SavedApplication } from "@/src/types/govfund";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireRememberedUser();
    return NextResponse.json(await loadApplicationWorkspace(user.id));
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireRememberedUser();
    const body = (await request.json()) as { application?: SavedApplication };
    if (!isApplication(body.application)) {
      return NextResponse.json(
        { error: "INVALID_APPLICATION", message: "ข้อมูลใบสมัครไม่ครบถ้วน" },
        { status: 400 },
      );
    }
    const application = await saveApplication(user.id, body.application);
    return NextResponse.json({ application });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await requireRememberedUser();
    const body = (await request.json()) as {
      applicationId?: string;
      reviewStage?: number;
    };
    if (
      !body.applicationId ||
      typeof body.reviewStage !== "number" ||
      !Number.isFinite(body.reviewStage)
    ) {
      return NextResponse.json(
        { error: "INVALID_STAGE", message: "ขั้นตอนการพิจารณาไม่ถูกต้อง" },
        { status: 400 },
      );
    }
    await updateApplicationReviewStage(
      user.id,
      body.applicationId,
      body.reviewStage as number,
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleError(error);
  }
}

function isApplication(
  value: SavedApplication | undefined,
): value is SavedApplication {
  if (!value || !value.id || value.id.length > 100 || !value.form) return false;
  if (!value.fundName || value.fundName.length > 500) return false;
  if (
    ![
      value.form.researcher,
      value.form.registrant,
      value.form.registration,
      value.form.address,
      value.form.projectTitle,
      value.form.budget,
      value.form.summary,
      value.form.attachmentName,
    ].every((field) => typeof field === "string")
  ) {
    return false;
  }
  if (
    value.reviewStage !== undefined &&
    (typeof value.reviewStage !== "number" ||
      !Number.isFinite(value.reviewStage))
  ) {
    return false;
  }
  const savedAt = new Date(value.savedAt);
  const submittedAt = value.submittedAt ? new Date(value.submittedAt) : null;
  return (
    !Number.isNaN(savedAt.getTime()) &&
    (!submittedAt || !Number.isNaN(submittedAt.getTime()))
  );
}

function handleError(error: unknown) {
  if (error instanceof SessionError) {
    return NextResponse.json(
      { error: error.code, message: "กรุณาเข้าใช้งานอีกครั้ง" },
      { status: 401 },
    );
  }
  console.error("Grant+ application database request failed", error);
  return NextResponse.json(
    {
      error: "DATABASE_UNAVAILABLE",
      message: "ไม่สามารถบันทึกหรืออ่านข้อมูลจากฐานข้อมูลได้",
    },
    { status: 503 },
  );
}
