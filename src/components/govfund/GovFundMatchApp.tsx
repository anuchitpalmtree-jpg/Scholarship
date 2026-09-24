"use client";

import { Dialog } from "@base-ui/react/dialog";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileCheck2,
  FileText,
  Home,
  Landmark,
  LoaderCircle,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import {
  applicationHistory,
  fundTemplates,
  matchedFunds,
  publicGrants,
} from "@/src/data/govfund-demo-data";
import type {
  ApplicationHistory,
  IdentityContext,
  LoginRole,
  MatchedFund,
  RequirementItem,
  Screen,
} from "@/src/types/govfund";

const timeline = [
  { agency: "NIA", fund: "Regional Innovation", date: "23 ก.ย. – 31 ต.ค. 2569", color: "bg-emerald-500", width: "w-[58%]", offset: "ml-[12%]" },
  { agency: "บพค. (PMU-B)", fund: "Future Industries", date: "รอบตัวอย่าง ก.ย. – พ.ย. 2569", color: "bg-blue-700", width: "w-[67%]", offset: "ml-[18%]" },
  { agency: "วช. (NRCT)", fund: "ทุนวิจัยและนวัตกรรม", date: "รอบตัวอย่าง ต.ค. – พ.ย. 2569", color: "bg-amber-500", width: "w-[54%]", offset: "ml-[34%]" },
];

const dashboardCards = [
  { label: "ทุนที่เปิดรับ", value: "12", note: "รอบประกาศปัจจุบัน", icon: Landmark, color: "text-blue-800 bg-blue-50" },
  { label: "ใกล้ปิดรับ", value: "3", note: "ภายใน 30 วัน", icon: Clock3, color: "text-amber-700 bg-amber-50" },
  { label: "กำลังพิจารณา", value: "1", note: "รับเรื่องแล้ว", icon: FileCheck2, color: "text-emerald-700 bg-emerald-50" },
  { label: "ต้องดำเนินการ", value: "1", note: "ขอเอกสารเพิ่ม", icon: AlertTriangle, color: "text-red-700 bg-red-50" },
];

const defaultIdentity: IdentityContext = {
  role: "coordinator",
  registrantName: "คุณอรทัย ประสานงานวิจัย",
  registrantEmail: "orathai.demo@university.ac.th",
  researcherName: "รศ. ดร. ณัฐชา สุขเกษม",
  researcherEmail: "natcha.demo@university.ac.th",
  institution: "มหาวิทยาลัยตัวอย่าง",
};

function GoogleMark() {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-base font-black text-blue-700 shadow-sm">
      G
    </span>
  );
}

function statusStyle(status: RequirementItem["status"]) {
  if (status === "complete") {
    return { label: "ครบ", icon: CheckCircle2, classes: "bg-emerald-50 text-emerald-700", iconClasses: "text-emerald-600" };
  }
  if (status === "partial") {
    return { label: "มีบางส่วน", icon: AlertTriangle, classes: "bg-amber-50 text-amber-800", iconClasses: "text-amber-600" };
  }
  return { label: "ยังไม่พบ", icon: X, classes: "bg-red-50 text-red-700", iconClasses: "text-red-600" };
}

