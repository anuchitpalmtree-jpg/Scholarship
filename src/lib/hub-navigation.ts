import type { Screen } from "@/src/types/govfund";
import type { WorkspaceHub } from "@/src/types/strategy";

export const hubs: { id: WorkspaceHub; path: string; title: string; detail: string; start: Screen; screens: Screen[] }[] = [
  { id: "funder", path: "/funder", title: "Funder Hub", detail: "ผู้ให้ทุนรัฐและเอกชน ค้นงานวิจัย ดูงบตามยุทธศาสตร์ และบริหารสัญญา", start: "funding", screens: ["funding", "research-library", "contracts", "corporate", "marketplace", "governance"] },
  { id: "researcher", path: "/researcher", title: "Researcher Hub", detail: "ค้นทุนและนักวิจัย เตรียมข้อเสนอ และร่วมแก้โจทย์ผู้ให้ทุน", start: "dashboard", screens: ["dashboard", "researchers", "readiness", "search", "apply", "tracking", "corporate", "semantic", "governance"] },
  { id: "collaboration", path: "/collaboration", title: "Collaboration", detail: "ห้องโครงการ เงื่อนไข IP งวดงาน และผลกระทบ", start: "collaboration", screens: ["collaboration", "impact", "governance"] },
];
export function hubConfig(id: WorkspaceHub) { return hubs.find((hub) => hub.id === id) ?? hubs[1]; }

export function canEnterHub(activeHub: WorkspaceHub | null, requestedHub: WorkspaceHub) {
  return activeHub === null || activeHub === requestedHub;
}
