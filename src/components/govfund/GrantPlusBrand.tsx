type GrantPlusBrandProps = {
  size?: "sm" | "md" | "hero";
  theme?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
};

export function GrantPlusMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="สัญลักษณ์ Grant+"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="17" fill="#1E3A8A" />
      <path d="M14 47.5h36" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" opacity=".55" />
      <rect x="15" y="36" width="8" height="12" rx="4" fill="white" />
      <rect x="27" y="28" width="8" height="20" rx="4" fill="white" />
      <rect x="39" y="20" width="8" height="28" rx="4" fill="white" />
      <path d="M16 30c8.1-8.3 16.1-11.8 27.6-12.2" stroke="#67E8F9" strokeWidth="4" strokeLinecap="round" />
      <path d="m39.5 13.7 6.7 3.7-5.8 5" fill="none" stroke="#67E8F9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 10v10M45 15h10" stroke="white" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

export function GrantPlusBrand({
  size = "md",
  theme = "light",
  showTagline = true,
  className = "",
}: GrantPlusBrandProps) {
  const isDark = theme === "dark";
  const markSize = size === "hero" ? "h-20 w-20 sm:h-24 sm:w-24" : size === "md" ? "h-14 w-14" : "h-11 w-11";
  const nameSize = size === "hero" ? "text-5xl sm:text-6xl" : size === "md" ? "text-3xl" : "text-xl";
  const taglineSize = size === "hero" ? "mt-1.5 text-base sm:text-lg" : size === "md" ? "mt-1 text-sm" : "text-xs";

  return (
    <div className={`inline-flex items-center gap-3 ${size === "hero" ? "sm:gap-5" : ""} ${className}`}>
      <GrantPlusMark className={`${markSize} shrink-0 drop-shadow-sm`} />
      <div className="min-w-0">
        <div className={`${nameSize} font-black leading-none tracking-[-0.05em] ${isDark ? "text-white" : "text-[#102A68]"}`}>
          Grant<span className={isDark ? "text-cyan-300" : "text-cyan-600"}>+</span>
        </div>
        {showTagline && <p className={`${taglineSize} whitespace-nowrap font-bold tracking-tight ${isDark ? "text-blue-200" : "text-slate-600"}`}>ทุนที่ใช่ ไปได้ไกลกว่า</p>}
      </div>
    </div>
  );
}
