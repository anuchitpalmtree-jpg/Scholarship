"use client";

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { AppMode, IdentityContext } from "@/src/types/govfund";
import type { DemoNotice, IndustryChallenge, WorkspaceHub } from "@/src/types/strategy";

export type StrategySnapshot = {
  challenges: IndustryChallenge[];
  pitches: { challenge: string; text: string; file: string }[];
  interests: { asset: string; company: string; type: string; scope: string }[];
  workspaceChat: { actor: string; text: string }[];
  files: string[];
  milestones: { name: string; amount: number; evidence: string; status: number }[];
  baseline: number;
  currentCost: number;
  units: number;
  attribution: number;
  deadweight: number;
  socialUnits: number;
  evidence: string;
  impactSaved: boolean;
  contractType: string;
  contractScope: string;
  contractSaved: boolean;
};
type HubSession = { hub: WorkspaceHub; identity: IdentityContext; mode: AppMode } | null;
type DemoContext = {
  session: HubSession;
  setSession: Dispatch<SetStateAction<HubSession>>;
  snapshot: Partial<StrategySnapshot>;
  setSnapshot: Dispatch<SetStateAction<Partial<StrategySnapshot>>>;
  notices: DemoNotice[];
  setNotices: Dispatch<SetStateAction<DemoNotice[]>>;
};
const Context = createContext<DemoContext | null>(null);

// In-memory demo records survive logout and client navigation between portals.
// Identity is separate and cleared by logout. Nothing is persisted to browser storage.
export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<HubSession>(null);
  const [snapshot, setSnapshot] = useState<Partial<StrategySnapshot>>({});
  const [notices, setNotices] = useState<DemoNotice[]>([]);
  return <Context.Provider value={{ session, setSession, snapshot, setSnapshot, notices, setNotices }}>{children}</Context.Provider>;
}

export function useDemoSession() {
  const context = useContext(Context);
  if (!context) throw new Error("DemoSessionProvider is required");
  return context;
}
