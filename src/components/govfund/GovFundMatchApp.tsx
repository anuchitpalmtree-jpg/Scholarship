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
  Database,
  ExternalLink,
  FileCheck2,
  FileText,
  FlaskConical,
  Home,
  Landmark,
  LoaderCircle,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Paperclip,
  Search,
  Save,
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
import {
  GrantPlusBrand,
  GrantPlusMark,
} from "@/src/components/govfund/GrantPlusBrand";
import {
  GrantProcessJourney,
  grantProcessSteps,
} from "@/src/components/govfund/GrantProcessJourney";
import {
  forgetDevice,
  getRememberedSession,
  GrantApiError,
  loadDatabaseWorkspace,
  loginWithEmail,
  registerProfile,
  saveDatabaseApplication,
  saveDatabaseReviewStage,
} from "@/src/lib/govfund-client";
import type {
  AppMode,
  ApplicationFormData,
  ApplicationHistory,
  IdentityContext,
  LoginRole,
  MatchedFund,
  RequirementItem,
  SavedApplication,
  Screen,
} from "@/src/types/govfund";

const timeline = [
  {
    agency: "NIA",
    fund: "Regional Innovation",
    date: "23 ก.ย. – 31 ต.ค. 2569",
    color: "bg-emerald-500",
    width: "w-[58%]",
    offset: "ml-[12%]",
  },
  {
    agency: "บพค. (PMU-B)",
    fund: "Future Industries",
    date: "รอบตัวอย่าง ก.ย. – พ.ย. 2569",
    color: "bg-blue-700",
    width: "w-[67%]",
    offset: "ml-[18%]",
  },
  {
    agency: "วช. (NRCT)",
    fund: "ทุนวิจัยและนวัตกรรม",
    date: "รอบตัวอย่าง ต.ค. – พ.ย. 2569",
    color: "bg-amber-500",
    width: "w-[54%]",
    offset: "ml-[34%]",
  },
];

const dashboardCards = [
  {
    label: "ทุนที่เปิดรับ",
    value: "12",
    note: "รอบประกาศปัจจุบัน",
    icon: Landmark,
    color: "text-blue-800 bg-blue-50",
  },
  {
    label: "ใกล้ปิดรับ",
    value: "3",
    note: "ภายใน 30 วัน",
    icon: Clock3,
    color: "text-amber-700 bg-amber-50",
  },
  {
    label: "กำลังพิจารณา",
    value: "1",
    note: "รับเรื่องแล้ว",
    icon: FileCheck2,
    color: "text-emerald-700 bg-emerald-50",
  },
  {
    label: "ต้องดำเนินการ",
    value: "1",
    note: "ขอเอกสารเพิ่ม",
    icon: AlertTriangle,
    color: "text-red-700 bg-red-50",
  },
];

const defaultIdentity: IdentityContext = {
  role: "coordinator",
  registrantName: "คุณอรทัย ประสานงานวิจัย",
  registrantEmail: "orathai.demo@university.ac.th",
  researcherName: "รศ. ดร. ณัฐชา สุขเกษม",
  researcherEmail: "natcha.demo@university.ac.th",
  institution: "มหาวิทยาลัยตัวอย่าง",
};

const emptyForm: ApplicationFormData = {
  researcher: "",
  registrant: "",
  registration: "",
  address: "",
  projectTitle: "",
  budget: "",
  summary: "",
  attachmentName: "",
};

const simulationForm: ApplicationFormData = {
  ...emptyForm,
  projectTitle: "ระบบอบแห้งพลังงานแสงอาทิตย์อัจฉริยะ",
  budget: "2,500,000",
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
    return {
      label: "ครบ",
      icon: CheckCircle2,
      classes: "bg-emerald-50 text-emerald-700",
      iconClasses: "text-emerald-600",
    };
  }
  if (status === "partial") {
    return {
      label: "มีบางส่วน",
      icon: AlertTriangle,
      classes: "bg-amber-50 text-amber-800",
      iconClasses: "text-amber-600",
    };
  }
  return {
    label: "ยังไม่พบ",
    icon: X,
    classes: "bg-red-50 text-red-700",
    iconClasses: "text-red-600",
  };
}

