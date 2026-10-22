import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Grant+ public funding landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Grant\+ ทุนที่ใช่ ไปได้ไกลกว่า<\/title>/i);
  assert.match(html, /Grant\+/);
  assert.match(html, /ทุนที่ใช่/);
  assert.match(html, /ข่าวสารทุนล่าสุด/);
  assert.match(html, /เข้าสู่ระบบด้วย Google/);
  assert.match(html, /ลงทะเบียนแทน/);
  assert.match(html, /Simulation mode/);
  assert.match(html, /โหมดกรอกและบันทึกข้อมูล/);
  assert.doesNotMatch(
    html,
    /codex-preview|SkeletonPreview|react-loading-skeleton/,
  );
});

test("keeps the requested Grant+ workflows and mock data in source", async () => {
  const page = await readFile(
    new URL("../src/app/page.tsx", import.meta.url),
    "utf8",
  );
  const prototype = await readFile(
    new URL("../src/components/govfund/GovFundMatchApp.tsx", import.meta.url),
    "utf8",
  );
  const layout = await readFile(
    new URL("../src/app/layout.tsx", import.meta.url),
    "utf8",
  );
  const data = await readFile(
    new URL("../src/data/govfund-demo-data.ts", import.meta.url),
    "utf8",
  );
  const brand = await readFile(
    new URL("../src/components/govfund/GrantPlusBrand.tsx", import.meta.url),
    "utf8",
  );
  const schema = await readFile(
    new URL("../src/db/schema.ts", import.meta.url),
    "utf8",
  );
  const session = await readFile(
    new URL("../src/lib/grant-session.ts", import.meta.url),
    "utf8",
  );
  const applicationsRoute = await readFile(
    new URL("../src/app/api/applications/route.ts", import.meta.url),
    "utf8",
  );

  assert.match(page, /GovFundMatchApp/);
  assert.match(prototype, /เข้าสู่ระบบด้วย Google/);
  assert.match(prototype, /ผู้วิจัยเจ้าของข้อเสนอ/);
  assert.match(prototype, /ผู้ลงทะเบียน\/ผู้ประสานงาน/);
  assert.match(prototype, /ตรวจสอบความพร้อมในการยื่นขอทุน/);
  assert.match(
    prototype,
    /Problem,\s+Desirability, Usability, Feasibility หรือ Viability/,
  );
  assert.match(prototype, /ยืนยันและส่งต่อ/);
  assert.match(prototype, /PMU-B 80%/);
  assert.match(prototype, /EMAIL STATUS SIMULATION/);
  assert.match(prototype, /GrantProcessJourney/);
  assert.match(prototype, /บันทึกร่างลงฐานข้อมูล/);
  assert.match(prototype, /เข้าใช้งานด้วยอีเมล/);
  assert.match(prototype, /ส่งใบสมัคร \(Simulation\)/);
  const journey = await readFile(
    new URL(
      "../src/components/govfund/GrantProcessJourney.tsx",
      import.meta.url,
    ),
    "utf8",
  );
  assert.match(journey, /ผู้ทรงคุณวุฒิประเมิน/);
  assert.match(journey, /คณะกรรมการพิจารณา/);
  assert.match(journey, /ประกาศผลและทำสัญญา/);
  assert.match(schema, /grant_users/);
  assert.match(schema, /grant_sessions/);
  assert.match(schema, /grant_applications/);
  assert.match(session, /httpOnly: true/);
  assert.match(session, /sameSite: "lax"/);
  assert.match(session, /SESSION_SECONDS = 60 \* 60 \* 24 \* 30/);
  assert.match(applicationsRoute, /requireRememberedUser/);
  assert.doesNotMatch(prototype, /localStorage/);
  assert.match(data, /NIA-REG70-00182/);
  assert.match(data, /receivedDate/);
  assert.match(data, /ใบสมัครตัวอย่าง/);
  assert.match(brand, /GrantPlusMark/);
  assert.match(brand, /ทุนที่ใช่ ไปได้ไกลกว่า/);
  assert.match(prototype, /GrantPlusBrand size="hero"/);
  assert.match(prototype, /GrantPlusMark className="h-10 w-10 shrink-0"/);
  assert.match(layout, /lang="th"/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
});
