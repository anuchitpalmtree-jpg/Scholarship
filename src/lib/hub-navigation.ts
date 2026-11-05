import type { Screen } from "@/src/types/govfund";
import type { WorkspaceHub } from "@/src/types/strategy";

export const hubs: { id: WorkspaceHub; title: string; detail: string; start: Screen; screens: Screen[] }[] = [
  { id: "private", title: "Private Sector Hub", detail: "ประกาศโจทย์ ค้นทีมวิจัย และค้นเทคโนโลยี", start: "corporate", screens: ["corporate", "marketplace", "collaboration", "impact", "governance"] },
  { id: "researcher", title: "Researcher Hub", detail: "ค้นทุน เตรียมข้อเสนอ และร่วมแก้โจทย์เอกชน", start: "dashboard", screens: ["dashboard", "readiness", "search", "apply", "tracking", "corporate", "semantic", "governance"] },
  { id: "collaboration", title: "Collaboration", detail: "ห้องโครงการ เงื่อนไข IP งวดงาน และผลกระทบ", start: "collaboration", screens: ["collaboration", "impact", "marketplace", "governance"] },
];
export function hubConfig(id: WorkspaceHub) { return hubs.find((hub) => hub.id === id) ?? hubs[1]; }
