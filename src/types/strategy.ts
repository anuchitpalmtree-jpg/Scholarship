export type LegacyStrategyScreen = "corporate" | "governance" | "semantic" | "marketplace" | "impact" | "integration" | "collaboration";
export type PortfolioScreen = "funding" | "research-library" | "contracts" | "researchers";
export type StrategyScreen = LegacyStrategyScreen | PortfolioScreen;
export type WorkspaceHub = "funder" | "researcher" | "collaboration";

export type IndustryChallenge = {
  id: string;
  company: string;
  title: string;
  problem: string;
  target: string;
  sector: string;
  expertise: string[];
  budget: number;
  privatePercent: number;
};

export type ResearchRecord = {
  id: string;
  title: string;
  agency: string;
  year: number;
  objective: string;
  method: string;
  population: string;
  output: string;
};

export type SemanticDimension = { key: string; label: string; weight: number; score: number; evidence: string[] };
export type SemanticResult = { record: ResearchRecord; score: number; dimensions: SemanticDimension[]; reasons: string[] };

export type ResearchAsset = {
  id: string;
  title: string;
  owner: string;
  sector: string;
  trl: number;
  ip: string;
  summary: string;
  terms: string;
};

export type DemoNotice = { id: string; title: string; detail: string; challengeId: string; researcher: string };
