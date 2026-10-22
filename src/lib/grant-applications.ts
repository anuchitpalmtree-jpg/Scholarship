import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/src/db";
import { grantApplications } from "@/src/db/schema";
import type {
  ApplicationFormData,
  ApplicationWorkspace,
  SavedApplication,
} from "@/src/types/govfund";

export async function loadApplicationWorkspace(
  userId: string,
): Promise<ApplicationWorkspace> {
  const rows = await getDb()
    .select()
    .from(grantApplications)
    .where(eq(grantApplications.userId, userId))
    .orderBy(desc(grantApplications.updatedAt));
  const applications = rows.map(toSavedApplication);
  const reviewStage = applications.reduce(
    (latest, item) => Math.max(latest, item.reviewStage ?? 1),
    1,
  );
  return { applications, reviewStage };
}

export async function saveApplication(
  userId: string,
  application: SavedApplication,
) {
  const db = getDb();
  const [existing] = await db
    .select({ userId: grantApplications.userId })
    .from(grantApplications)
    .where(eq(grantApplications.id, application.id))
    .limit(1);

  if (existing && existing.userId !== userId) {
    throw new Error("APPLICATION_OWNERSHIP_MISMATCH");
  }

  const values = {
    form: sanitizeForm(application.form),
    fundName: application.fundName.slice(0, 500),
    receiptCode: application.receiptCode?.slice(0, 100) ?? null,
    reviewStage: clampStage(
      application.reviewStage ?? (application.submittedAt ? 2 : 1),
    ),
    savedAt: new Date(application.savedAt),
    submittedAt: application.submittedAt
      ? new Date(application.submittedAt)
      : null,
    updatedAt: new Date(),
  };

  if (existing) {
    await db
      .update(grantApplications)
      .set(values)
      .where(
        and(
          eq(grantApplications.id, application.id),
          eq(grantApplications.userId, userId),
        ),
      );
  } else {
    await db
      .insert(grantApplications)
      .values({ id: application.id, userId, ...values });
  }

  return { ...application, form: values.form, reviewStage: values.reviewStage };
}

export async function updateApplicationReviewStage(
  userId: string,
  applicationId: string,
  reviewStage: number,
) {
  const [updated] = await getDb()
    .update(grantApplications)
    .set({
      reviewStage: clampStage(reviewStage),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(grantApplications.id, applicationId),
        eq(grantApplications.userId, userId),
      ),
    )
    .returning({ id: grantApplications.id });

  if (!updated) throw new Error("APPLICATION_NOT_FOUND");
}

function toSavedApplication(
  row: typeof grantApplications.$inferSelect,
): SavedApplication {
  return {
    id: row.id,
    form: row.form,
    fundName: row.fundName,
    savedAt: row.savedAt.toISOString(),
    submittedAt: row.submittedAt?.toISOString(),
    receiptCode: row.receiptCode ?? undefined,
    reviewStage: row.reviewStage,
  };
}

function sanitizeForm(form: ApplicationFormData): ApplicationFormData {
  return {
    researcher: form.researcher.trim().slice(0, 300),
    registrant: form.registrant.trim().slice(0, 300),
    registration: form.registration.trim().slice(0, 100),
    address: form.address.trim().slice(0, 1000),
    projectTitle: form.projectTitle.trim().slice(0, 500),
    budget: form.budget.trim().slice(0, 100),
    summary: form.summary.trim().slice(0, 10000),
    attachmentName: form.attachmentName.trim().slice(0, 500),
  };
}

function clampStage(value: number) {
  return Math.min(Math.max(Math.round(value), 1), 6);
}
