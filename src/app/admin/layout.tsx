import { AdminSessionProvider } from "@/src/components/govfund/AdminSessionProvider";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminSessionProvider>{children}</AdminSessionProvider>;
}
