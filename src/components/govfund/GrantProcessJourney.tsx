import {
  Check,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  Landmark,
  Send,
  Trophy,
  Users,
} from "lucide-react";
import type { AppMode } from "@/src/types/govfund";

const processSteps = [
  {
    title: "กรอกและบันทึกข้อมูล",
    detail: "จัดเก็บข้อมูลใบสมัครและร่างโครงการ",
    icon: ClipboardCheck,
  },
  {
    title: "ส่งต่อแหล่งทุน",
    detail: "จำลองการส่งและออกเลขรับเรื่อง",
    icon: Send,
  },
  {
    title: "ตรวจคุณสมบัติและเอกสาร",
    detail: "จำลองการตรวจโดยเจ้าหน้าที่แหล่งทุน",
    icon: FileCheck2,
  },
  {
    title: "ผู้ทรงคุณวุฒิประเมิน",
    detail: "จำลองการส่งข้อเสนอให้ผู้เชี่ยวชาญ",
    icon: Users,
  },
  {
    title: "คณะกรรมการพิจารณา",
    detail: "จำลองการพิจารณาและจัดลำดับข้อเสนอ",
    icon: Landmark,
  },
  {
    title: "ประกาศผลและทำสัญญา",
    detail: "จำลองผลอนุมัติและขั้นตอนก่อนรับทุน",
    icon: Trophy,
  },
];

export const grantProcessSteps = processSteps;

export function GrantProcessJourney({
  mode,
  currentStage,
  onAdvance,
}: {
  mode: AppMode;
  currentStage: number;
  onAdvance: () => void;
}) {
  return (
    <section className="rounded-xl border border-blue-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-blue-800">
              APPLICATION JOURNEY
            </p>
            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">
              ขั้นตอนหลังบันทึกเป็น Simulation
            </span>
          </div>
          <h2 className="mt-1 text-xl font-black">
            เส้นทางตั้งแต่กรอกข้อมูลถึงประกาศผล
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {mode === "data-entry"
              ? "เฉพาะข้อมูลที่กรอกและบันทึกในฐานข้อมูล Grant+ เป็นข้อมูลจริงของร่างนี้ ส่วนการส่งไปยังแหล่งทุน การพิจารณา และผลลัพธ์ด้านล่างเป็นการจำลอง"
              : "ทุกขั้นตอนและข้อมูลในโหมดนี้เป็นตัวอย่างสำหรับทดลองใช้งาน ไม่ได้ส่งไปยังแหล่งทุนจริง"}
          </p>
        </div>
        <button
          type="button"
          onClick={onAdvance}
          disabled={currentStage >= processSteps.length}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 font-bold text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {currentStage >= processSteps.length
            ? "จำลองครบทุกขั้นตอน"
            : "จำลองขั้นตอนถัดไป"}
          {currentStage < processSteps.length && <ChevronRight size={18} />}
        </button>
      </div>

      <ol className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {processSteps.map((step, index) => {
          const position = index + 1;
          const complete = position < currentStage;
          const current = position === currentStage;
          const Icon = step.icon;
          const isRealDataStep = mode === "data-entry" && index === 0;

          return (
            <li
              key={step.title}
              className={`rounded-xl border p-4 ${
                current
                  ? "border-blue-300 bg-blue-50"
                  : complete
                    ? "border-emerald-200 bg-emerald-50/70"
                    : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                    complete
                      ? "bg-emerald-600 text-white"
                      : current
                        ? "bg-blue-800 text-white"
                        : "bg-white text-slate-400"
                  }`}
                >
                  {complete ? <Check size={19} /> : <Icon size={19} />}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-slate-900">
                      {position}. {step.title}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${isRealDataStep ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"}`}
                    >
                      {isRealDataStep ? "บันทึกจริง" : "Simulation"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {step.detail}
                  </p>
                  {current && (
                    <p className="mt-2 text-xs font-bold text-blue-800">
                      {isRealDataStep
                        ? "ขั้นตอนปัจจุบัน (บันทึกในฐานข้อมูล)"
                        : "ขั้นตอนปัจจุบัน (จำลอง)"}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