function Landing({ onLogin }: { onLogin: (identity: IdentityContext) => void }) {
  const [role, setRole] = useState<LoginRole>("coordinator");
  const [slide, setSlide] = useState(0);
  const [researcherName, setResearcherName] = useState(defaultIdentity.researcherName);
  const [researcherEmail, setResearcherEmail] = useState(defaultIdentity.researcherEmail);
  const [institution, setInstitution] = useState(defaultIdentity.institution);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % publicGrants.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const grant = publicGrants[slide];
  const loginWithGoogle = () => {
    if (role === "researcher") {
      onLogin({
        role,
        registrantName: "รศ. ดร. ณัฐชา สุขเกษม",
        registrantEmail: "natcha.demo@university.ac.th",
        researcherName: "รศ. ดร. ณัฐชา สุขเกษม",
        researcherEmail: "natcha.demo@university.ac.th",
        institution: "มหาวิทยาลัยตัวอย่าง",
      });
      return;
    }
    onLogin({ ...defaultIdentity, role, researcherName, researcherEmail, institution });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#1E3A8A] text-white shadow-sm"><Landmark size={23} /></div>
            <div><p className="text-xl font-black tracking-tight text-[#1E3A8A]">Grant+</p><p className="text-xs font-semibold text-slate-500">ทุนที่ใช่ ไปได้ไกลกว่า</p></div>
          </div>
          <div className="hidden items-center gap-2 text-sm font-semibold text-slate-500 sm:flex"><ShieldCheck size={18} className="text-blue-800" /> Prototype สำหรับสาธิต</div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-12">
        <div>
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.16em] text-blue-800">ONE-STOP RESEARCH FUNDING</p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Grant+ <span className="text-[#1E3A8A]">ทุนที่ใช่<br />ไปได้ไกลกว่า</span></h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">ค้นหาทุน ตรวจความครบของข้อเสนอ ยื่นใบสมัคร และติดตามการรับเรื่องของแต่ละแหล่งทุนจากจุดเดียว</p>
          </div>

          <section className="mt-8" aria-label="ตัวอย่างทุนที่กำลังเปิดรับ">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div><p className="text-sm font-bold text-emerald-700">ทุนที่กำลังเปิดรับ</p><h2 className="mt-1 text-2xl font-bold">ข่าวสารทุนล่าสุด</h2></div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setSlide((slide - 1 + publicGrants.length) % publicGrants.length)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 hover:border-blue-700 hover:text-blue-800" aria-label="ทุนก่อนหน้า"><ChevronLeft size={20} /></button>
                <button type="button" onClick={() => setSlide((slide + 1) % publicGrants.length)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 hover:border-blue-700 hover:text-blue-800" aria-label="ทุนถัดไป"><ChevronRight size={20} /></button>
              </div>
            </div>

            <article className="group relative min-h-[31rem] overflow-hidden rounded-2xl bg-blue-950 text-white shadow-xl sm:min-h-[28rem]">
              <Image key={grant.image} src={grant.image} alt={`ภาพประกอบ ${grant.title}`} fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/75 to-blue-950/15" />
              <div className="relative flex min-h-[31rem] flex-col justify-end p-6 sm:min-h-[28rem] sm:p-8">
                <div className="mb-auto flex flex-wrap items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white shadow-sm"><span className="h-2 w-2 rounded-full bg-white" /> เปิดรับสมัคร</span>
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur">{grant.deadline}</span>
                </div>
                <p className="text-sm font-bold text-blue-200">{grant.agency}</p>
                <h3 className="mt-2 max-w-3xl text-2xl font-black leading-snug sm:text-3xl">{grant.title}</h3>
                <p className="mt-3 max-w-3xl leading-7 text-blue-50">{grant.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{grant.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-blue-50 backdrop-blur">{tag}</span>)}</div>
                <div className="mt-6 flex flex-col gap-4 border-t border-white/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"><span className="flex items-center gap-2 font-bold"><CalendarDays size={18} /> {grant.window}</span><span className="flex items-center gap-2 font-bold"><Users size={18} /> สมัครแล้ว {grant.applicants.toLocaleString("th-TH")} ราย*</span></div>
                  <a href={grant.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 font-bold text-blue-950 hover:bg-blue-50">ดูแหล่งข้อมูล <ExternalLink size={17} /></a>
                </div>
              </div>
            </article>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex gap-2">{publicGrants.map((item, index) => <button key={item.id} type="button" onClick={() => setSlide(index)} aria-label={`แสดงทุนที่ ${index + 1}`} className={`h-2.5 rounded-full transition-all ${slide === index ? "w-8 bg-blue-800" : "w-2.5 bg-slate-300"}`} />)}</div>
              <p className="text-right text-xs leading-5 text-slate-500">*จำนวนผู้สมัครและรอบที่ระบุว่า “ตัวอย่าง” เป็นข้อมูลจำลอง ไม่ใช่ข้อมูลสดจากหน่วยงาน</p>
            </div>
          </section>
        </div>

        <aside className="lg:pt-24">
          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7">
            <p className="text-sm font-bold text-blue-800">เข้าสู่ระบบ</p>
            <h2 className="mt-1 text-2xl font-black">ใครเป็นผู้ลงทะเบียน?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">เลือกบทบาทก่อนเข้าสู่ระบบ เพื่อแยกผู้วิจัยเจ้าของข้อเสนอออกจากผู้ลงทะเบียนแทน</p>

            <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5" role="radiogroup" aria-label="บทบาทผู้เข้าสู่ระบบ">
              <button type="button" role="radio" aria-checked={role === "researcher"} onClick={() => setRole("researcher")} className={`min-h-16 rounded-lg px-3 text-left text-sm font-bold transition ${role === "researcher" ? "bg-white text-blue-900 shadow-sm" : "text-slate-500"}`}><UserRound className="mb-1" size={19} />ผู้วิจัยยื่นเอง</button>
              <button type="button" role="radio" aria-checked={role === "coordinator"} onClick={() => setRole("coordinator")} className={`min-h-16 rounded-lg px-3 text-left text-sm font-bold transition ${role === "coordinator" ? "bg-white text-blue-900 shadow-sm" : "text-slate-500"}`}><UserCheck className="mb-1" size={19} />ลงทะเบียนแทน</button>
            </div>

            {role === "coordinator" && <div className="mt-5 space-y-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <div><p className="text-sm font-bold text-blue-950">ระบุตัวผู้วิจัยเจ้าของข้อเสนอ</p><p className="mt-1 text-xs leading-5 text-blue-700">Google จะยืนยันตัวผู้ลงทะเบียน ส่วนข้อมูลด้านล่างระบุว่าแบบฟอร์มนี้ยื่นให้ใคร</p></div>
              <label className="block text-xs font-bold text-slate-700">ชื่อผู้วิจัย<input value={researcherName} onChange={(event) => setResearcherName(event.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" /></label>
              <label className="block text-xs font-bold text-slate-700">อีเมลผู้วิจัย<input type="email" value={researcherEmail} onChange={(event) => setResearcherEmail(event.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" /></label>
              <label className="block text-xs font-bold text-slate-700">หน่วยงาน/สถาบัน<input value={institution} onChange={(event) => setInstitution(event.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" /></label>
            </div>}

            <button type="button" onClick={loginWithGoogle} disabled={role === "coordinator" && (!researcherName.trim() || !researcherEmail.trim() || !institution.trim())} className="mt-6 flex min-h-14 w-full items-center justify-between rounded-xl bg-[#1E3A8A] px-5 text-left font-bold text-white shadow-sm transition hover:bg-blue-950 disabled:cursor-not-allowed disabled:bg-slate-300"><span className="flex items-center gap-3"><GoogleMark />เข้าสู่ระบบด้วย Google</span><ArrowRight size={20} /></button>
            <div className="my-5 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />หรือบัญชีภาครัฐ<span className="h-px flex-1 bg-slate-200" /></div>
            <div className="grid grid-cols-3 gap-2">{["ThaiD", "ทางรัฐ", "NDID"].map((provider) => <button key={provider} type="button" onClick={loginWithGoogle} className="min-h-11 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:border-blue-700 hover:text-blue-800">{provider}</button>)}</div>
            <p className="mt-5 text-center text-xs leading-5 text-slate-400">เป็น mock authentication เท่านั้น ยังไม่เชื่อม Google OAuth หรือข้อมูลส่วนบุคคลจริง</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export function GovFundMatchApp() {
  const [identity, setIdentity] = useState<IdentityContext | null>(null);
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(["สวัสดีครับ ผมช่วยตรวจสอบเงื่อนไขทุนและเอกสารที่ต้องใช้ได้"]);
  const [idea, setIdea] = useState("");
  const [matching, setMatching] = useState(false);
  const [matched, setMatched] = useState(false);
  const [selectedFund, setSelectedFund] = useState<MatchedFund | null>(null);
  const [templateId, setTemplateId] = useState(fundTemplates[0].id);
  const [readinessChecking, setReadinessChecking] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);
  const [checking, setChecking] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [emailItem, setEmailItem] = useState<ApplicationHistory | null>(null);
  const [form, setForm] = useState({ researcher: "", registrant: "", registration: "", address: "", projectTitle: "ระบบอบแห้งพลังงานแสงอาทิตย์อัจฉริยะ", budget: "2,500,000", summary: "" });

  const selectedTemplate = fundTemplates.find((template) => template.id === templateId) ?? fundTemplates[0];
  const readiness = useMemo(() => {
    const complete = selectedTemplate.requirements.filter((item) => item.status === "complete").length;
    const partial = selectedTemplate.requirements.filter((item) => item.status === "partial").length;
    const missing = selectedTemplate.requirements.filter((item) => item.status === "missing").length;
    const percent = Math.round(((complete + partial * 0.5) / selectedTemplate.requirements.length) * 100);
    return { complete, partial, missing, percent };
  }, [selectedTemplate]);

  if (!identity) {
    return <Landing onLogin={(nextIdentity) => { setIdentity(nextIdentity); setScreen("dashboard"); }} />;
  }

  const navigate = (next: Screen) => { setScreen(next); setMobileMenu(false); setNotificationsOpen(false); };
  const runMatch = () => {
    if (!idea.trim()) return;
    setMatching(true);
    setMatched(false);
    window.setTimeout(() => { setMatching(false); setMatched(true); }, 900);
  };
  const applyFor = (fund: MatchedFund) => {
    setSelectedFund(fund);
    setForm((current) => ({ ...current, summary: idea }));
    navigate("apply");
  };
  const autoFill = () => {
    setForm((current) => ({ ...current, researcher: identity.researcherName, registrant: identity.registrantName, registration: "010555XXXXXXX", address: "88/9 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900" }));
    setAutoFilled(true);
  };
  const submitApplication = () => {
    setChecking(true);
    window.setTimeout(() => { setChecking(false); setAcknowledged(false); setWarningOpen(true); }, 850);
  };
  const confirmSubmission = () => {
    setWarningOpen(false);
    setSuccessOpen(true);
  };
  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((items) => [...items, chatInput.trim(), "ทุนนี้กำหนดให้แนบแผนงบประมาณและหนังสือรับรองนิติบุคคลครับ"]);
    setChatInput("");
  };
  const rerunReadiness = () => {
    setReadinessChecking(true);
    window.setTimeout(() => setReadinessChecking(false), 900);
  };

  const navItems = [
    { id: "dashboard" as Screen, label: "ภาพรวม", icon: Home },
    { id: "readiness" as Screen, label: "ตรวจความพร้อม", icon: ClipboardCheck },
    { id: "search" as Screen, label: "ค้นหาทุน", icon: Search },
    { id: "apply" as Screen, label: "ยื่นขอทุน", icon: FileText },
    { id: "tracking" as Screen, label: "ติดตามสถานะ", icon: FileCheck2 },
  ];
  const pageTitle = { dashboard: "ภาพรวมทุนวิจัย", readiness: "ตรวจสอบความพร้อมในการยื่นขอทุน", search: "AI Smart Match", apply: "ยื่นขอทุน", tracking: "ติดตามสถานะ" }[screen];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {mobileMenu && <button type="button" aria-label="ปิดเมนู" onClick={() => setMobileMenu(false)} className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-blue-950 text-white transition-transform lg:translate-x-0 ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-900"><Landmark size={22} /></div><div><p className="text-lg font-black">Grant+</p><p className="text-xs text-blue-200">ทุนที่ใช่ ไปได้ไกลกว่า</p></div><button type="button" onClick={() => setMobileMenu(false)} className="ml-auto lg:hidden" aria-label="ปิดเมนู"><X /></button></div>
        <nav className="flex-1 space-y-1 p-4" aria-label="เมนูหลัก">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => navigate(id)} className={`flex min-h-12 w-full items-center gap-3 rounded-lg px-4 text-left font-semibold transition ${screen === id ? "bg-white text-blue-950" : "text-blue-100 hover:bg-white/10"}`}><Icon size={20} />{label}</button>)}</nav>
        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-3">
            <div className="flex items-start gap-3"><CircleUserRound className="shrink-0" size={32} /><div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-wide text-cyan-300">ผู้วิจัย</p><p className="truncate text-sm font-bold">{identity.researcherName}</p><p className="truncate text-xs text-blue-200">{identity.institution}</p></div></div>
            <div className="mt-3 border-t border-white/10 pt-3"><p className="text-[11px] font-bold uppercase tracking-wide text-blue-300">ผู้ลงทะเบียน</p><p className="mt-1 truncate text-xs font-semibold">{identity.registrantName}</p></div>
          </div>
          <button type="button" onClick={() => setIdentity(null)} className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-blue-200 hover:bg-white/10"><LogOut size={18} /> ออกจากระบบ</button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => setMobileMenu(true)} className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="เปิดเมนู"><Menu /></button>
          <div><p className="text-xs font-black text-blue-800">GRANT+</p><h1 className="text-lg font-bold sm:text-xl">{pageTitle}</h1></div>
          <div className="relative ml-auto"><button type="button" onClick={() => setNotificationsOpen((open) => !open)} className="relative grid h-11 w-11 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" aria-label="การแจ้งเตือน" aria-expanded={notificationsOpen}><Bell size={21} /><span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-600" /></button>{notificationsOpen && <div className="absolute right-0 mt-2 w-[min(23rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-4 shadow-xl"><div className="flex items-center justify-between"><p className="font-bold">การแจ้งเตือน</p><span className="rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-700">ใหม่</span></div><button type="button" onClick={() => { setEmailItem(applicationHistory[1]); setNotificationsOpen(false); }} className="mt-3 w-full rounded-lg bg-blue-50 p-4 text-left text-sm leading-6 text-slate-700 hover:bg-blue-100"><span className="font-bold text-blue-900">สถานะเปลี่ยนเป็น “ขอเอกสารเพิ่ม”</span><br />ระบบเตรียมอีเมลแจ้งผู้วิจัยและผู้ลงทะเบียนแล้ว</button></div>}</div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {screen === "dashboard" && <div className="mx-auto max-w-7xl">
            <section className="flex flex-col gap-5 border-b border-slate-200 pb-7 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-semibold text-slate-500">วันพฤหัสบดีที่ 24 กันยายน 2569</p><h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">สวัสดี {identity.registrantName}</h2><p className="mt-2 text-slate-600">กำลังจัดทำข้อเสนอให้ <strong>{identity.researcherName}</strong></p></div><button type="button" onClick={() => navigate("search")} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950"><Sparkles size={18} /> เริ่มค้นหาทุน</button></section>
            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{dashboardCards.map(({ label, value, note, icon: Icon, color }) => <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`grid h-10 w-10 place-items-center rounded-lg ${color}`}><Icon size={20} /></div><p className="mt-4 text-sm font-semibold text-slate-500">{label}</p><div className="mt-1 flex items-end justify-between"><span className="text-3xl font-black">{value}</span><span className="text-xs text-slate-400">{note}</span></div></article>)}</section>
            <section className="mt-6 overflow-hidden rounded-xl border border-blue-200 bg-blue-950 text-white shadow-sm"><div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center"><div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/10 text-cyan-300"><ClipboardCheck size={23} /></div><div><h2 className="text-xl font-bold">ตรวจสอบความพร้อมในการยื่นขอทุน</h2><p className="mt-2 max-w-3xl leading-7 text-blue-100">ตรวจว่าข้อเสนอมีหัวข้อและเอกสารครบตามแม่แบบของแหล่งทุนที่เลือก โดยยังไม่ประเมินคุณภาพแนวคิด ความต้องการตลาด หรือความคุ้มค่าโครงการ</p></div></div><button type="button" onClick={() => navigate("readiness")} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 font-bold text-blue-950 hover:bg-blue-50">ตรวจข้อเสนอ <ArrowRight size={18} /></button></div></section>
            <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold text-blue-800">FUNDING CALENDAR</p><h2 className="mt-1 text-xl font-bold">ช่วงเวลารับข้อเสนอ</h2></div><p className="text-xs text-slate-400">บางรายการเป็นรอบตัวอย่างสำหรับ prototype</p></div><div className="mt-6 grid grid-cols-[7.5rem_1fr] gap-y-4 sm:grid-cols-[11rem_1fr]">{timeline.map((item) => <div key={item.agency} className="contents"><div><p className="text-sm font-bold">{item.agency}</p><p className="text-xs text-slate-500">{item.fund}</p></div><div><div className="h-5 rounded-full bg-slate-100"><div className={`h-5 rounded-full ${item.color} ${item.width} ${item.offset}`} /></div><p className="mt-1 text-xs text-slate-500">{item.date}</p></div></div>)}</div></section>
          </div>}

          {screen === "readiness" && <div className="mx-auto max-w-7xl">
            <section className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex items-center gap-2 text-sm font-bold text-blue-800"><ClipboardCheck size={18} /> EVIDENCE-BASED READINESS</div><h2 className="mt-2 text-2xl font-black sm:text-3xl">ตรวจสอบความพร้อมในการยื่นขอทุน</h2><p className="mt-3 max-w-3xl leading-7 text-slate-600">ตรวจเฉพาะว่าข้อเสนอมีเนื้อหาและเอกสารครบตาม content requirement ของแม่แบบแหล่งทุน ยังไม่ให้คะแนน Problem, Desirability, Usability, Feasibility หรือ Viability</p></div><button type="button" onClick={rerunReadiness} disabled={readinessChecking} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950 disabled:bg-blue-500">{readinessChecking ? <LoaderCircle className="animate-spin" size={18} /> : <FileCheck2 size={18} />}{readinessChecking ? "กำลังตรวจแม่แบบ..." : "ตรวจข้อเสนออีกครั้ง"}</button></section>

            <section className="mt-6 grid gap-5 lg:grid-cols-[20rem_1fr]">
              <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><label htmlFor="fund-template" className="text-sm font-bold">เลือกแม่แบบแหล่งทุน</label><div className="relative mt-2"><select id="fund-template" value={templateId} onChange={(event) => setTemplateId(event.target.value)} className="h-12 w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 pr-10 font-semibold outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100">{fundTemplates.map((template) => <option key={template.id} value={template.id}>{template.shortName}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-400" size={20} /></div><div className="mt-5 rounded-xl bg-blue-950 p-5 text-white"><p className="text-sm font-semibold text-blue-200">ความครบของข้อเสนอ</p><p className="mt-2 text-5xl font-black">{readiness.percent}%</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${readiness.percent}%` }} /></div></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className="rounded-lg bg-emerald-50 p-2 text-emerald-700"><strong className="block text-lg">{readiness.complete}</strong>ครบ</div><div className="rounded-lg bg-amber-50 p-2 text-amber-800"><strong className="block text-lg">{readiness.partial}</strong>บางส่วน</div><div className="rounded-lg bg-red-50 p-2 text-red-700"><strong className="block text-lg">{readiness.missing}</strong>ไม่พบ</div></div><button type="button" className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 text-sm font-bold text-slate-600 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800"><UploadCloud size={19} /> อัปโหลดข้อเสนอฉบับใหม่</button><p className="mt-3 text-xs leading-5 text-slate-400">ปุ่มอัปโหลดเป็น mockup และไม่จัดเก็บไฟล์จริง</p></aside>

              <div>
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-bold text-blue-800">{selectedTemplate.agency}</p><h3 className="mt-1 text-xl font-bold">{selectedTemplate.fundName}</h3><p className="mt-1 text-sm text-slate-500">{selectedTemplate.templateVersion}</p></div><a href={selectedTemplate.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 self-start rounded-lg border border-slate-300 px-3 text-sm font-bold text-slate-700 hover:border-blue-700 hover:text-blue-800">ดูแม่แบบต้นทาง <ExternalLink size={16} /></a></div><div className="mt-5 space-y-3">{selectedTemplate.requirements.map((item, index) => { const style = statusStyle(item.status); const StatusIcon = style.icon; return <article key={item.id} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center"><div className={`grid h-10 w-10 place-items-center rounded-full bg-slate-50 ${style.iconClasses}`}><StatusIcon size={20} /></div><div><p className="text-xs font-bold text-slate-400">หัวข้อ {index + 1}</p><h4 className="mt-0.5 font-bold">{item.title}</h4><p className="mt-1 text-sm leading-6 text-slate-500">{item.detail}</p></div><span className={`self-start rounded-full px-3 py-1.5 text-xs font-bold sm:self-center ${style.classes}`}>{style.label}</span></article>; })}</div></section>
                <section className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5"><div className="flex items-start gap-3"><AlertTriangle className="mt-0.5 shrink-0 text-amber-700" size={21} /><div><h3 className="font-bold text-amber-950">ขอบเขตการตรวจในเวอร์ชันนี้</h3><p className="mt-1 text-sm leading-6 text-amber-900">ระบบตรวจว่าพบหัวข้อ/เอกสารหรือไม่ และชี้ส่วนที่มีข้อมูลไม่ครบเท่านั้น ยังไม่ตัดสินคุณภาพ ความเป็นไปได้ ผลกระทบ หรือโอกาสได้รับทุน การยืนยันสุดท้ายต้องใช้ประกาศและแม่แบบล่าสุดของหน่วยงาน</p></div></div></section>
              </div>
            </section>
          </div>}

          {screen === "search" && <div className="mx-auto max-w-5xl"><section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-800 text-white"><Sparkles size={22} /></div><div><h2 className="text-xl font-bold">เล่าไอเดียงานวิจัยให้ AI ช่วยค้นหาทุน</h2><p className="mt-1 text-sm leading-6 text-slate-500">ระบบจะวิเคราะห์หัวข้อ อุตสาหกรรม และเงื่อนไขเบื้องต้นของโครงการ</p></div></div><label className="mt-6 block text-sm font-bold" htmlFor="idea">พิมพ์ไอเดียงานวิจัยของคุณ</label><textarea id="idea" value={idea} onChange={(event) => setIdea(event.target.value)} placeholder="เช่น ต้องการพัฒนาระบบอบแห้งสมุนไพรด้วยพลังงานแสงอาทิตย์สำหรับ SME..." className="mt-2 min-h-40 w-full resize-y rounded-lg border border-slate-300 p-4 leading-7 outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" /><div className="mt-4 flex items-center justify-between gap-4"><p className="text-xs text-slate-400">ข้อมูลนี้ใช้สำหรับการจับคู่ทุนจำลองเท่านั้น</p><button type="button" disabled={!idea.trim() || matching} onClick={runMatch} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950 disabled:cursor-not-allowed disabled:bg-slate-300">{matching ? <LoaderCircle className="animate-spin" size={18} /> : <Sparkles size={18} />}{matching ? "กำลังวิเคราะห์..." : "AI Smart Match"}</button></div></section>{matched && <section className="mt-6"><div className="flex items-end justify-between"><div><p className="text-sm font-bold text-emerald-700">วิเคราะห์สำเร็จ</p><h2 className="mt-1 text-xl font-bold">ทุนที่เหมาะกับโครงการของคุณ</h2></div><span className="text-sm text-slate-500">พบ {matchedFunds.length} รายการ</span></div><div className="mt-4 grid gap-4 md:grid-cols-2">{matchedFunds.map((fund) => <article key={fund.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-800"><Building2 size={20} /></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">{fund.match}% Match</span></div><h3 className="mt-4 text-lg font-bold leading-7">{fund.title}</h3><p className="mt-1 text-sm text-slate-500">{fund.agency}</p><div className="mt-4 flex flex-wrap gap-2">{fund.tags.map((tag) => <span key={tag} className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">#{tag}</span>)}</div><button type="button" onClick={() => applyFor(fund)} className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 font-bold text-white hover:bg-blue-950">ยื่นขอทุนนี้ <ArrowRight size={18} /></button></article>)}</div></section>}</div>}

          {screen === "apply" && <div className="mx-auto max-w-5xl"><div className="mb-6"><p className="text-sm font-bold text-blue-800">ONE-CONTRACT PLATFORM</p><h2 className="mt-1 text-2xl font-black">ใบสมัครขอรับทุนวิจัย</h2><p className="mt-2 text-slate-500">{selectedFund?.title ?? "เลือกทุนจากหน้า AI Smart Match หรือกรอกแบบฟอร์มตัวอย่าง"}</p></div><section className="rounded-xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h3 className="font-bold">1. ผู้วิจัยและผู้ลงทะเบียน</h3><p className="mt-1 text-sm text-slate-500">แยกเจ้าของข้อเสนอจากผู้ดำเนินการในระบบ</p></div><button type="button" onClick={autoFill} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 hover:bg-blue-50"><Sparkles size={18} /> ใช้ข้อมูลจากบัญชี</button></div>{autoFilled && <div className="mx-5 mt-5 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 sm:mx-6"><Check className="mt-0.5 shrink-0" size={18} /><span><strong>เติมข้อมูลสาธิตแล้ว</strong> โดยแสดงทั้งผู้วิจัยและผู้ลงทะเบียนอย่างชัดเจน</span></div>}<div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">{[
                { key: "researcher", label: "ผู้วิจัยเจ้าของข้อเสนอ" },
                { key: "registrant", label: "ผู้ลงทะเบียน/ผู้ประสานงาน" },
                { key: "registration", label: "เลขทะเบียนนิติบุคคล" },
                { key: "address", label: "ที่อยู่หน่วยงาน", wide: true },
              ].map((field) => <label key={field.key} className={`block text-sm font-bold ${field.wide ? "sm:col-span-2" : ""}`}>{field.label}<input value={form[field.key as keyof typeof form]} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} placeholder="กดใช้ข้อมูลจากบัญชี" className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" /></label>)}</div></section><section className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><h3 className="font-bold">2. รายละเอียดโครงการ</h3><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold sm:col-span-2">ชื่อโครงการ<input value={form.projectTitle} onChange={(event) => setForm({ ...form, projectTitle: event.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" /></label><label className="block text-sm font-bold">งบประมาณที่ขอสนับสนุน (บาท)<input value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" /></label><label className="block text-sm font-bold sm:col-span-2">บทสรุปโครงการ<textarea value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} className="mt-2 min-h-32 w-full rounded-lg border border-slate-300 p-4 font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100" /></label><button type="button" className="flex min-h-28 items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-300 text-sm font-bold text-slate-500 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-800 sm:col-span-2"><Paperclip size={20} /> แนบ Proposal และเอกสารตามแม่แบบ (PDF)</button></div></section><div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" className="min-h-11 rounded-lg border border-slate-300 px-5 font-bold text-slate-700 hover:bg-white">บันทึกร่าง</button><button type="button" onClick={submitApplication} disabled={checking} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-6 font-bold text-white hover:bg-blue-950 disabled:bg-blue-600">{checking ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}{checking ? "กำลังตรวจ Semantic Checker..." : "ส่งใบสมัคร"}</button></div></div>}

          {screen === "tracking" && <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-black">ติดตามสถานะการขอทุน</h2><p className="mt-1 text-slate-500">แสดงวันที่แหล่งทุนรับเรื่องและรหัสรับเรื่องแยกตามกองทุน</p></div><p className="text-sm font-semibold text-slate-500">อัปเดตล่าสุด วันนี้ 09:30 น.</p></div><div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[1080px] text-left"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">โครงการ</th><th className="px-5 py-4">แหล่งทุน</th><th className="px-5 py-4">วันที่ยื่น</th><th className="px-5 py-4">กองทุนรับเรื่อง</th><th className="px-5 py-4">รหัสรับเรื่อง</th><th className="px-5 py-4">สถานะ</th><th className="px-5 py-4">อีเมล</th></tr></thead><tbody className="divide-y divide-slate-200">{applicationHistory.map((item) => <tr key={item.id} className="align-top hover:bg-slate-50"><td className="px-5 py-5 font-bold">{item.project}</td><td className="px-5 py-5 text-sm text-slate-600">{item.fund}</td><td className="px-5 py-5 text-sm text-slate-600">{item.submittedDate}</td><td className="px-5 py-5 text-sm font-semibold text-slate-700">{item.receivedDate}</td><td className="px-5 py-5"><code className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-blue-900">{item.receiptCode}</code></td><td className="px-5 py-5"><span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${item.tone === "red" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"}`}><span className={`h-2 w-2 rounded-full ${item.tone === "red" ? "bg-red-500" : "bg-amber-500"}`} />{item.status} ({item.english})</span></td><td className="px-5 py-5"><button type="button" onClick={() => setEmailItem(item)} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-bold text-slate-700 hover:border-blue-700 hover:text-blue-800"><Mail size={16} /> ดูตัวอย่าง</button></td></tr>)}</tbody></table></div></div></div>}
        </main>
      </div>

      <button type="button" onClick={() => setChatOpen((open) => !open)} className="fixed bottom-5 right-5 z-30 flex h-14 items-center gap-2 rounded-full bg-blue-800 px-4 font-bold text-white shadow-xl hover:bg-blue-950" aria-label="เปิดผู้ช่วย AI"><Bot size={23} /><span className="hidden sm:inline">ถาม AI</span></button>
      {chatOpen && <section className="fixed bottom-24 right-4 z-40 flex h-[min(31rem,calc(100vh-8rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"><header className="flex items-center gap-3 bg-blue-900 p-4 text-white"><div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15"><MessageCircle size={20} /></div><div><p className="font-bold">Grant+ AI Assistant</p><p className="text-xs text-blue-200">พร้อมช่วยตรวจเงื่อนไขทุน</p></div><button type="button" onClick={() => setChatOpen(false)} className="ml-auto" aria-label="ปิดแชต"><X size={20} /></button></header><div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">{chatMessages.map((message, index) => <div key={`${message}-${index}`} className={`max-w-[88%] rounded-lg p-3 text-sm leading-6 ${index % 2 === 1 ? "ml-auto bg-blue-800 text-white" : "bg-white text-slate-700 shadow-sm"}`}>{message}</div>)}</div><div className="flex gap-2 border-t border-slate-200 p-3"><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendChat(); }} placeholder="ถามเกี่ยวกับเงื่อนไขทุน..." className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-800" /><button type="button" onClick={sendChat} className="grid h-11 w-11 place-items-center rounded-lg bg-blue-800 text-white" aria-label="ส่งข้อความ"><Send size={18} /></button></div></section>}

      <Dialog.Root open={warningOpen} onOpenChange={setWarningOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-slate-950/55" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="border-b border-amber-200 bg-amber-50 p-6"><div className="grid h-12 w-12 place-items-center rounded-lg bg-amber-100 text-amber-700"><AlertTriangle size={26} /></div><Dialog.Title className="mt-4 text-xl font-black text-amber-950">Semantic Checker Alert</Dialog.Title></div>
            <div className="p-6"><Dialog.Description className="text-lg font-bold leading-8 text-slate-900">ตรวจพบความเสี่ยงการรับทุนซ้ำซ้อน</Dialog.Description><p className="mt-3 leading-7 text-slate-600">ข้อเสนอมีความคล้ายกับโครงการที่เคยได้รับทุนจาก <strong>PMU-B 80%</strong> ระบบจะแจ้งเตือนเพื่อให้ตรวจสอบ แต่ไม่บล็อกการส่งอัตโนมัติ</p><div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600"><strong>คำแนะนำ:</strong> ตรวจสอบขอบเขตงาน งบประมาณ และผลผลิตของโครงการเดิม พร้อมอธิบายความแตกต่างในข้อเสนอ ก่อนยืนยันส่งต่อให้แหล่งทุนพิจารณา</div><label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-blue-800" /><span><strong>ยืนยันว่าตรวจสอบคำเตือนแล้ว</strong><br />ผู้ยื่นรับทราบว่าการยืนยันนี้ไม่ใช่การรับรองว่าไม่ซ้ำซ้อน และแหล่งทุนเป็นผู้พิจารณาขั้นสุดท้าย</span></label><div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Dialog.Close className="min-h-11 rounded-lg border border-slate-300 px-5 font-bold text-slate-700 hover:bg-slate-50">กลับไปแก้ไข</Dialog.Close><button type="button" onClick={confirmSubmission} disabled={!acknowledged} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950 disabled:cursor-not-allowed disabled:bg-slate-300">ยืนยันและส่งต่อ <ArrowRight size={18} /></button></div></div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={successOpen} onOpenChange={setSuccessOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-slate-950/55" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl"><div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle2 size={27} /></div><Dialog.Title className="mt-4 text-2xl font-black">ส่งใบสมัครสำเร็จ</Dialog.Title><Dialog.Description className="mt-3 leading-7 text-slate-600">ระบบยืนยันการส่งหลังผู้สมัครรับทราบคำเตือน Semantic Checker แล้ว และสร้างรายการติดตามสถานะเรียบร้อย</Dialog.Description><button type="button" onClick={() => { setSuccessOpen(false); navigate("tracking"); }} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950">ไปหน้าติดตามสถานะ <ArrowRight size={18} /></button></Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={Boolean(emailItem)} onOpenChange={(open) => { if (!open) setEmailItem(null); }}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-slate-950/55" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-2xl">
            {emailItem && <><header className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 sm:p-6"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-800"><Mail size={22} /></div><div><p className="text-sm font-bold text-blue-800">EMAIL STATUS MOCKUP</p><Dialog.Title className="mt-0.5 text-xl font-black">อีเมลแจ้งการเปลี่ยนสถานะ</Dialog.Title></div></div><Dialog.Close className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="ปิด"><X size={20} /></Dialog.Close></header><div className="p-5 sm:p-6"><div className="space-y-2 border-b border-slate-200 pb-5 text-sm"><p><span className="inline-block w-16 text-slate-400">ถึง</span><strong>{identity.researcherEmail}</strong></p>{identity.role === "coordinator" && <p><span className="inline-block w-16 text-slate-400">สำเนา</span><strong>{identity.registrantEmail}</strong></p>}<p><span className="inline-block w-16 text-slate-400">เรื่อง</span><strong>{emailItem.emailSubject}</strong></p></div><div className="py-6 leading-7 text-slate-700"><p>เรียน {identity.researcherName}</p><p className="mt-4">{emailItem.emailBody}</p><div className="mt-5 rounded-lg bg-slate-50 p-4"><p className="text-sm text-slate-500">รหัสรับเรื่อง</p><p className="mt-1 font-mono font-bold text-blue-900">{emailItem.receiptCode}</p></div><p className="mt-5">ติดตามรายละเอียดเพิ่มเติมได้ที่หน้า “ติดตามสถานะ” ในระบบ Grant+</p><p className="mt-5 text-sm text-slate-500">อีเมลนี้เป็นตัวอย่างสำหรับ prototype และยังไม่ได้ส่งจริง</p></div><div className="flex justify-end border-t border-slate-200 pt-5"><Dialog.Close className="min-h-11 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950">ปิดตัวอย่าง</Dialog.Close></div></div></>}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
