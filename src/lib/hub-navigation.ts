import type { Screen } from "@/src/types/govfund";
import type { WorkspaceHub } from "@/src/types/strategy";

export const hubs: { id: WorkspaceHub; path: string; title: string; detail: string; start: Screen; screens: Screen[] }[] = [
  { id: "private", path: "/private-sector", title: "Private Sector Hub", detail: "ประกาศโจทย์ ค้นทีมวิจัย และค้นเทคโนโลยี", start: "corporate", screens: ["corporate", "marketplace", "governance"] },
  { id: "researcher", path: "/researcher", title: "Researcher Hub", detail: "ค้นทุน เตรียมข้อเสนอ และร่วมแก้โจทย์เอกชน", start: "dashboard", screens: ["dashboard", "readiness", "search", "apply", "tracking", "corporate", "semantic", "governance"] },
  { id: "collaboration", path: "/collaboration", title: "Collaboration", detail: "ห้องโครงการ เงื่อนไข IP งวดงาน และผลกระทบ", start: "collaboration", screens: ["collaboration", "impact", "governance"] },
];
export function hubConfig(id: WorkspaceHub) { return hubs.find((hub) => hub.id === id) ?? hubs[1]; }

export function canEnterHub(activeHub: WorkspaceHub | null, requestedHub: WorkspaceHub) {
  return activeHub === null || activeHub === requestedHub;
}
