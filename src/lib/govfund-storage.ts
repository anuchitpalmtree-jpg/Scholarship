import type { ApplicationFormData, SavedApplication } from "@/src/types/govfund";

const DRAFT_KEY = "grant-plus:data-entry-draft:v1";
const APPLICATIONS_KEY = "grant-plus:data-entry-applications:v1";
const REVIEW_STAGE_KEY = "grant-plus:simulated-review-stage:v1";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function loadApplicationDraft(): ApplicationFormData | null {
  if (!canUseStorage()) return null;

  try {
    const value = window.localStorage.getItem(DRAFT_KEY);
    return value ? (JSON.parse(value) as ApplicationFormData) : null;
  } catch {
    return null;
  }
}

export function saveApplicationDraft(form: ApplicationFormData) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
}

export function loadSavedApplications(): SavedApplication[] {
  if (!canUseStorage()) return [];

  try {
    const value = window.localStorage.getItem(APPLICATIONS_KEY);
    return value ? (JSON.parse(value) as SavedApplication[]) : [];
  } catch {
    return [];
  }
}

export function saveSubmittedApplication(application: SavedApplication) {
  const current = loadSavedApplications();
  const withoutDuplicate = current.filter((item) => item.id !== application.id);
  const next = [application, ...withoutDuplicate];
  if (canUseStorage()) {
    window.localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
  }
  return next;
}

export function loadReviewStage() {
  if (!canUseStorage()) return 1;
  const value = Number(window.localStorage.getItem(REVIEW_STAGE_KEY));
  return Number.isFinite(value) && value >= 1 ? value : 1;
}

export function saveReviewStage(stage: number) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(REVIEW_STAGE_KEY, String(stage));
}
