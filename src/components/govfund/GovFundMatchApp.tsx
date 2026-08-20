"use client";

import { FormEvent, useState } from "react";

import { govFundDemoData } from "@/src/data/govfund-demo-data";
import {
  matchBadgeClasses,
  progressBarClasses,
  statusBadgeClasses,
  statusMarker,
} from "@/src/lib/govfund-display";
import type { Fund, GovFundScreen } from "@/src/types/govfund";
import { SuccessDialog } from "@/src/components/ui/SuccessDialog";

function AppHeader({
  screen,
  onNavigate,
}: {
  screen: GovFundScreen;
  onNavigate: (screen: GovFundScreen) => void;
}) {
  const signedIn = screen !== "landing";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate(signedIn ? "dashboard" : "landing")}
          className="flex items-center gap-3 text-left"
          aria-label="GovFund Match home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#1E3A8A] text-sm font-bold text-white shadow-sm">
            GF
          </span>
          <span>
            <span className="block text-lg font-bold text-slate-950">
              GovFund Match
            </span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              One-Stop Government Innovation Funding
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          <button
            type="button"
            onClick={() => onNavigate(signedIn ? "dashboard" : "landing")}
            className="hover:text-[#1E3A8A]"
          >
            Home
          </button>
          <a className="hover:text-[#1E3A8A]" href="#about">
            About
          </a>
          <a className="hover:text-[#1E3A8A]" href="#contact">
            Contact
          </a>
          {signedIn ? (
            <button
              type="button"
              onClick={() => onNavigate("status")}
              className="rounded-lg border border-slate-300 px-4 py-2 text-[#1E3A8A] hover:border-[#1E3A8A] hover:bg-blue-50"
            >
              My Applications
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

function LandingPage({ onLogin }: { onLogin: () => void }) {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-[#1E3A8A]">
              NDID-ready public service platform
            </span>
            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              หาทุนรัฐ สร้างนวัตกรรม ในที่เดียว
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              แพลตฟอร์ม One-Stop Service สำหรับประชาชนและ SME
              ไทยในการค้นหา จับคู่ และยื่นขอทุนวิจัยหรือนวัตกรรมจากภาครัฐ
              พร้อมข้อมูลผู้สมัครที่กรอกให้อัตโนมัติอย่างปลอดภัย
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onLogin}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1E3A8A] px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                เข้าสู่ระบบด้วย NDID (Login with NDID)
              </button>
              <a
                href="#about"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-base font-bold text-slate-700 hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
              >
                ดูวิธีการทำงาน
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Smart Match Preview
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-950">
                    โครงการอบแห้งพลังงานแสงอาทิตย์
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                  95% Match
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ["ยืนยันตัวตน", "NDID verified"],
                  ["จับคู่ทุน", "AI ranked by eligibility"],
                  ["ยื่นเอกสาร", "Auto-filled applicant profile"],
                ].map(([title, value], index) => (
                  <div
                    key={title}
                    className="grid grid-cols-[40px_1fr] items-center gap-3"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-sm font-bold text-[#1E3A8A]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{title}</p>
                      <p className="text-sm text-slate-500">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-dashed border-blue-300 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-[#1E3A8A]">
                  Trust Blue secure exchange
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  ข้อมูลจาก Digital ID และฐานทะเบียนธุรกิจถูกนำมาใช้เฉพาะขั้นตอนสมัครทุน
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-slate-50 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ["ค้นหาทุนเร็วขึ้น", "รวมทุนรัฐหลายหน่วยงานไว้ในที่เดียว"],
            ["ลดการกรอกซ้ำ", "ใช้ข้อมูลที่ยืนยันแล้วจาก NDID และทะเบียนธุรกิจ"],
            ["ติดตามสถานะชัดเจน", "เห็นขั้นตอนการพิจารณาและสิ่งที่ต้องทำต่อ"],
          ].map(([title, body]) => (
            <article
              key={title}
              className="rounded-lg border border-slate-200 bg-white p-6"
            >
              <h2 className="text-lg font-bold text-slate-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
          Contact: support@govfund.example.go.th
        </div>
      </section>
    </main>
  );
}

function Dashboard({
  idea,
  hasMatched,
  onIdeaChange,
  onMatch,
  onApply,
}: {
  idea: string;
  hasMatched: boolean;
  onIdeaChange: (value: string) => void;
  onMatch: () => void;
  onApply: (fund: Fund) => void;
}) {
  const actionRequiredCount = govFundDemoData.applications.filter(
    (application) => application.tone === "red",
  ).length;
  const topMatch = Math.max(
    ...govFundDemoData.funds.map((fund) => fund.matchScore),
  );

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <p className="text-sm font-semibold text-slate-500">Dashboard</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
            สวัสดี {govFundDemoData.user.name} (SME:{" "}
            {govFundDemoData.user.company})
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            อธิบายแนวคิดโครงการของคุณ แล้วระบบจะจำลองการจับคู่ทุนที่เหมาะสมตามหมวด
            หน่วยงาน และเงื่อนไขเบื้องต้น
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["ทุนที่เปิดจับคู่", `${govFundDemoData.funds.length} รายการ`],
            ["คะแนนเหมาะสมสูงสุด", `${topMatch}%`],
            ["ต้องดำเนินการ", `${actionRequiredCount} รายการ`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
            </div>
          ))}
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#1E3A8A]">
                AI Smart Matching
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">
                เล่าโปรเจกต์ของคุณให้ระบบช่วยหาทุน
              </h2>
            </div>
            <span className="text-sm font-medium text-slate-500">
              Secure mock analysis
            </span>
          </div>

          <label className="mt-5 block" htmlFor="project-idea">
            <span className="sr-only">Project idea</span>
            <textarea
              id="project-idea"
              value={idea}
              onChange={(event) => onIdeaChange(event.target.value)}
              placeholder="พิมพ์แนวคิดหรือโปรเจกต์นวัตกรรมของคุณที่นี่ (เช่น ต้องการทำระบบอบแห้งพลังงานแสงอาทิตย์สำหรับสมุนไพร)..."
              className="min-h-40 w-full resize-y rounded-lg border border-slate-300 bg-white p-4 text-base leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100"
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onMatch}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1E3A8A] px-5 py-3 font-bold text-white shadow-sm hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              ✨ ให้ AI ช่วยหาทุนที่เหมาะสม (Smart Match)
            </button>
            <p className="text-sm text-slate-500">
              ตัวอย่างนี้ใช้ข้อมูลจำลองเพื่อแสดงประสบการณ์ผู้ใช้
            </p>
          </div>
        </section>

        {hasMatched ? (
          <section className="mt-6">
            <div className="mb-4">
              <p className="text-sm font-semibold text-[#1E3A8A]">
                Recommended Funds
              </p>
              <h2 className="text-xl font-bold text-slate-950">
                ทุนที่เหมาะสมกับแนวคิดของคุณ
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {govFundDemoData.funds.map((fund) => (
                <article
                  key={fund.id}
                  className="flex min-h-[260px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {fund.agency}
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-7 text-slate-950">
                        {fund.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${matchBadgeClasses(
                        fund.matchScore,
                      )}`}
                    >
                      {fund.matchScore}%
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {fund.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-[#1E3A8A]"
                      style={{ width: `${fund.matchScore}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onApply(fund)}
                    className="mt-auto inline-flex min-h-11 items-center justify-center rounded-lg border border-[#1E3A8A] px-4 py-3 text-sm font-bold text-[#1E3A8A] hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  >
                    ดูรายละเอียดและยื่นขอทุน
                  </button>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        value={value}
        readOnly
        className="mt-2 min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
      />
    </label>
  );
}

function ApplicationForm({
  selectedFund,
  onSaveDraft,
  onSubmit,
}: {
  selectedFund: Fund;
  onSaveDraft: () => void;
  onSubmit: () => void;
}) {
  const [projectTitle, setProjectTitle] = useState(
    "ระบบอบแห้งพลังงานแสงอาทิตย์สำหรับสมุนไพร",
  );
  const [budget, setBudget] = useState("1,500,000");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <main className="bg-slate-50">
      <form
        onSubmit={submitForm}
        className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#1E3A8A]">
            One-Stop Submit
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
            ยื่นขอทุน: {selectedFund.title}
          </h1>
        </div>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">
            ข้อมูลผู้สมัคร
          </h2>
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            ✅ ข้อมูลถูกดึงมาจากระบบ NDID และกรมพัฒนาธุรกิจการค้าอัตโนมัติ
            (Auto-filled)
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <ReadOnlyField
              label="ชื่อ-นามสกุล"
              value={govFundDemoData.user.name}
            />
            <ReadOnlyField
              label="ชื่อบริษัท"
              value={govFundDemoData.user.company}
            />
            <ReadOnlyField
              label="เลขทะเบียนนิติบุคคล"
              value={govFundDemoData.user.registrationNo}
            />
            <ReadOnlyField label="ที่อยู่" value={govFundDemoData.user.address} />
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">
            รายละเอียดโครงการ
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                ชื่อโครงการ
              </span>
              <input
                value={projectTitle}
                onChange={(event) => setProjectTitle(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                งบประมาณที่ขอสนับสนุน
              </span>
              <div className="mt-2 flex min-h-12 overflow-hidden rounded-lg border border-slate-300 focus-within:border-[#1E3A8A] focus-within:ring-4 focus-within:ring-blue-100">
                <span className="grid w-14 place-items-center bg-slate-50 text-sm font-bold text-slate-500">
                  THB
                </span>
                <input
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  inputMode="numeric"
                  className="w-full px-4 py-3 text-slate-900 outline-none"
                />
              </div>
            </label>
          </div>

          <label className="mt-5 block cursor-pointer rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center hover:border-[#1E3A8A] hover:bg-blue-50">
            <span className="block text-base font-bold text-slate-900">
              อัปโหลด Proposal และ Pitch Deck (PDF เท่านั้น)
            </span>
            <span className="mt-2 block text-sm text-slate-500">
              Drag and drop zone หรือคลิกเพื่อเลือกไฟล์
            </span>
            <input type="file" accept="application/pdf" className="sr-only" />
          </label>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onSaveDraft}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
            >
              บันทึกร่าง (Save Draft)
            </button>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1E3A8A] px-5 py-3 font-bold text-white shadow-sm hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              ยืนยันการส่งข้อมูล (Submit Application)
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}

function StatusDashboard() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#1E3A8A]">
              Dashboard Tab
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
              ติดตามสถานะการขอทุน (My Applications)
            </h1>
          </div>
          <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
            {govFundDemoData.applications.length} applications
          </span>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.5fr_1fr_1.1fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-600 md:grid">
            <span>Project</span>
            <span>Fund</span>
            <span>Status</span>
            <span>Submitted Date</span>
          </div>
          <div className="divide-y divide-slate-200">
            {govFundDemoData.applications.map((application) => (
              <article
                key={application.title}
                className="grid gap-4 px-5 py-5 md:grid-cols-[1.5fr_1fr_1.1fr_0.8fr] md:items-center"
              >
                <div>
                  <p className="font-bold text-slate-950">
                    {application.title}
                  </p>
                  <div className="mt-3 h-2 max-w-sm rounded-full bg-slate-100">
                    <div
                      className={`h-2 rounded-full ${progressBarClasses(
                        application.tone,
                      )}`}
                      style={{ width: `${application.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-slate-600">{application.fund}</p>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${statusBadgeClasses(
                    application.tone,
                  )}`}
                >
                  {statusMarker(application.tone)} {application.status}
                </span>
                <p className="text-sm font-semibold text-slate-500">
                  {application.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function GovFundMatchApp() {
  const [screen, setScreen] = useState<GovFundScreen>("landing");
  const [idea, setIdea] = useState("");
  const [hasMatched, setHasMatched] = useState(false);
  const [selectedFund, setSelectedFund] = useState<Fund>(
    govFundDemoData.funds[0],
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  function navigate(nextScreen: GovFundScreen) {
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function applyToFund(fund: Fund) {
    setSelectedFund(fund);
    navigate("apply");
  }

  function submitApplication() {
    setShowSuccess(true);
    navigate("status");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <AppHeader screen={screen} onNavigate={navigate} />

      {screen === "landing" ? (
        <LandingPage onLogin={() => navigate("dashboard")} />
      ) : null}

      {screen === "dashboard" ? (
        <Dashboard
          idea={idea}
          hasMatched={hasMatched}
          onIdeaChange={setIdea}
          onMatch={() => setHasMatched(true)}
          onApply={applyToFund}
        />
      ) : null}

      {screen === "apply" ? (
        <ApplicationForm
          selectedFund={selectedFund}
          onSaveDraft={() => setDraftSaved(true)}
          onSubmit={submitApplication}
        />
      ) : null}

      {screen === "status" ? <StatusDashboard /> : null}

      {draftSaved ? (
        <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-[#1E3A8A] shadow-lg">
          บันทึกร่างเรียบร้อยแล้ว
          <button
            type="button"
            className="float-right font-bold text-slate-500"
            onClick={() => setDraftSaved(false)}
            aria-label="Dismiss draft saved message"
          >
            Close
          </button>
        </div>
      ) : null}

      <SuccessDialog open={showSuccess} onOpenChange={setShowSuccess} />
    </div>
  );
}