function Landing({
  onLogin,
}: {
  onLogin: (identity: IdentityContext, mode: AppMode) => Promise<void>;
}) {
  const [mode, setMode] = useState<AppMode>("simulation");
  const [role, setRole] = useState<LoginRole>("coordinator");
  const [slide, setSlide] = useState(0);
  const [researcherName, setResearcherName] = useState(
    defaultIdentity.researcherName,
  );
  const [researcherEmail, setResearcherEmail] = useState(
    defaultIdentity.researcherEmail,
  );
  const [institution, setInstitution] = useState(defaultIdentity.institution);
  const [registrantName, setRegistrantName] = useState(
    defaultIdentity.registrantName,
  );
  const [registrantEmail, setRegistrantEmail] = useState(
    defaultIdentity.registrantEmail,
  );
  const [rememberedEmail, setRememberedEmail] = useState<string | null>(null);
  const [returningEmail, setReturningEmail] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % publicGrants.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;
    getRememberedSession()
      .then(({ rememberedEmail: email }) => {
        if (!active || !email) return;
        setRememberedEmail(email);
        setReturningEmail(email);
        setMode("data-entry");
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const grant = publicGrants[slide];
  const chooseMode = (nextMode: AppMode) => {
    setMode(nextMode);
    setLoginError("");
    if (nextMode === "simulation") {
      setResearcherName(defaultIdentity.researcherName);
      setResearcherEmail(defaultIdentity.researcherEmail);
      setInstitution(defaultIdentity.institution);
      setRegistrantName(defaultIdentity.registrantName);
      setRegistrantEmail(defaultIdentity.registrantEmail);
      return;
    }
    setResearcherName("");
    setResearcherEmail("");
    setInstitution("");
    setRegistrantName("");
    setRegistrantEmail("");
  };
  const buildIdentity = (): IdentityContext => {
    if (role === "researcher") {
      return {
        role,
        registrantName: researcherName,
        registrantEmail: researcherEmail,
        researcherName,
        researcherEmail,
        institution,
      };
    }
    return {
      role,
      registrantName,
      registrantEmail,
      researcherName,
      researcherEmail,
      institution,
    };
  };

  const loginWithPrimaryAction = async () => {
    setLoginBusy(true);
    setLoginError("");
    try {
      const nextIdentity = buildIdentity();
      if (mode === "data-entry") {
        const result = await registerProfile(nextIdentity);
        setRememberedEmail(result.identity.registrantEmail);
        setReturningEmail(result.identity.registrantEmail);
        await onLogin(result.identity, mode);
      } else {
        await onLogin(nextIdentity, mode);
      }
    } catch (error) {
      setLoginError(
        error instanceof GrantApiError
          ? error.message
          : "ไม่สามารถเข้าใช้งานได้ กรุณาลองใหม่",
      );
    } finally {
      setLoginBusy(false);
    }
  };

  const loginAsReturningUser = async () => {
    setLoginBusy(true);
    setLoginError("");
    try {
      const result = await loginWithEmail(returningEmail);
      await onLogin(result.identity, "data-entry");
    } catch (error) {
      setLoginError(
        error instanceof GrantApiError
          ? error.message
          : "ไม่สามารถเข้าใช้งานได้ กรุณาลองใหม่",
      );
    } finally {
      setLoginBusy(false);
    }
  };

  const forgetRememberedDevice = async () => {
    setLoginBusy(true);
    setLoginError("");
    try {
      await forgetDevice();
      setRememberedEmail(null);
      setReturningEmail("");
    } catch (error) {
      setLoginError(
        error instanceof GrantApiError
          ? error.message
          : "ไม่สามารถลบการจดจำอุปกรณ์ได้",
      );
    } finally {
      setLoginBusy(false);
    }
  };

  const requiredIdentityReady = Boolean(
    researcherName.trim() &&
    researcherEmail.trim() &&
    institution.trim() &&
    (role === "researcher" ||
      (registrantName.trim() && registrantEmail.trim())),
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <GrantPlusBrand size="sm" />
          <div className="hidden items-center gap-2 text-sm font-semibold text-slate-500 sm:flex">
            <ShieldCheck size={18} className="text-blue-800" /> Prototype แบบ 2
            โหมด
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-12">
        <div>
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.16em] text-blue-800">
              ONE-STOP RESEARCH FUNDING
            </p>
            <h1 className="sr-only">Grant+ ทุนที่ใช่ ไปได้ไกลกว่า</h1>
            <GrantPlusBrand size="hero" className="mt-4" />
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              ค้นหาทุน ตรวจความครบของข้อเสนอ ยื่นใบสมัคร
              และติดตามการรับเรื่องของแต่ละแหล่งทุนจากจุดเดียว
            </p>
          </div>

          <section className="mt-8" aria-label="ตัวอย่างทุนที่กำลังเปิดรับ">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-emerald-700">
                  ทุนที่กำลังเปิดรับ
                </p>
                <h2 className="mt-1 text-2xl font-bold">ข่าวสารทุนล่าสุด</h2>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSlide(
                      (slide - 1 + publicGrants.length) % publicGrants.length,
                    )
                  }
                  className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 hover:border-blue-700 hover:text-blue-800"
                  aria-label="ทุนก่อนหน้า"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setSlide((slide + 1) % publicGrants.length)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 hover:border-blue-700 hover:text-blue-800"
                  aria-label="ทุนถัดไป"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <article className="group relative min-h-[31rem] overflow-hidden rounded-2xl bg-blue-950 text-white shadow-xl sm:min-h-[28rem]">
              <Image
                key={grant.image}
                src={grant.image}
                alt={`ภาพประกอบ ${grant.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/75 to-blue-950/15" />
              <div className="relative flex min-h-[31rem] flex-col justify-end p-6 sm:min-h-[28rem] sm:p-8">
                <div className="mb-auto flex flex-wrap items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-white" />{" "}
                    เปิดรับสมัคร
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
                    {grant.deadline}
                  </span>
                </div>
                <p className="text-sm font-bold text-blue-200">
                  {grant.agency}
                </p>
                <h3 className="mt-2 max-w-3xl text-2xl font-black leading-snug sm:text-3xl">
                  {grant.title}
                </h3>
                <p className="mt-3 max-w-3xl leading-7 text-blue-50">
                  {grant.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {grant.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-blue-50 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4 border-t border-white/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    <span className="flex items-center gap-2 font-bold">
                      <CalendarDays size={18} /> {grant.window}
                    </span>
                    <span className="flex items-center gap-2 font-bold">
                      <Users size={18} /> สมัครแล้ว{" "}
                      {grant.applicants.toLocaleString("th-TH")} ราย*
                    </span>
                  </div>
                  <a
                    href={grant.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 font-bold text-blue-950 hover:bg-blue-50"
                  >
                    ดูแหล่งข้อมูล <ExternalLink size={17} />
                  </a>
                </div>
              </div>
            </article>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {publicGrants.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSlide(index)}
                    aria-label={`แสดงทุนที่ ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${slide === index ? "w-8 bg-blue-800" : "w-2.5 bg-slate-300"}`}
                  />
                ))}
              </div>
              <p className="text-right text-xs leading-5 text-slate-500">
                *จำนวนผู้สมัครและรอบที่ระบุว่า “ตัวอย่าง” เป็นข้อมูลจำลอง
                ไม่ใช่ข้อมูลสดจากหน่วยงาน
              </p>
            </div>
          </section>
        </div>

        <aside className="lg:pt-24">
          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7">
            <p className="text-sm font-bold text-blue-800">เลือกวิธีใช้งาน</p>
            <h2 className="mt-1 text-2xl font-black">
              ต้องการทดลองหรือกรอกข้อมูล?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              ทั้งสองโหมดใช้การเข้าสู่ระบบและขั้นตอนพิจารณาแบบจำลอง
              แตกต่างกันที่การกรอกและบันทึกข้อมูล
            </p>

            <div
              className="mt-5 grid gap-3"
              role="radiogroup"
              aria-label="โหมดการใช้งาน"
            >
              <button
                type="button"
                role="radio"
                aria-checked={mode === "simulation"}
                onClick={() => chooseMode("simulation")}
                className={`rounded-xl border p-4 text-left transition ${mode === "simulation" ? "border-blue-700 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 hover:border-blue-300"}`}
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-100 text-violet-700">
                    <FlaskConical size={19} />
                  </span>
                  <span>
                    <strong className="block text-sm text-slate-900">
                      Simulation mode
                    </strong>
                    <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                      ใช้ข้อมูลตัวอย่าง ทดลอง flow ได้ครบ โดยไม่บันทึกข้อมูลจริง
                    </span>
                  </span>
                </span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={mode === "data-entry"}
                onClick={() => chooseMode("data-entry")}
                className={`rounded-xl border p-4 text-left transition ${mode === "data-entry" ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100" : "border-slate-200 hover:border-emerald-300"}`}
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                    <Database size={19} />
                  </span>
                  <span>
                    <strong className="block text-sm text-slate-900">
                      โหมดกรอกและบันทึกข้อมูล
                    </strong>
                    <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                      บันทึกโปรไฟล์และใบสมัครไว้ในฐานข้อมูล Grant+
                    </span>
                  </span>
                </span>
              </button>
            </div>

            {mode === "data-entry" && rememberedEmail && (
              <section className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    className="mt-0.5 shrink-0 text-emerald-700"
                    size={20}
                  />
                  <div>
                    <p className="font-bold text-emerald-950">
                      กลับมาใช้งานต่อ
                    </p>
                    <p className="mt-1 text-xs leading-5 text-emerald-800">
                      อุปกรณ์นี้มี cookie ที่จดจำการเข้าใช้งานไว้
                      กรอกเพียงอีเมลเดิมเพื่อเปิดข้อมูลจากฐานข้อมูล
                    </p>
                  </div>
                </div>
                <label className="mt-4 block text-xs font-bold text-slate-700">
                  อีเมลที่เคยใช้
                  <input
                    type="email"
                    value={returningEmail}
                    onChange={(event) => setReturningEmail(event.target.value)}
                    className="mt-1.5 h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <button
                  type="button"
                  onClick={loginAsReturningUser}
                  disabled={loginBusy || !returningEmail.trim()}
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {loginBusy ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                  เข้าใช้งานด้วยอีเมล
                </button>
                <button
                  type="button"
                  onClick={forgetRememberedDevice}
                  disabled={loginBusy}
                  className="mt-2 min-h-10 w-full text-xs font-bold text-slate-500 hover:text-red-700"
                >
                  ล้างการจดจำบนอุปกรณ์นี้
                </button>
              </section>
            )}

            <div className="mt-6 border-t border-slate-200 pt-5">
              <p className="text-sm font-bold text-blue-800">ข้อมูลผู้ใช้งาน</p>
              <h3 className="mt-1 text-lg font-black">
                {mode === "data-entry" && rememberedEmail
                  ? "หรือใช้ข้อมูลชุดใหม่"
                  : "ใครเป็นผู้ลงทะเบียน?"}
              </h3>
            </div>

            <div
              className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5"
              role="radiogroup"
              aria-label="บทบาทผู้เข้าสู่ระบบ"
            >
              <button
                type="button"
                role="radio"
                aria-checked={role === "researcher"}
                onClick={() => setRole("researcher")}
                className={`min-h-16 rounded-lg px-3 text-left text-sm font-bold transition ${role === "researcher" ? "bg-white text-blue-900 shadow-sm" : "text-slate-500"}`}
              >
                <UserRound className="mb-1" size={19} />
                ผู้วิจัยยื่นเอง
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={role === "coordinator"}
                onClick={() => setRole("coordinator")}
                className={`min-h-16 rounded-lg px-3 text-left text-sm font-bold transition ${role === "coordinator" ? "bg-white text-blue-900 shadow-sm" : "text-slate-500"}`}
              >
                <UserCheck className="mb-1" size={19} />
                ลงทะเบียนแทน
              </button>
            </div>

            <div className="mt-5 space-y-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <div>
                <p className="text-sm font-bold text-blue-950">
                  ข้อมูลสำหรับแบบฟอร์ม
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-700">
                  {mode === "data-entry"
                    ? "ครั้งแรกกรอกข้อมูลให้ครบ ระบบจะบันทึกโปรไฟล์ในฐานข้อมูลและจดจำอุปกรณ์นี้ 30 วัน"
                    : "ข้อมูลตัวอย่างนี้ใช้สำหรับทดลอง flow เท่านั้น"}
                </p>
              </div>
              {role === "coordinator" && (
                <>
                  <label className="block text-xs font-bold text-slate-700">
                    ชื่อผู้ลงทะเบียน/ผู้ประสานงาน
                    <input
                      value={registrantName}
                      onChange={(event) =>
                        setRegistrantName(event.target.value)
                      }
                      className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <label className="block text-xs font-bold text-slate-700">
                    อีเมลผู้ลงทะเบียน
                    <input
                      type="email"
                      value={registrantEmail}
                      onChange={(event) =>
                        setRegistrantEmail(event.target.value)
                      }
                      className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                </>
              )}
              <label className="block text-xs font-bold text-slate-700">
                ชื่อผู้วิจัย
                <input
                  value={researcherName}
                  onChange={(event) => setResearcherName(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                อีเมลผู้วิจัย
                <input
                  type="email"
                  value={researcherEmail}
                  onChange={(event) => setResearcherEmail(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                หน่วยงาน/สถาบัน
                <input
                  value={institution}
                  onChange={(event) => setInstitution(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            {loginError && (
              <p
                role="alert"
                className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700"
              >
                {loginError}
              </p>
            )}
            <button
              type="button"
              onClick={loginWithPrimaryAction}
              disabled={loginBusy || !requiredIdentityReady}
              className="mt-6 flex min-h-14 w-full items-center justify-between rounded-xl bg-[#1E3A8A] px-5 text-left font-bold text-white shadow-sm transition hover:bg-blue-950 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <span className="flex items-center gap-3">
                {mode === "data-entry" ? (
                  <Database size={25} />
                ) : (
                  <GoogleMark />
                )}
                {mode === "data-entry"
                  ? "บันทึกโปรไฟล์และเข้าใช้งาน"
                  : "เข้าสู่ระบบด้วย Google"}
              </span>
              {loginBusy ? (
                <LoaderCircle className="animate-spin" size={20} />
              ) : (
                <ArrowRight size={20} />
              )}
            </button>
            {mode === "simulation" && (
              <>
                <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
                  <span className="h-px flex-1 bg-slate-200" />
                  หรือบัญชีภาครัฐ
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["ThaiD", "ทางรัฐ", "NDID"].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={loginWithPrimaryAction}
                      disabled={loginBusy || !requiredIdentityReady}
                      className="min-h-11 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:border-blue-700 hover:text-blue-800 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </>
            )}
            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              {mode === "data-entry"
                ? "โปรไฟล์และใบสมัครจะบันทึกในฐานข้อมูล ส่วนการยืนยันตัวตนกับหน่วยงานภายนอกยังเป็น Simulation จึงไม่ควรใช้ข้อมูลส่วนบุคคลอ่อนไหว"
                : "การเข้าสู่ระบบเป็น mock authentication เท่านั้น ยังไม่เชื่อม Google OAuth หรือหน่วยงานภายนอก"}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export function GovFundMatchApp() {
  const [identity, setIdentity] = useState<IdentityContext | null>(null);
  const [appMode, setAppMode] = useState<AppMode>("simulation");
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    "สวัสดีครับ ผมช่วยตรวจสอบเงื่อนไขทุนและเอกสารที่ต้องใช้ได้",
  ]);
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
  const [form, setForm] = useState<ApplicationFormData>(simulationForm);
  const [savedApplications, setSavedApplications] = useState<
    SavedApplication[]
  >([]);
  const [reviewStage, setReviewStage] = useState(1);
  const [draftMessage, setDraftMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [databaseBusy, setDatabaseBusy] = useState(false);

  const selectedTemplate =
    fundTemplates.find((template) => template.id === templateId) ??
    fundTemplates[0];
  const readiness = useMemo(() => {
    const complete = selectedTemplate.requirements.filter(
      (item) => item.status === "complete",
    ).length;
    const partial = selectedTemplate.requirements.filter(
      (item) => item.status === "partial",
    ).length;
    const missing = selectedTemplate.requirements.filter(
      (item) => item.status === "missing",
    ).length;
    const percent = Math.round(
      ((complete + partial * 0.5) / selectedTemplate.requirements.length) * 100,
    );
    return { complete, partial, missing, percent };
  }, [selectedTemplate]);

  const savedHistory = useMemo<ApplicationHistory[]>(
    () =>
      savedApplications.map((item) => {
        const submitted = item.submittedAt
          ? new Date(item.submittedAt)
          : new Date(item.savedAt);
        const itemStage = item.reviewStage ?? reviewStage;
        const stage =
          grantProcessSteps[Math.min(itemStage, grantProcessSteps.length) - 1];
        return {
          id: item.id,
          project: item.form.projectTitle || "ร่างโครงการที่ยังไม่ระบุชื่อ",
          fund: item.fundName,
          submittedDate: item.submittedAt
            ? submitted.toLocaleDateString("th-TH", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "ยังไม่ได้ส่ง (บันทึกร่าง)",
          receivedDate: item.submittedAt ? "จำลองการรับเรื่องทันที" : "—",
          receiptCode: item.receiptCode ?? "DRAFT",
          status: item.submittedAt ? stage.title : "บันทึกร่างแล้ว",
          english: item.submittedAt ? "Simulated process" : "Saved in database",
          tone: item.submittedAt ? "blue" : "green",
          emailSubject: `[Grant+] ${item.submittedAt ? "อัปเดตสถานะจำลอง" : "บันทึกร่างแล้ว"} – ${item.form.projectTitle || "โครงการของคุณ"}`,
          emailBody: item.submittedAt
            ? `ระบบกำลังแสดงขั้นตอน “${stage.title}” แบบจำลอง ข้อมูลนี้ไม่ได้มาจากแหล่งทุนจริง`
            : "ระบบบันทึกร่างใบสมัครไว้ในฐานข้อมูล Grant+ แล้ว และยังไม่ได้ส่งไปยังแหล่งทุน",
          isSimulated: Boolean(item.submittedAt),
          source: "saved",
        };
      }),
    [reviewStage, savedApplications],
  );

  const trackingItems =
    appMode === "simulation"
      ? [...savedHistory, ...applicationHistory]
      : savedHistory;

  if (!identity) {
    return (
      <Landing
        onLogin={async (nextIdentity, mode) => {
          let workspace = null;
          if (mode === "data-entry") workspace = await loadDatabaseWorkspace();
          setAppMode(mode);
          setIdentity(nextIdentity);
          setScreen("dashboard");
          setDraftMessage("");
          setValidationMessage("");
          if (mode === "data-entry") {
            const applications = workspace?.applications ?? [];
            const latestDraft = applications.find((item) => !item.submittedAt);
            setForm(latestDraft?.form ?? emptyForm);
            setSavedApplications(applications);
            setReviewStage(workspace?.reviewStage ?? 1);
          } else {
            setForm(simulationForm);
            setSavedApplications([]);
            setReviewStage(1);
          }
        }}
      />
    );
  }

  const navigate = (next: Screen) => {
    setScreen(next);
    setMobileMenu(false);
    setNotificationsOpen(false);
  };
  const runMatch = () => {
    if (!idea.trim()) return;
    setMatching(true);
    setMatched(false);
    window.setTimeout(() => {
      setMatching(false);
      setMatched(true);
    }, 900);
  };
  const applyFor = (fund: MatchedFund) => {
    setSelectedFund(fund);
    setForm((current) => ({ ...current, summary: idea }));
    navigate("apply");
  };
  const autoFill = () => {
    setForm((current) => ({
      ...current,
      researcher: identity.researcherName,
      registrant: identity.registrantName,
      registration:
        appMode === "simulation" ? "010555XXXXXXX" : current.registration,
      address:
        appMode === "simulation"
          ? "88/9 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900"
          : current.address,
    }));
    setAutoFilled(true);
  };
  const handleSaveDraft = async () => {
    setValidationMessage("");
    setDraftMessage("");
    const savedAt = new Date().toISOString();
    const existingDraft = savedApplications.find((item) => !item.submittedAt);
    const draft: SavedApplication = {
      id: existingDraft?.id ?? `DRAFT-${Date.now()}`,
      form,
      fundName: selectedFund?.title ?? "ยังไม่ได้เลือกแหล่งทุน",
      savedAt,
      reviewStage: 1,
    };
    if (appMode === "data-entry") {
      setDatabaseBusy(true);
      try {
        const { application } = await saveDatabaseApplication(draft);
        setSavedApplications((items) => [
          application,
          ...items.filter((item) => item.id !== application.id),
        ]);
        setDraftMessage(
          `บันทึกร่างลงฐานข้อมูลแล้ว เวลา ${new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })} น.`,
        );
      } catch (error) {
        setValidationMessage(
          error instanceof GrantApiError
            ? error.message
            : "ไม่สามารถบันทึกร่างลงฐานข้อมูลได้",
        );
      } finally {
        setDatabaseBusy(false);
      }
      return;
    }
    setSavedApplications((items) => [
      draft,
      ...items.filter((item) => item.id !== draft.id),
    ]);
    setDraftMessage(
      "จำลองการบันทึกร่างแล้ว ข้อมูลจะไม่ถูกเก็บเมื่อออกจากหน้านี้",
    );
  };
  const submitApplication = () => {
    if (
      !form.researcher.trim() ||
      !form.projectTitle.trim() ||
      !form.budget.trim() ||
      !form.summary.trim()
    ) {
      setValidationMessage(
        "กรุณากรอกชื่อผู้วิจัย ชื่อโครงการ งบประมาณ และบทสรุปโครงการก่อนส่ง",
      );
      return;
    }
    setValidationMessage("");
    setChecking(true);
    window.setTimeout(() => {
      setChecking(false);
      setAcknowledged(false);
      setWarningOpen(true);
    }, 850);
  };
  const confirmSubmission = async () => {
    const submittedAt = new Date().toISOString();
    const existingDraft = savedApplications.find((item) => !item.submittedAt);
    const saved: SavedApplication = {
      id: existingDraft?.id ?? `GF-${Date.now()}`,
      form,
      fundName: selectedFund?.title ?? "ทุนที่เลือกในระบบ Grant+",
      savedAt: submittedAt,
      submittedAt,
      receiptCode: `SIM-${Date.now().toString().slice(-8)}`,
      reviewStage: 2,
    };
    if (appMode === "data-entry") {
      setDatabaseBusy(true);
      try {
        const { application } = await saveDatabaseApplication(saved);
        setSavedApplications((items) => [
          application,
          ...items.filter((item) => item.id !== application.id),
        ]);
        setReviewStage(2);
      } catch (error) {
        setValidationMessage(
          error instanceof GrantApiError
            ? error.message
            : "ไม่สามารถบันทึกใบสมัครลงฐานข้อมูลได้",
        );
        setWarningOpen(false);
        setDatabaseBusy(false);
        return;
      }
      setDatabaseBusy(false);
    } else {
      setSavedApplications((items) => [saved, ...items]);
      setReviewStage(2);
    }
    setWarningOpen(false);
    setSuccessOpen(true);
  };
  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((items) => [
      ...items,
      chatInput.trim(),
      "ทุนนี้กำหนดให้แนบแผนงบประมาณและหนังสือรับรองนิติบุคคลครับ",
    ]);
    setChatInput("");
  };
  const rerunReadiness = () => {
    setReadinessChecking(true);
    window.setTimeout(() => setReadinessChecking(false), 900);
  };
  const advanceReview = async () => {
    const next = Math.min(reviewStage + 1, grantProcessSteps.length);
    if (appMode === "data-entry") {
      const submittedApplication = savedApplications.find(
        (item) => item.submittedAt,
      );
      if (!submittedApplication) {
        setValidationMessage(
          "กรุณายืนยันส่งใบสมัครจำลองก่อนเลื่อนขั้นตอนการพิจารณา",
        );
        return;
      }
      setDatabaseBusy(true);
      try {
        await saveDatabaseReviewStage(submittedApplication.id, next);
        setSavedApplications((items) =>
          items.map((item) =>
            item.id === submittedApplication.id
              ? { ...item, reviewStage: next }
              : item,
          ),
        );
      } catch (error) {
        setValidationMessage(
          error instanceof GrantApiError
            ? error.message
            : "ไม่สามารถบันทึกขั้นตอนการพิจารณาได้",
        );
        setDatabaseBusy(false);
        return;
      }
      setDatabaseBusy(false);
    }
    setReviewStage(next);
  };

  const navItems = [
    { id: "dashboard" as Screen, label: "ภาพรวม", icon: Home },
    { id: "readiness" as Screen, label: "ตรวจความพร้อม", icon: ClipboardCheck },
    { id: "search" as Screen, label: "ค้นหาทุน", icon: Search },
    { id: "apply" as Screen, label: "ยื่นขอทุน", icon: FileText },
    { id: "tracking" as Screen, label: "ติดตามสถานะ", icon: FileCheck2 },
  ];
  const pageTitle = {
    dashboard: "ภาพรวมทุนวิจัย",
    readiness: "ตรวจสอบความพร้อมในการยื่นขอทุน",
    search: "AI Smart Match",
    apply: "ยื่นขอทุน",
    tracking: "ติดตามสถานะ",
  }[screen];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {mobileMenu && (
        <button
          type="button"
          aria-label="ปิดเมนู"
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-blue-950 text-white transition-transform lg:translate-x-0 ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center border-b border-white/10 px-5">
          <GrantPlusBrand size="sm" theme="dark" />
          <button
            type="button"
            onClick={() => setMobileMenu(false)}
            className="ml-auto lg:hidden"
            aria-label="ปิดเมนู"
          >
            <X />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-4" aria-label="เมนูหลัก">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              className={`flex min-h-12 w-full items-center gap-3 rounded-lg px-4 text-left font-semibold transition ${screen === id ? "bg-white text-blue-950" : "text-blue-100 hover:bg-white/10"}`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div
            className={`mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${appMode === "data-entry" ? "bg-emerald-400/15 text-emerald-200" : "bg-violet-400/15 text-violet-200"}`}
          >
            {appMode === "data-entry" ? (
              <Database size={16} />
            ) : (
              <FlaskConical size={16} />
            )}
            {appMode === "data-entry"
              ? "โหมดกรอกและบันทึกข้อมูล"
              : "Simulation mode"}
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="flex items-start gap-3">
              <CircleUserRound className="shrink-0" size={32} />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-cyan-300">
                  ผู้วิจัย
                </p>
                <p className="truncate text-sm font-bold">
                  {identity.researcherName}
                </p>
                <p className="truncate text-xs text-blue-200">
                  {identity.institution}
                </p>
              </div>
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-blue-300">
                ผู้ลงทะเบียน
              </p>
              <p className="mt-1 truncate text-xs font-semibold">
                {identity.registrantName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIdentity(null)}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-blue-200 hover:bg-white/10"
          >
            <LogOut size={18} />
            {appMode === "data-entry"
              ? "ออกจากระบบ (จำอุปกรณ์ไว้)"
              : "ออกจากระบบ"}
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMobileMenu(true)}
            className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="เปิดเมนู"
          >
            <Menu />
          </button>
          <div className="flex min-w-0 items-center gap-3">
            <GrantPlusMark className="h-10 w-10 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-black tracking-tight text-blue-900">
                  Grant<span className="text-cyan-600">+</span>
                </p>
                <span className="hidden text-xs font-semibold text-slate-400 xl:inline">
                  ทุนที่ใช่ ไปได้ไกลกว่า
                </span>
              </div>
              <h1 className="truncate text-base font-bold sm:text-xl">
                {pageTitle}
              </h1>
            </div>
          </div>
          <div className="relative ml-auto flex items-center gap-2">
            <span
              className={`hidden rounded-full px-3 py-1.5 text-xs font-bold sm:inline-flex ${appMode === "data-entry" ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"}`}
            >
              {appMode === "data-entry" ? "เชื่อมฐานข้อมูลแล้ว" : "Simulation"}
            </span>
            <button
              type="button"
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative grid h-11 w-11 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="การแจ้งเตือน"
              aria-expanded={notificationsOpen}
            >
              <Bell size={21} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-600" />
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-11 mt-2 w-[min(23rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <p className="font-bold">การแจ้งเตือน</p>
                  <span className="rounded-full bg-violet-50 px-2 py-1 text-xs font-bold text-violet-700">
                    Simulation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmailItem(applicationHistory[1]);
                    setNotificationsOpen(false);
                  }}
                  className="mt-3 w-full rounded-lg bg-blue-50 p-4 text-left text-sm leading-6 text-slate-700 hover:bg-blue-100"
                >
                  <span className="font-bold text-blue-900">
                    ตัวอย่างสถานะ “ขอเอกสารเพิ่ม”
                  </span>
                  <br />
                  จำลองอีเมลแจ้งผู้วิจัยและผู้ลงทะเบียน
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {screen === "dashboard" && (
            <div className="mx-auto max-w-7xl">
              <section className="flex flex-col gap-5 border-b border-slate-200 pb-7 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    วันพฤหัสบดีที่ 24 กันยายน 2569
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
                    สวัสดี {identity.registrantName}
                  </h2>
                  <p className="mt-2 text-slate-600">
                    กำลังจัดทำข้อเสนอให้{" "}
                    <strong>{identity.researcherName}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("search")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950"
                >
                  <Sparkles size={18} /> เริ่มค้นหาทุน
                </button>
              </section>
              <section
                className={`mt-6 rounded-xl border p-5 ${appMode === "data-entry" ? "border-emerald-200 bg-emerald-50" : "border-violet-200 bg-violet-50"}`}
              >
                <div className="flex items-start gap-3">
                  {appMode === "data-entry" ? (
                    <Database
                      className="mt-0.5 shrink-0 text-emerald-700"
                      size={21}
                    />
                  ) : (
                    <FlaskConical
                      className="mt-0.5 shrink-0 text-violet-700"
                      size={21}
                    />
                  )}
                  <div>
                    <h2
                      className={`font-bold ${appMode === "data-entry" ? "text-emerald-950" : "text-violet-950"}`}
                    >
                      {appMode === "data-entry"
                        ? "กำลังใช้โหมดกรอกและบันทึกข้อมูล"
                        : "กำลังใช้ Simulation mode"}
                    </h2>
                    <p
                      className={`mt-1 text-sm leading-6 ${appMode === "data-entry" ? "text-emerald-800" : "text-violet-800"}`}
                    >
                      {appMode === "data-entry"
                        ? "โปรไฟล์ ร่าง และใบสมัครบันทึกในฐานข้อมูล Grant+ พร้อม cookie จดจำอุปกรณ์ 30 วัน ส่วน AI การยืนยันตัวตนภายนอก การส่งให้แหล่งทุน การพิจารณา และการแจ้งผลยังเป็น Simulation"
                        : "ข้อมูลและผลลัพธ์ทั้งหมดเป็นตัวอย่าง ระบบจะไม่บันทึกข้อมูลจริงหรือส่งข้อมูลออกไปยังแหล่งทุน"}
                    </p>
                  </div>
                </div>
              </section>
              <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dashboardCards.map(
                  ({ label, value, note, icon: Icon, color }) => (
                    <article
                      key={label}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div
                        className={`grid h-10 w-10 place-items-center rounded-lg ${color}`}
                      >
                        <Icon size={20} />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-500">
                        {label}
                      </p>
                      <div className="mt-1 flex items-end justify-between">
                        <span className="text-3xl font-black">{value}</span>
                        <span className="text-xs text-slate-400">{note}</span>
                      </div>
                    </article>
                  ),
                )}
              </section>
              <section className="mt-6 overflow-hidden rounded-xl border border-blue-200 bg-blue-950 text-white shadow-sm">
                <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/10 text-cyan-300">
                      <ClipboardCheck size={23} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        ตรวจสอบความพร้อมในการยื่นขอทุน
                      </h2>
                      <p className="mt-2 max-w-3xl leading-7 text-blue-100">
                        ตรวจว่าข้อเสนอมีหัวข้อและเอกสารครบตามแม่แบบของแหล่งทุนที่เลือก
                        โดยยังไม่ประเมินคุณภาพแนวคิด ความต้องการตลาด
                        หรือความคุ้มค่าโครงการ
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("readiness")}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 font-bold text-blue-950 hover:bg-blue-50"
                  >
                    ตรวจข้อเสนอ <ArrowRight size={18} />
                  </button>
                </div>
              </section>
              <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-blue-800">
                      FUNDING CALENDAR
                    </p>
                    <h2 className="mt-1 text-xl font-bold">
                      ช่วงเวลารับข้อเสนอ
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    บางรายการเป็นรอบตัวอย่างสำหรับ prototype
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-[7.5rem_1fr] gap-y-4 sm:grid-cols-[11rem_1fr]">
                  {timeline.map((item) => (
                    <div key={item.agency} className="contents">
                      <div>
                        <p className="text-sm font-bold">{item.agency}</p>
                        <p className="text-xs text-slate-500">{item.fund}</p>
                      </div>
                      <div>
                        <div className="h-5 rounded-full bg-slate-100">
                          <div
                            className={`h-5 rounded-full ${item.color} ${item.width} ${item.offset}`}
                          />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {screen === "readiness" && (
            <div className="mx-auto max-w-7xl">
              <section className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-800">
                    <ClipboardCheck size={18} /> EVIDENCE-BASED READINESS
                  </div>
                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    ตรวจสอบความพร้อมในการยื่นขอทุน
                  </h2>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                    ตรวจเฉพาะว่าข้อเสนอมีเนื้อหาและเอกสารครบตาม content
                    requirement ของแม่แบบแหล่งทุน ยังไม่ให้คะแนน Problem,
                    Desirability, Usability, Feasibility หรือ Viability
                  </p>
                </div>
                <button
                  type="button"
                  onClick={rerunReadiness}
                  disabled={readinessChecking}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950 disabled:bg-blue-500"
                >
                  {readinessChecking ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <FileCheck2 size={18} />
                  )}
                  {readinessChecking
                    ? "กำลังตรวจแม่แบบ..."
                    : "ตรวจข้อเสนออีกครั้ง"}
                </button>
              </section>

              <section className="mt-6 grid gap-5 lg:grid-cols-[20rem_1fr]">
                <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <label htmlFor="fund-template" className="text-sm font-bold">
                    เลือกแม่แบบแหล่งทุน
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="fund-template"
                      value={templateId}
                      onChange={(event) => setTemplateId(event.target.value)}
                      className="h-12 w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 pr-10 font-semibold outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                    >
                      {fundTemplates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.shortName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                      size={20}
                    />
                  </div>
                  <div className="mt-5 rounded-xl bg-blue-950 p-5 text-white">
                    <p className="text-sm font-semibold text-blue-200">
                      ความครบของข้อเสนอ
                    </p>
                    <p className="mt-2 text-5xl font-black">
                      {readiness.percent}%
                    </p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
                      <div
                        className="h-full rounded-full bg-cyan-400 transition-all"
                        style={{ width: `${readiness.percent}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                      <strong className="block text-lg">
                        {readiness.complete}
                      </strong>
                      ครบ
                    </div>
                    <div className="rounded-lg bg-amber-50 p-2 text-amber-800">
                      <strong className="block text-lg">
                        {readiness.partial}
                      </strong>
                      บางส่วน
                    </div>
                    <div className="rounded-lg bg-red-50 p-2 text-red-700">
                      <strong className="block text-lg">
                        {readiness.missing}
                      </strong>
                      ไม่พบ
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 text-sm font-bold text-slate-600 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800"
                  >
                    <UploadCloud size={19} /> อัปโหลดข้อเสนอฉบับใหม่
                  </button>
                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    ปุ่มอัปโหลดเป็น mockup และไม่จัดเก็บไฟล์จริง
                  </p>
                </aside>

                <div>
                  <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-bold text-blue-800">
                          {selectedTemplate.agency}
                        </p>
                        <h3 className="mt-1 text-xl font-bold">
                          {selectedTemplate.fundName}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {selectedTemplate.templateVersion}
                        </p>
                      </div>
                      <a
                        href={selectedTemplate.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-10 items-center gap-2 self-start rounded-lg border border-slate-300 px-3 text-sm font-bold text-slate-700 hover:border-blue-700 hover:text-blue-800"
                      >
                        ดูแม่แบบต้นทาง <ExternalLink size={16} />
                      </a>
                    </div>
                    <div className="mt-5 space-y-3">
                      {selectedTemplate.requirements.map((item, index) => {
                        const style = statusStyle(item.status);
                        const StatusIcon = style.icon;
                        return (
                          <article
                            key={item.id}
                            className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center"
                          >
                            <div
                              className={`grid h-10 w-10 place-items-center rounded-full bg-slate-50 ${style.iconClasses}`}
                            >
                              <StatusIcon size={20} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400">
                                หัวข้อ {index + 1}
                              </p>
                              <h4 className="mt-0.5 font-bold">{item.title}</h4>
                              <p className="mt-1 text-sm leading-6 text-slate-500">
                                {item.detail}
                              </p>
                            </div>
                            <span
                              className={`self-start rounded-full px-3 py-1.5 text-xs font-bold sm:self-center ${style.classes}`}
                            >
                              {style.label}
                            </span>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                  <section className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className="mt-0.5 shrink-0 text-amber-700"
                        size={21}
                      />
                      <div>
                        <h3 className="font-bold text-amber-950">
                          ขอบเขตการตรวจในเวอร์ชันนี้
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-amber-900">
                          ระบบตรวจว่าพบหัวข้อ/เอกสารหรือไม่
                          และชี้ส่วนที่มีข้อมูลไม่ครบเท่านั้น ยังไม่ตัดสินคุณภาพ
                          ความเป็นไปได้ ผลกระทบ หรือโอกาสได้รับทุน
                          การยืนยันสุดท้ายต้องใช้ประกาศและแม่แบบล่าสุดของหน่วยงาน
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          )}

          {screen === "search" && (
            <div className="mx-auto max-w-5xl">
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-800 text-white">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      เล่าไอเดียงานวิจัยให้ AI ช่วยค้นหาทุน
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      ระบบจะวิเคราะห์หัวข้อ อุตสาหกรรม
                      และเงื่อนไขเบื้องต้นของโครงการ
                    </p>
                  </div>
                </div>
                <label className="mt-6 block text-sm font-bold" htmlFor="idea">
                  พิมพ์ไอเดียงานวิจัยของคุณ
                </label>
                <textarea
                  id="idea"
                  value={idea}
                  onChange={(event) => setIdea(event.target.value)}
                  placeholder="เช่น ต้องการพัฒนาระบบอบแห้งสมุนไพรด้วยพลังงานแสงอาทิตย์สำหรับ SME..."
                  className="mt-2 min-h-40 w-full resize-y rounded-lg border border-slate-300 p-4 leading-7 outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                />
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">
                    ข้อมูลนี้ใช้สำหรับการจับคู่ทุนจำลองเท่านั้น
                  </p>
                  <button
                    type="button"
                    disabled={!idea.trim() || matching}
                    onClick={runMatch}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {matching ? (
                      <LoaderCircle className="animate-spin" size={18} />
                    ) : (
                      <Sparkles size={18} />
                    )}
                    {matching ? "กำลังวิเคราะห์..." : "AI Smart Match"}
                  </button>
                </div>
              </section>
              {matched && (
                <section className="mt-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm font-bold text-emerald-700">
                        วิเคราะห์สำเร็จ
                      </p>
                      <h2 className="mt-1 text-xl font-bold">
                        ทุนที่เหมาะกับโครงการของคุณ
                      </h2>
                    </div>
                    <span className="text-sm text-slate-500">
                      พบ {matchedFunds.length} รายการ
                    </span>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {matchedFunds.map((fund) => (
                      <article
                        key={fund.id}
                        className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-800">
                            <Building2 size={20} />
                          </div>
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                            {fund.match}% Match
                          </span>
                        </div>
                        <h3 className="mt-4 text-lg font-bold leading-7">
                          {fund.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {fund.agency}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {fund.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => applyFor(fund)}
                          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 font-bold text-white hover:bg-blue-950"
                        >
                          ยื่นขอทุนนี้ <ArrowRight size={18} />
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {screen === "apply" && (
            <div className="mx-auto max-w-5xl">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-blue-800">
                    APPLICATION FORM
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${appMode === "data-entry" ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"}`}
                  >
                    {appMode === "data-entry"
                      ? "บันทึกลงฐานข้อมูล"
                      : "Simulation"}
                  </span>
                </div>
                <h2 className="mt-1 text-2xl font-black">
                  ใบสมัครขอรับทุนวิจัย
                </h2>
                <p className="mt-2 text-slate-500">
                  {selectedFund?.title ??
                    (appMode === "data-entry"
                      ? "กรอกข้อมูลโครงการของคุณเพื่อบันทึกเป็นร่าง"
                      : "เลือกทุนจากหน้า AI Smart Match หรือกรอกแบบฟอร์มตัวอย่าง")}
                </p>
              </div>
              <section
                className={`mb-5 rounded-xl border p-4 ${appMode === "data-entry" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-violet-200 bg-violet-50 text-violet-900"}`}
              >
                <div className="flex items-start gap-3">
                  {appMode === "data-entry" ? (
                    <Database className="mt-0.5 shrink-0" size={20} />
                  ) : (
                    <FlaskConical className="mt-0.5 shrink-0" size={20} />
                  )}
                  <p className="text-sm leading-6">
                    {appMode === "data-entry" ? (
                      <>
                        <strong>ส่วนกรอกและบันทึกเชื่อมฐานข้อมูลแล้ว</strong>{" "}
                        โปรไฟล์และใบสมัครเปิดต่อได้จากอุปกรณ์ที่จดจำไว้
                        ส่วนการส่งต่อและผลพิจารณายังคงเป็น Simulation
                      </>
                    ) : (
                      <>
                        <strong>ข้อมูลตัวอย่างทั้งหมด</strong> ใช้ทดลอง flow
                        และจะไม่ถูกบันทึกถาวร
                      </>
                    )}
                  </p>
                </div>
              </section>
              <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div>
                    <h3 className="font-bold">1. ผู้วิจัยและผู้ลงทะเบียน</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      แยกเจ้าของข้อเสนอจากผู้ดำเนินการในระบบ
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={autoFill}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 hover:bg-blue-50"
                  >
                    <Sparkles size={18} /> ใช้ข้อมูลจากบัญชี
                  </button>
                </div>
                {autoFilled && (
                  <div className="mx-5 mt-5 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 sm:mx-6">
                    <Check className="mt-0.5 shrink-0" size={18} />
                    <span>
                      <strong>
                        {appMode === "data-entry"
                          ? "นำข้อมูลที่กรอกตอนเข้าใช้งานมาแล้ว"
                          : "เติมข้อมูลสาธิตแล้ว"}
                      </strong>{" "}
                      โดยแสดงทั้งผู้วิจัยและผู้ลงทะเบียนอย่างชัดเจน
                    </span>
                  </div>
                )}
                <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                  {[
                    { key: "researcher", label: "ผู้วิจัยเจ้าของข้อเสนอ" },
                    { key: "registrant", label: "ผู้ลงทะเบียน/ผู้ประสานงาน" },
                    { key: "registration", label: "เลขทะเบียนนิติบุคคล" },
                    { key: "address", label: "ที่อยู่หน่วยงาน", wide: true },
                  ].map((field) => (
                    <label
                      key={field.key}
                      className={`block text-sm font-bold ${field.wide ? "sm:col-span-2" : ""}`}
                    >
                      {field.label}
                      <input
                        value={form[field.key as keyof ApplicationFormData]}
                        onChange={(event) =>
                          setForm({ ...form, [field.key]: event.target.value })
                        }
                        placeholder={
                          field.key === "registration" ||
                          field.key === "address"
                            ? "กรอกข้อมูล"
                            : "กดใช้ข้อมูลจากบัญชี"
                        }
                        className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                      />
                    </label>
                  ))}
                </div>
              </section>
              <section className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="font-bold">2. รายละเอียดโครงการ</h3>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-bold sm:col-span-2">
                    ชื่อโครงการ <span className="text-red-600">*</span>
                    <input
                      value={form.projectTitle}
                      onChange={(event) =>
                        setForm({ ...form, projectTitle: event.target.value })
                      }
                      placeholder="ชื่อโครงการภาษาไทย"
                      className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <label className="block text-sm font-bold">
                    งบประมาณที่ขอสนับสนุน (บาท){" "}
                    <span className="text-red-600">*</span>
                    <input
                      inputMode="decimal"
                      value={form.budget}
                      onChange={(event) =>
                        setForm({ ...form, budget: event.target.value })
                      }
                      placeholder="เช่น 2500000"
                      className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <label className="block text-sm font-bold sm:col-span-2">
                    บทสรุปโครงการ <span className="text-red-600">*</span>
                    <textarea
                      value={form.summary}
                      onChange={(event) =>
                        setForm({ ...form, summary: event.target.value })
                      }
                      placeholder="อธิบายที่มา วัตถุประสงค์ วิธีดำเนินงาน และผลลัพธ์ที่คาดหวัง"
                      className="mt-2 min-h-32 w-full rounded-lg border border-slate-300 p-4 font-normal outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 text-center text-sm font-bold text-slate-500 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-800 sm:col-span-2">
                    <Paperclip size={20} />
                    <span>
                      {form.attachmentName ||
                        "เลือก Proposal หรือเอกสารประกอบ (PDF)"}
                    </span>
                    <span className="text-xs font-normal text-slate-400">
                      ระบบเก็บเฉพาะชื่อไฟล์เพื่อแสดงในร่าง ยังไม่อัปโหลดไฟล์จริง
                    </span>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="sr-only"
                      onChange={(event) =>
                        setForm({
                          ...form,
                          attachmentName: event.target.files?.[0]?.name ?? "",
                        })
                      }
                    />
                  </label>
                </div>
              </section>
              {validationMessage && (
                <div
                  role="alert"
                  className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700"
                >
                  {validationMessage}
                </div>
              )}
              {draftMessage && (
                <div
                  role="status"
                  className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800"
                >
                  {draftMessage}
                </div>
              )}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={databaseBusy}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 font-bold text-slate-700 hover:border-blue-700 hover:text-blue-800"
                >
                  {databaseBusy ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  {appMode === "data-entry"
                    ? "บันทึกร่างลงฐานข้อมูล"
                    : "จำลองการบันทึกร่าง"}
                </button>
                <button
                  type="button"
                  onClick={submitApplication}
                  disabled={checking}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-6 font-bold text-white hover:bg-blue-950 disabled:bg-blue-600"
                >
                  {checking ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                  {checking
                    ? "กำลังตรวจ Semantic Checker..."
                    : "ส่งใบสมัคร (Simulation)"}
                </button>
              </div>
            </div>
          )}

          {screen === "tracking" && (
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-black">ติดตามสถานะการขอทุน</h2>
                    <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">
                      กระบวนการพิจารณาเป็น Simulation
                    </span>
                  </div>
                  <p className="mt-1 text-slate-500">
                    ดูข้อมูลที่บันทึกและทดลองเดินกระบวนการหลังยื่นจนถึงประกาศผล
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  ขั้นตอนที่ {reviewStage} จาก {grantProcessSteps.length}
                </p>
              </div>
              <div className="mt-6">
                <GrantProcessJourney
                  mode={appMode}
                  currentStage={reviewStage}
                  onAdvance={advanceReview}
                />
              </div>
              <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {trackingItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-500">
                      <FileText size={22} />
                    </div>
                    <h3 className="mt-4 font-bold">ยังไม่มีใบสมัครที่บันทึก</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      ไปที่หน้า “ยื่นขอทุน” เพื่อกรอกและบันทึกร่าง
                      ใบสมัครจะปรากฏที่นี่
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate("apply")}
                      className="mt-5 min-h-11 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950"
                    >
                      เริ่มกรอกใบสมัคร
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1120px] text-left">
                      <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                        <tr>
                          <th className="px-5 py-4">โครงการ</th>
                          <th className="px-5 py-4">แหล่งทุน</th>
                          <th className="px-5 py-4">วันที่ยื่น</th>
                          <th className="px-5 py-4">การรับเรื่อง</th>
                          <th className="px-5 py-4">รหัสอ้างอิง</th>
                          <th className="px-5 py-4">สถานะ</th>
                          <th className="px-5 py-4">รายละเอียด</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {trackingItems.map((item) => (
                          <tr
                            key={item.id}
                            className="align-top hover:bg-slate-50"
                          >
                            <td className="px-5 py-5">
                              <p className="font-bold">{item.project}</p>
                              {item.source === "saved" && (
                                <span
                                  className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-black ${appMode === "data-entry" ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"}`}
                                >
                                  {appMode === "data-entry"
                                    ? "ข้อมูลในฐานข้อมูล"
                                    : "ข้อมูลจำลอง"}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-5 text-sm text-slate-600">
                              {item.fund}
                            </td>
                            <td className="px-5 py-5 text-sm text-slate-600">
                              {item.submittedDate}
                            </td>
                            <td className="px-5 py-5 text-sm font-semibold text-slate-700">
                              {item.receivedDate}
                            </td>
                            <td className="px-5 py-5">
                              <code className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-blue-900">
                                {item.receiptCode}
                              </code>
                            </td>
                            <td className="px-5 py-5">
                              <span
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${item.tone === "red" ? "bg-red-50 text-red-700" : item.tone === "green" ? "bg-emerald-50 text-emerald-700" : item.tone === "blue" ? "bg-blue-50 text-blue-800" : "bg-amber-50 text-amber-800"}`}
                              >
                                <span
                                  className={`h-2 w-2 rounded-full ${item.tone === "red" ? "bg-red-500" : item.tone === "green" ? "bg-emerald-500" : item.tone === "blue" ? "bg-blue-600" : "bg-amber-500"}`}
                                />
                                {item.status} ({item.english})
                              </span>
                            </td>
                            <td className="px-5 py-5">
                              <button
                                type="button"
                                onClick={() => setEmailItem(item)}
                                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-bold text-slate-700 hover:border-blue-700 hover:text-blue-800"
                              >
                                <Mail size={16} /> ดูตัวอย่าง
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <button
        type="button"
        onClick={() => setChatOpen((open) => !open)}
        className="fixed bottom-5 right-5 z-30 flex h-14 items-center gap-2 rounded-full bg-blue-800 px-4 font-bold text-white shadow-xl hover:bg-blue-950"
        aria-label="เปิดผู้ช่วย AI"
      >
        <Bot size={23} />
        <span className="hidden sm:inline">ถาม AI</span>
      </button>
      {chatOpen && (
        <section className="fixed bottom-24 right-4 z-40 flex h-[min(31rem,calc(100vh-8rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center gap-3 bg-blue-900 p-4 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="font-bold">Grant+ AI Assistant</p>
              <p className="text-xs text-blue-200">พร้อมช่วยตรวจเงื่อนไขทุน</p>
            </div>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="ml-auto"
              aria-label="ปิดแชต"
            >
              <X size={20} />
            </button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {chatMessages.map((message, index) => (
              <div
                key={`${message}-${index}`}
                className={`max-w-[88%] rounded-lg p-3 text-sm leading-6 ${index % 2 === 1 ? "ml-auto bg-blue-800 text-white" : "bg-white text-slate-700 shadow-sm"}`}
              >
                {message}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-slate-200 p-3">
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendChat();
              }}
              placeholder="ถามเกี่ยวกับเงื่อนไขทุน..."
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-800"
            />
            <button
              type="button"
              onClick={sendChat}
              className="grid h-11 w-11 place-items-center rounded-lg bg-blue-800 text-white"
              aria-label="ส่งข้อความ"
            >
              <Send size={18} />
            </button>
          </div>
        </section>
      )}

      <Dialog.Root open={warningOpen} onOpenChange={setWarningOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-slate-950/55" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="border-b border-amber-200 bg-amber-50 p-6">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-amber-100 text-amber-700">
                <AlertTriangle size={26} />
              </div>
              <Dialog.Title className="mt-4 text-xl font-black text-amber-950">
                Semantic Checker Alert
              </Dialog.Title>
            </div>
            <div className="p-6">
              <Dialog.Description className="text-lg font-bold leading-8 text-slate-900">
                ตรวจพบความเสี่ยงการรับทุนซ้ำซ้อน
              </Dialog.Description>
              <p className="mt-3 leading-7 text-slate-600">
                ข้อเสนอมีความคล้ายกับโครงการที่เคยได้รับทุนจาก{" "}
                <strong>PMU-B 80%</strong> ระบบจะแจ้งเตือนเพื่อให้ตรวจสอบ
                แต่ไม่บล็อกการส่งอัตโนมัติ
              </p>
              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <strong>คำแนะนำ:</strong> ตรวจสอบขอบเขตงาน งบประมาณ
                และผลผลิตของโครงการเดิม พร้อมอธิบายความแตกต่างในข้อเสนอ
                ก่อนยืนยันส่งต่อให้แหล่งทุนพิจารณา
              </div>
              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(event) => setAcknowledged(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-blue-800"
                />
                <span>
                  <strong>ยืนยันว่าตรวจสอบคำเตือนแล้ว</strong>
                  <br />
                  ผู้ยื่นรับทราบว่าการยืนยันนี้ไม่ใช่การรับรองว่าไม่ซ้ำซ้อน
                  และแหล่งทุนเป็นผู้พิจารณาขั้นสุดท้าย
                </span>
              </label>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Dialog.Close className="min-h-11 rounded-lg border border-slate-300 px-5 font-bold text-slate-700 hover:bg-slate-50">
                  กลับไปแก้ไข
                </Dialog.Close>
                <button
                  type="button"
                  onClick={confirmSubmission}
                  disabled={!acknowledged || databaseBusy}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {databaseBusy ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                  ยืนยันและส่งต่อ
                </button>
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={successOpen} onOpenChange={setSuccessOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-slate-950/55" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <CheckCircle2 size={27} />
            </div>
            <span className="mt-4 inline-flex rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">
              SIMULATION
            </span>
            <Dialog.Title className="mt-2 text-2xl font-black">
              จำลองการส่งใบสมัครสำเร็จ
            </Dialog.Title>
            <Dialog.Description className="mt-3 leading-7 text-slate-600">
              {appMode === "data-entry"
                ? "ระบบบันทึกข้อมูลใบสมัครไว้ในฐานข้อมูล Grant+ แล้ว และจำลองการส่งต่อกับการสร้างเลขรับเรื่อง ข้อมูลยังไม่ได้ส่งไปยังแหล่งทุนจริง"
                : "ระบบจำลองการส่งหลังผู้สมัครรับทราบคำเตือน Semantic Checker และสร้างรายการติดตามตัวอย่างเรียบร้อย"}
            </Dialog.Description>
            <button
              type="button"
              onClick={() => {
                setSuccessOpen(false);
                navigate("tracking");
              }}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950"
            >
              ดูเส้นทางการพิจารณา <ArrowRight size={18} />
            </button>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        open={Boolean(emailItem)}
        onOpenChange={(open) => {
          if (!open) setEmailItem(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-slate-950/55" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-2xl">
            {emailItem && (
              <>
                <header className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-800">
                      <Mail size={22} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-violet-700">
                        EMAIL STATUS SIMULATION
                      </p>
                      <Dialog.Title className="mt-0.5 text-xl font-black">
                        ตัวอย่างอีเมลแจ้งสถานะ
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    aria-label="ปิด"
                  >
                    <X size={20} />
                  </Dialog.Close>
                </header>
                <div className="p-5 sm:p-6">
                  <div className="mb-5 rounded-lg border border-violet-200 bg-violet-50 p-4 text-sm leading-6 text-violet-900">
                    <strong>Simulation:</strong>{" "}
                    ระบบแสดงข้อความที่ควรส่งในขั้นตอนนี้
                    แต่ยังไม่ได้เชื่อมบริการอีเมลหรือแหล่งทุนจริง
                  </div>
                  <div className="space-y-2 border-b border-slate-200 pb-5 text-sm">
                    <p>
                      <span className="inline-block w-16 text-slate-400">
                        ถึง
                      </span>
                      <strong>{identity.researcherEmail}</strong>
                    </p>
                    {identity.role === "coordinator" && (
                      <p>
                        <span className="inline-block w-16 text-slate-400">
                          สำเนา
                        </span>
                        <strong>{identity.registrantEmail}</strong>
                      </p>
                    )}
                    <p>
                      <span className="inline-block w-16 text-slate-400">
                        เรื่อง
                      </span>
                      <strong>{emailItem.emailSubject}</strong>
                    </p>
                  </div>
                  <div className="py-6 leading-7 text-slate-700">
                    <p>เรียน {identity.researcherName}</p>
                    <p className="mt-4">{emailItem.emailBody}</p>
                    <div className="mt-5 rounded-lg bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">รหัสอ้างอิง</p>
                      <p className="mt-1 font-mono font-bold text-blue-900">
                        {emailItem.receiptCode}
                      </p>
                    </div>
                    <p className="mt-5">
                      ติดตามรายละเอียดเพิ่มเติมได้ที่หน้า “ติดตามสถานะ” ในระบบ
                      Grant+
                    </p>
                    <p className="mt-5 text-sm font-semibold text-violet-700">
                      อีเมลนี้เป็นตัวอย่างและยังไม่ได้ส่งจริง
                    </p>
                  </div>
                  <div className="flex justify-end border-t border-slate-200 pt-5">
                    <Dialog.Close className="min-h-11 rounded-lg bg-blue-800 px-5 font-bold text-white hover:bg-blue-950">
                      ปิดตัวอย่าง
                    </Dialog.Close>
                  </div>
                </div>
              </>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
