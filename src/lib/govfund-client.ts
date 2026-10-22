import type {
  ApplicationWorkspace,
  IdentityContext,
  RememberedSession,
  SavedApplication,
} from "@/src/types/govfund";

export class GrantApiError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export async function getRememberedSession(): Promise<RememberedSession> {
  return requestJson<RememberedSession>("/api/session");
}

export async function registerProfile(identity: IdentityContext) {
  return requestJson<{ identity: IdentityContext }>("/api/session", {
    method: "POST",
    body: JSON.stringify({ action: "register", identity }),
  });
}

export async function loginWithEmail(email: string) {
  return requestJson<{ identity: IdentityContext }>("/api/session", {
    method: "POST",
    body: JSON.stringify({ action: "login", email }),
  });
}

export async function forgetDevice() {
  return requestJson<{ ok: true }>("/api/session", { method: "DELETE" });
}

export async function loadDatabaseWorkspace() {
  return requestJson<ApplicationWorkspace>("/api/applications");
}

export async function saveDatabaseApplication(application: SavedApplication) {
  return requestJson<{ application: SavedApplication }>("/api/applications", {
    method: "PUT",
    body: JSON.stringify({ application }),
  });
}

export async function saveDatabaseReviewStage(
  applicationId: string,
  reviewStage: number,
) {
  return requestJson<{ ok: true }>("/api/applications", {
    method: "PATCH",
    body: JSON.stringify({ applicationId, reviewStage }),
  });
}

async function requestJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    credentials: "same-origin",
    headers: { "content-type": "application/json", ...init?.headers },
  });
  const payload = (await response.json().catch(() => ({}))) as {
    error?: string;
    message?: string;
  };
  if (!response.ok) {
    throw new GrantApiError(
      payload.error ?? "REQUEST_FAILED",
      payload.message ?? "ไม่สามารถเชื่อมต่อฐานข้อมูลได้",
    );
  }
  return payload as T;
}
