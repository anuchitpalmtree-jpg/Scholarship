"use client";
import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
type AdminSession = { entered: boolean; setEntered: Dispatch<SetStateAction<boolean>>; email: string; setEmail: Dispatch<SetStateAction<string>> };
const Context = createContext<AdminSession | null>(null);
export function AdminSessionProvider({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [email, setEmail] = useState("admin.demo@example.org");
  return <Context.Provider value={{ entered, setEntered, email, setEmail }}>{children}</Context.Provider>;
}
export function useAdminSession() {
  const context = useContext(Context);
  if (!context) throw new Error("AdminSessionProvider is required");
  return context;
}
