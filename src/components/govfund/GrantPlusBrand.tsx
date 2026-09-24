import Image from "next/image";

type GrantPlusBrandProps = {
  size?: "sm" | "md" | "hero";
  theme?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
};

export function GrantPlusMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="โลโก้ Grant+ นักวิจัยพร้อมเอกสารทุนและประกายไอเดีย"
      className={`relative inline-block overflow-hidden rounded-[24%] bg-white ring-1 ring-blue-100/80 ${className}`}
    >
      <Image
        src="/grant-plus-researcher-logo.png"
        alt=""
        fill
        sizes="(max-width: 640px) 112px, 144px"
        className="object-contain"
      />
    </span>
  );
}

export function GrantPlusBrand({
  size = "md",
  theme = "light",
  showTagline = true,
  className = "",
}: GrantPlusBrandProps) {
  const isDark = theme === "dark";
  const markSize = size === "hero" ? "h-28 w-28 sm:h-36 sm:w-36" : size === "md" ? "h-16 w-16" : "h-12 w-12";
  const nameSize = size === "hero" ? "text-4xl sm:text-6xl" : size === "md" ? "text-3xl" : "text-xl";
  const taglineSize = size === "hero" ? "mt-1.5 text-base sm:text-lg" : size === "md" ? "mt-1 text-sm" : "text-xs";

  return (
    <div className={`inline-flex items-center gap-3 ${size === "hero" ? "sm:gap-5" : ""} ${className}`}>
      <GrantPlusMark className={`${markSize} shrink-0 shadow-sm`} />
      <div className="min-w-0">
        <div className={`${nameSize} font-black leading-none tracking-[-0.05em] ${isDark ? "text-white" : "text-[#102A68]"}`}>
          Grant<span className={isDark ? "text-cyan-300" : "text-cyan-600"}>+</span>
        </div>
        {showTagline && <p className={`${taglineSize} whitespace-nowrap font-bold tracking-tight ${isDark ? "text-blue-200" : "text-slate-600"}`}>ทุนที่ใช่ ไปได้ไกลกว่า</p>}
      </div>
    </div>
  );
}
