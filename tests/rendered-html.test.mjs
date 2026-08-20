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

test("server-renders the GovFund Match landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>GovFund Match<\/title>/i);
  assert.match(html, /GovFund Match/);
  assert.match(html, /หาทุนรัฐ สร้างนวัตกรรม ในที่เดียว/);
  assert.match(html, /เข้าสู่ระบบด้วย NDID/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("keeps the requested GovFund mock data in the app source", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );

  assert.match(page, /คุณดนัย นักประดิษฐ์/);
  assert.match(page, /บริษัท อกริเทค จำกัด/);
  assert.match(page, /กองทุนส่งเสริมการอนุรักษ์พลังงาน/);
  assert.match(page, /ทุนสนับสนุนนวัตกรรม วว\. \(TISTR\)/);
  assert.match(page, /ทุนวิจัยด้านการแพทย์ TCELS/);
  assert.match(page, /ติดตามสถานะการขอทุน/);
  assert.match(layout, /lang="th"/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
});
