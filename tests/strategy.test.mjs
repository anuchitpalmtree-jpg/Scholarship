import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

// Run the same pure calculation/validation functions shipped to the prototype.
const compile = (source) => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const data = compile(await readFile(new URL("../src/data/strategy-demo-data.ts", import.meta.url), "utf8"));
const dataUrl = `data:text/javascript;base64,${Buffer.from(data).toString("base64")}`;
const source = compile(await readFile(new URL("../src/lib/strategy-demo.ts", import.meta.url), "utf8")).replace("@/src/data/strategy-demo-data", dataUrl);
const { matchingFund, compareSemantic, adjustedImpact, integrationCosts, validateExchange, exchangeSample, matchResearchers } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
const { semanticScenarios } = await import(dataUrl);
const navigationSource = compile(await readFile(new URL("../src/lib/hub-navigation.ts", import.meta.url), "utf8"));
const { canEnterHub, hubConfig } = await import(`data:text/javascript;base64,${Buffer.from(navigationSource).toString("base64")}`);

test("a signed-in Hub cannot enter a different Hub until logout", () => {
  const hubs = ["private", "researcher", "collaboration"];
  for (const active of hubs) for (const requested of hubs) assert.equal(canEnterHub(active, requested), active === requested);
  for (const requested of hubs) assert.equal(canEnterHub(null, requested), true);
  assert.ok(!hubConfig("private").screens.includes("collaboration"));
  assert.ok(!hubConfig("collaboration").screens.includes("marketplace"));
});

test("co-funding conserves total at both boundaries and clamps invalid ratios", () => {
  for (const ratio of [-10, 0, 40, 100, 120]) {
    const result = matchingFund(2500000, ratio);
    assert.equal(result.publicAmount + result.privateAmount, 2500000);
    assert.ok(result.publicAmount >= 0 && result.privateAmount >= 0);
  }
  assert.equal(matchingFund(2500000, 40).privateAmount, 1000000);
  assert.equal(matchingFund(Number.NaN, 40).total, 0);
});
test("concept comparison distinguishes paraphrases from shared keywords in an unrelated survey", () => {
  const paraphrase = compareSemantic(semanticScenarios[0].text)[0];
  const survey = compareSemantic(semanticScenarios[1].text)[0];
  assert.equal(paraphrase.record.id, "SYN-PMUB-001");
  assert.ok(paraphrase.score >= 60);
  assert.ok(survey.score < 30);
  assert.ok(paraphrase.score > survey.score);
  assert.equal(compareSemantic(semanticScenarios[2].text)[0].record.id, "SYN-NIA-002");
  assert.equal(compareSemantic("เนื้อหาที่ไม่มีแนวคิดในพจนานุกรม")[0].score, 0);
});
test("matching notices go only to researchers sharing requested expertise", () => {
  const matched = matchResearchers({ expertise: ["วัสดุ"] });
  assert.equal(matched.length, 1);
  assert.ok(matched[0].name.includes("วิภา"));
  assert.equal(matchResearchers({ expertise: ["สาขาที่ไม่มี"] }).length, 0);
});
test("cost comparison can show shared infrastructure costing more", () => {
  const result = integrationCosts(1, 100000, 1000000, 200000, 15);
  assert.ok(result.difference < 0);
  assert.equal(result.standard3Year, 1560000);
});
test("impact adjustments do not count all benefits as attributable to research", () => {
  assert.deepEqual(adjustedImpact(12, 9, 100000, 50, 10), { gross: 300000, adjusted: 135000 });
  assert.equal(adjustedImpact(9, 12, 100000, 50, 10).adjusted, 0);
  assert.equal(adjustedImpact(12, 9, 100000, 50, 100).adjusted, 0);
});
test("exchange rejects legacy money/status formats until converted", () => {
  assert.deepEqual(validateExchange(exchangeSample), []);
  const errors = validateExchange({ ...exchangeSample, requestedBudget: "2,500,000", status: "รอผล", fiscalYear: 2027 });
  assert.equal(errors.length, 3);
  assert.ok(validateExchange({ ...exchangeSample, updatedAt: "not-a-date" }).length);
  assert.ok(validateExchange(null).length);
});
