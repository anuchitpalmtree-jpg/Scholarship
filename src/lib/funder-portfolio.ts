import { demoFunders, nationalStrategies, researcherDirectory } from "@/src/data/funder-demo-data";
import type { ContractInstallment, FundedResearch, GrantContract, ResearcherProfile } from "@/src/types/funder";

export const funderName = (id: string) => demoFunders.find(f=>f.id===id)?.name ?? id;
export const researcherName = (id: string) => researcherDirectory.find(r=>r.id===id)?.name ?? id;
export const baht = (value: number) => new Intl.NumberFormat("th-TH",{maximumFractionDigits:0}).format(value);
export const thaiDate = (value: string) => value ? new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${value}T00:00:00+07:00`)) : "–";
export const todayBangkok = () => new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
const collator=new Intl.Collator("th",{numeric:true,sensitivity:"base"});

export function findResearch(records: FundedResearch[], query: string, funderId = "all", fieldId = "all", sort: "name" | "funder" = "name", descending = false) {
  const search=query.trim().toLocaleLowerCase("th");
  return records.filter(p=>(funderId==="all"||p.funderId===funderId)&&(fieldId==="all"||p.fieldId===fieldId)&&`${p.id} ${p.title} ${p.summary} ${p.output} ${funderName(p.funderId)} ${researcherName(p.researcherId)}`.toLocaleLowerCase("th").includes(search)).sort((a,b)=>{
    const result=(sort==="funder"?collator.compare(funderName(a.funderId),funderName(b.funderId)):0)||collator.compare(a.title,b.title)||collator.compare(a.id,b.id);
    return descending?-result:result;
  });
}
export function findResearchers(records: ResearcherProfile[], query: string, fieldId = "all") {
  const search=query.trim().toLocaleLowerCase("th");
  return records.filter(r=>(fieldId==="all"||r.fieldId===fieldId)&&`${r.name} ${r.institution} ${r.lab} ${r.interests} ${r.expertise.join(" ")}`.toLocaleLowerCase("th").includes(search)).sort((a,b)=>collator.compare(a.name,b.name));
}
export function installmentSummary(contract: GrantContract) {
  const paid=contract.installments.filter(i=>i.status==="disbursed");
  const total=contract.installments.reduce((sum,i)=>sum+i.amount,0);
  const disbursed=paid.reduce((sum,i)=>sum+i.amount,0);
  return { total, disbursed, remaining:total-disbursed, paidCount:paid.length, totalCount:contract.installments.length };
}
export function portfolioSummary(records: FundedResearch[], contracts: GrantContract[]) {
  const ids=new Set(records.map(p=>p.id));
  const allocated=records.reduce((sum,p)=>sum+p.allocatedAmount,0);
  const disbursed=contracts.filter(c=>ids.has(c.projectId)).reduce((sum,c)=>sum+installmentSummary(c).disbursed,0);
  const strategies=nationalStrategies.map(strategy=>{
    const projects=records.filter(p=>p.primaryStrategyId===strategy.id);
    const amount=projects.reduce((sum,p)=>sum+p.allocatedAmount,0);
    return {...strategy,count:projects.length,amount,percent:allocated?amount/allocated*100:0};
  });
  return {count:records.length,funderCount:new Set(records.map(p=>p.funderId)).size,allocated,disbursed,remaining:allocated-disbursed,strategies};
}
function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(`${value}T00:00:00Z`))&&new Date(`${value}T00:00:00Z`).toISOString().slice(0,10)===value;
}
export function splitInstallments(total: number, count: number, signedDate: string, endDate: string, prefix: string): ContractInstallment[] {
  const n=Math.min(12,Math.max(1,Math.floor(Number.isFinite(count)?count:1)));
  const start=Date.parse(`${signedDate}T00:00:00Z`),end=Date.parse(`${endDate}T00:00:00Z`);
  return Array.from({length:n},(_,i)=>({id:`${prefix}-${i+1}`,name:`งวดที่ ${i+1}`,amount:Math.floor(total/n)+(i===n-1?total%n:0),dueDate:Number.isFinite(start)&&Number.isFinite(end)?new Date(start+(end-start)*(i+1)/n).toISOString().slice(0,10):endDate,status:"pending"}));
}
export function validateContract(contract: GrantContract, project: FundedResearch | undefined, existing: GrantContract[], previous?: GrantContract): string[] {
  const errors:string[]=[];
  if(!project||project.id!==contract.projectId)errors.push("กรุณาเลือกโครงการที่ได้รับจัดสรรทุนแล้ว");
  if(!contract.number.trim())errors.push("กรุณาระบุเลขที่สัญญา");
  if(existing.some(c=>c.id!==contract.id&&c.number.trim().toLowerCase()===contract.number.trim().toLowerCase()))errors.push("เลขที่สัญญานี้มีอยู่แล้ว");
  if(existing.some(c=>c.id!==contract.id&&c.projectId===contract.projectId))errors.push("โครงการนี้มีสัญญาแล้ว กรุณาแก้ไขสัญญาเดิม");
  if(previous&&previous.projectId!==contract.projectId)errors.push("ไม่สามารถเปลี่ยนโครงการของสัญญาเดิม");
  if(!validDate(contract.signedDate)||!validDate(contract.endDate)||contract.endDate<contract.signedDate)errors.push("ช่วงวันที่สัญญาไม่ถูกต้อง");
  if(contract.installments.length<1||contract.installments.length>12)errors.push("กำหนดจำนวนงวดระหว่าง 1–12 งวด");
  const ids=new Set<string>();
  for(const item of contract.installments){
    if(ids.has(item.id))errors.push("รหัสงวดซ้ำกัน");ids.add(item.id);
    if(!item.name.trim()||!Number.isSafeInteger(item.amount)||item.amount<=0)errors.push("แต่ละงวดต้องมีชื่อและจำนวนเงินเป็นบาทเต็มมากกว่า 0");
    if(!validDate(item.dueDate)||item.dueDate<contract.signedDate||item.dueDate>contract.endDate)errors.push("วันครบกำหนดงวดต้องอยู่ในช่วงสัญญา");
    if(item.status==="disbursed"&&(!item.reference?.trim()||!item.paidDate||!validDate(item.paidDate)||item.paidDate<contract.signedDate||item.paidDate>todayBangkok()))errors.push("งวดที่เบิกจ่ายแล้วต้องมีวันที่และเลขอ้างอิงที่ถูกต้อง");
  }
  if(project&&contract.installments.reduce((sum,i)=>sum+i.amount,0)!==project.allocatedAmount)errors.push("ยอดรวมทุกงวดต้องเท่ากับวงเงินจัดสรรของโครงการ");
  if(previous?.installments.some(old=>old.status==="disbursed"&&!contract.installments.some(item=>item.id===old.id&&item.name===old.name&&item.dueDate===old.dueDate&&item.amount===old.amount&&item.status===old.status&&item.paidDate===old.paidDate&&item.reference===old.reference)))errors.push("ไม่สามารถลบหรือเปลี่ยนยอดและหลักฐานของงวดที่เบิกจ่ายแล้ว");
  return [...new Set(errors)];
}
export function recordDisbursement(contract: GrantContract, installmentId: string, paidDate: string, reference: string, today = todayBangkok()): GrantContract {
  const item=contract.installments.find(i=>i.id===installmentId);
  if(!item||item.status==="disbursed")throw new Error("ไม่พบงวดที่รอเบิกจ่าย หรือบันทึกงวดนี้แล้ว");
  if(!reference.trim())throw new Error("กรุณาระบุเลขอ้างอิงการเบิกจ่ายจำลอง");
  if(!validDate(paidDate)||paidDate<contract.signedDate||paidDate>today)throw new Error("วันที่เบิกจ่ายต้องไม่ก่อนวันทำสัญญาหรืออยู่ในอนาคต");
  return {...contract,installments:contract.installments.map(i=>i.id===installmentId?{...i,status:"disbursed",paidDate,reference:reference.trim()}:i)};
}
