import { demoResearchers, researchRecords } from "@/src/data/strategy-demo-data";
import type { IndustryChallenge, SemanticResult } from "@/src/types/strategy";

export function matchingFund(total: number, privatePercent: number) {
  const budget = Number.isFinite(total) ? Math.max(0, total) : 0;
  const percent = Number.isFinite(privatePercent) ? Math.min(100, Math.max(0, privatePercent)) : 0;
  const privateAmount = Math.round((budget * percent) / 100);
  return { total: budget, privateAmount, publicAmount: budget - privateAmount, privatePercent: percent };
}

export function matchResearchers(challenge: IndustryChallenge) {
  return demoResearchers.map((researcher) => ({ ...researcher, matched: researcher.expertise.filter((item) => challenge.expertise.includes(item)) })).filter((item) => item.matched.length > 0).sort((a, b) => b.matched.length - a.matched.length);
}

// A transparent concept dictionary for a demonstrator, not embeddings or a trained model.
// Grouping synonyms lets a paraphrased sample retain the same conceptual evidence.
const concepts = [
  { name: "ลดการใช้พลังงาน", pattern: /ลด.{0,16}(พลังงาน|ไฟฟ้า|ต้นทุนไฟ)|ประหยัด.{0,12}(พลังงาน|ไฟฟ้า)/i, dimensions: ["objective"] },
  { name: "คุณภาพอาหาร", pattern: /คุณภาพ.{0,16}(อาหาร|ผลิตภัณฑ์)|รักษาคุณภาพ/i, dimensions: ["objective"] },
  { name: "ลดขยะพลาสติก", pattern: /ลด.{0,12}(ขยะ|พลาสติก)|ทดแทนพลาสติก/i, dimensions: ["objective"] },
  { name: "ซ่อมบำรุงเครื่องจักร", pattern: /ซ่อมบำรุง|หยุดเครื่อง/i, dimensions: ["objective"] },
  { name: "พลังงานแสงอาทิตย์", pattern: /แสงอาทิตย์|สุริยะ|solar/i, dimensions: ["method"] },
  { name: "เซนเซอร์และการควบคุม", pattern: /เซนเซอร์|ตัวตรวจวัด|iot|ควบคุมความชื้น|วัดการสั่น/i, dimensions: ["method"] },
  { name: "ขึ้นรูปวัสดุ", pattern: /ขึ้นรูป|เส้นใย|วัสดุชีวภาพ/i, dimensions: ["method"] },
  { name: "ทดสอบการย่อยสลาย", pattern: /ย่อยสลาย/i, dimensions: ["method"] },
  { name: "ผู้ประกอบการอาหาร", pattern: /ผลไม้|อาหาร|วิสาหกิจชุมชน/i, dimensions: ["population"] },
  { name: "โรงงานอุตสาหกรรม", pattern: /โรงงาน|สายการผลิต|อุตสาหกรรม/i, dimensions: ["population"] },
  { name: "ต้นแบบและผลทดสอบ", pattern: /ต้นแบบ|อุปกรณ์|ผลทดสอบ/i, dimensions: ["output"] },
  { name: "บรรจุภัณฑ์", pattern: /บรรจุภัณฑ์|ภาชนะ/i, dimensions: ["output"] },
  { name: "ระบบแจ้งเตือน", pattern: /แจ้งเตือน|แผนซ่อม/i, dimensions: ["output"] },
];

