import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grant+ ทุนที่ใช่ ไปได้ไกลกว่า",
  description:
    "ต้นแบบศูนย์รวมทุนวิจัยสำหรับค้นหาทุน ตรวจความครบของข้อเสนอ ยื่นใบสมัคร และติดตามสถานะ",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="app-root">{children}</div>
      </body>
    </html>
  );
}
