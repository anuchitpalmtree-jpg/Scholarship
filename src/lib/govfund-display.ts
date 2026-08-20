import type { ApplicationStatusTone } from "@/src/types/govfund";

export function matchBadgeClasses(score: number): string {
  if (score >= 90) return "bg-emerald-50 text-emerald-700";
  if (score >= 70) return "bg-blue-50 text-[#1E3A8A]";
  return "bg-slate-100 text-slate-600";
}

export function statusBadgeClasses(tone: ApplicationStatusTone): string {
  if (tone === "amber") return "bg-amber-50 text-amber-800";
  if (tone === "red") return "bg-red-50 text-red-700";
  if (tone === "green") return "bg-emerald-50 text-emerald-700";
  return "bg-blue-50 text-[#1E3A8A]";
}

export function progressBarClasses(tone: ApplicationStatusTone): string {
  if (tone === "amber") return "bg-amber-400";
  if (tone === "red") return "bg-red-500";
  if (tone === "green") return "bg-emerald-500";
  return "bg-[#1E3A8A]";
}

export function statusMarker(tone: ApplicationStatusTone): string {
  if (tone === "amber") return "🟡";
  if (tone === "red") return "🔴";
  if (tone === "green") return "🟢";
  return "🔵";
}
