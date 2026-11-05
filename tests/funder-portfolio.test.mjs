import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const compile=source=>ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const dataText=compile(await readFile(new URL("../src/data/funder-demo-data.ts",import.meta.url),"utf8"));
const dataUrl=`data:text/javascript;base64,${Buffer.from(dataText).toString("base64")}`;
const data=await import(dataUrl);
const libText=compile(await readFile(new URL("../src/lib/funder-portfolio.ts",import.meta.url),"utf8")).replace("@/src/data/funder-demo-data",dataUrl);
const lib=await import(`data:text/javascript;base64,${Buffer.from(libText).toString("base64")}`);
const {fundedResearch:projects,demoGrantContracts:contracts,researcherDirectory:researchers}=data;

test("strategy totals reconcile once per awarded project and respect funder/year filters",()=>{
  const s=lib.portfolioSummary(projects,contracts);
  assert.equal(s.count,14);assert.equal(s.allocated,24100000);assert.equal(s.disbursed,7300000);
  assert.equal(s.strategies.reduce((n,s)=>n+s.count,0),14);
  assert.equal(s.strategies.reduce((n,s)=>n+s.amount,0),24100000);
  assert.ok(Math.abs(s.strategies.reduce((n,s)=>n+s.percent,0)-100)<1e-9);
  const filtered=projects.filter(p=>p.funderId==="F-NRCT"&&p.fiscalYear===2570);
  const f=lib.portfolioSummary(filtered,contracts);
  assert.equal(f.count,3);assert.equal(f.allocated,8100000);assert.equal(f.disbursed,1400000);
  const empty=lib.portfolioSummary([],contracts);
  assert.equal(empty.allocated,0);assert.ok(empty.strategies.every(s=>s.percent===0));
});
test("research search is case insensitive and name/funder sorts remain deterministic",()=>{
  assert.deepEqual(lib.findResearch(projects,"  IOT ").map(p=>p.id),["GP-003"]);
  const byName=lib.findResearch(projects,"","all","all","name");
  const byFunder=lib.findResearch(projects,"","all","all","funder");
  const collator=new Intl.Collator("th",{numeric:true,sensitivity:"base"});
  for(let i=1;i<byName.length;i++)assert.ok(collator.compare(byName[i-1].title,byName[i].title)<=0);
  for(let i=1;i<byFunder.length;i++)assert.ok(collator.compare(lib.funderName(byFunder[i-1].funderId),lib.funderName(byFunder[i].funderId))<=0);
  assert.deepEqual(lib.findResearch(projects,"","all","all","name",true),[...byName].reverse());
  assert.ok(lib.findResearch(projects,"","F-FOOD").every(p=>p.funderId==="F-FOOD"));
});
test("researcher directory combines field and expertise filters",()=>{
  assert.equal(lib.findResearchers(researchers,"IoT","engineering").length,2);
  assert.equal(lib.findResearchers(researchers,"IoT","humanities").length,0);
  assert.equal(lib.findResearchers(researchers,"  ","all").length,10);
});
test("contract seed references and installment arithmetic are valid",()=>{
  for(const c of contracts){
    assert.deepEqual(lib.validateContract(c,projects.find(p=>p.id===c.projectId),contracts,c),[]);
    const s=lib.installmentSummary(c);assert.equal(s.disbursed+s.remaining,s.total);
  }
  const split=lib.splitInstallments(1000001,3,"2026-11-05","2027-09-30","test");
  assert.equal(split.reduce((n,i)=>n+i.amount,0),1000001);
  assert.ok(split.every(i=>i.dueDate>="2026-11-05"&&i.dueDate<="2027-09-30"));
});
test("invalid amounts, duplicate project contracts and changed paid installments are rejected",()=>{
  const previous=contracts[0],project=projects.find(p=>p.id===previous.projectId);
  const mismatch={...previous,installments:previous.installments.map((i,n)=>n===1?{...i,amount:i.amount+1}:i)};
  assert.ok(lib.validateContract(mismatch,project,contracts,previous).some(e=>e.includes("ยอดรวม")));
  assert.ok(lib.validateContract({...previous,id:"duplicate",number:"new"},project,contracts).some(e=>e.includes("โครงการนี้มีสัญญา")));
  const paidChanged={...previous,installments:previous.installments.map((i,n)=>({...i,amount:i.amount+(n===0?1:n===1?-1:0)}))};
  assert.ok(lib.validateContract(paidChanged,project,contracts,previous).some(e=>e.includes("เบิกจ่ายแล้ว")));
  const invalidDate={...previous,signedDate:"2026-02-30"};
  assert.ok(lib.validateContract(invalidDate,project,contracts,previous).some(e=>e.includes("วันที่")));
});
test("a recorded installment updates disbursements, not allocations, and cannot be paid twice",()=>{
  const c=contracts.find(c=>c.projectId==="GP-003"),id=c.installments[0].id;
  const updated=lib.recordDisbursement(c,id,"2026-11-05"," DEMO-PAY-TEST ","2026-11-05");
  assert.equal(lib.installmentSummary(updated).paidCount,1);
  assert.equal(lib.installmentSummary(updated).disbursed,750000);
  const before=lib.portfolioSummary(projects,contracts),after=lib.portfolioSummary(projects,contracts.map(x=>x.id===c.id?updated:x));
  assert.equal(after.allocated,before.allocated);assert.equal(after.disbursed,before.disbursed+750000);
  assert.throws(()=>lib.recordDisbursement(updated,id,"2026-11-05","DUPLICATE","2026-11-05"));
  assert.throws(()=>lib.recordDisbursement(c,id,"2026-11-06","FUTURE","2026-11-05"));
  assert.throws(()=>lib.recordDisbursement(c,id,"2026-11-05"," ","2026-11-05"));
});