export function compareSemantic(text: string): SemanticResult[] {
  const negativeStudy = /แบบสอบถาม|สำรวจความคิดเห็น/.test(text);
  const dimensions = [
    { key: "objective", label: "วัตถุประสงค์", weight: 35 },
    { key: "method", label: "วิธีดำเนินงาน", weight: 30 },
    { key: "population", label: "กลุ่มเป้าหมาย / บริบท", weight: 15 },
    { key: "output", label: "ผลผลิต", weight: 20 },
  ];
  return researchRecords.map((record) => {
    const details = dimensions.map((dimension) => {
      const relevant = concepts.filter((item) => item.dimensions.includes(dimension.key));
      const target = relevant.filter((item) => item.pattern.test(String(record[dimension.key as keyof typeof record])));
      const shared = target.filter((item) => item.pattern.test(text));
      const evidence = shared.map((item) => item.name);
      // The survey example demonstrates why a shared technical keyword alone is weak evidence.
      const score = negativeStudy && dimension.key !== "objective" ? 0 : target.length ? Math.round((shared.length / target.length) * 100) : 0;
      return { ...dimension, score, evidence: score ? evidence : [] };
    });
    const score = Math.round(details.reduce((sum, item) => sum + item.score * item.weight / 100, 0));
    return { record, score, dimensions: details, reasons: details.filter((item) => item.evidence.length).map((item) => `${item.label}: ${item.evidence.join(", ")}`) };
  }).sort((a, b) => b.score - a.score);
}

export function integrationCosts(agencies: number, customPerAgency: number, sharedLayer: number, adapterPerAgency: number, maintenancePercent = 15) {
  const n = Math.max(1, Math.round(Number.isFinite(agencies) ? agencies : 1));
  const custom = n * Math.max(0, customPerAgency || 0);
  const standard = Math.max(0, sharedLayer || 0) + n * Math.max(0, adapterPerAgency || 0);
  const rate = Math.max(0, maintenancePercent || 0) / 100;
  return { custom, standard, difference: custom - standard, custom3Year: Math.round(custom * (1 + 2 * rate)), standard3Year: Math.round(standard * (1 + 2 * rate)) };
}

export const exchangeSample = { schemaVersion: "0.1-demo", projectId: "GP-DEMO-001", agencyId: "AGENCY-DEMO", title: "ระบบอบแห้งพลังงานแสงอาทิตย์อัจฉริยะ", fiscalYear: 2570, requestedBudget: 2500000, status: "submitted", researcherRef: "SYN-RESEARCHER-001", updatedAt: "2026-11-05T03:00:00Z" };

export function validateExchange(value: unknown): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return ["ต้องเป็น JSON object"];
  const record = value as Record<string, unknown>;
  const errors: string[] = [];
  for (const key of ["projectId", "agencyId", "title", "researcherRef"]) if (typeof record[key] !== "string" || !(record[key] as string).trim()) errors.push(`${key}: ต้องระบุข้อความ`);
  if (record.schemaVersion !== "0.1-demo") errors.push("schemaVersion: ต้องเป็น 0.1-demo");
  if (!Number.isInteger(record.fiscalYear) || (record.fiscalYear as number) < 2500 || (record.fiscalYear as number) > 2700) errors.push("fiscalYear: ต้องเป็นปี พ.ศ. ระหว่าง 2500–2700");
  if (typeof record.requestedBudget !== "number" || !Number.isFinite(record.requestedBudget) || record.requestedBudget <= 0) errors.push("requestedBudget: ต้องเป็นตัวเลขมากกว่า 0 (บาท)");
  if (!["draft", "submitted", "under_review", "approved", "rejected"].includes(String(record.status))) errors.push("status: ต้องใช้รหัสสถานะกลางที่กำหนด");
  if (typeof record.updatedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T/.test(record.updatedAt) || !Number.isFinite(Date.parse(record.updatedAt))) errors.push("updatedAt: ต้องเป็นวันที่และเวลา ISO 8601");
  return errors;
}

export function adjustedImpact(baseline: number, current: number, units: number, attribution: number, deadweight: number) {
  const gross = Math.max(0, (baseline - current) * units);
  const fraction = (value: number) => Math.min(100, Math.max(0, value || 0)) / 100;
  return { gross, adjusted: Math.round(gross * fraction(attribution) * (1 - fraction(deadweight))) };
}
