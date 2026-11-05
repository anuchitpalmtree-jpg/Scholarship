export type NationalStrategyId = "NS1" | "NS2" | "NS3" | "NS4" | "NS5" | "NS6";
export type ResearchFieldId = "natural" | "engineering" | "health" | "agriculture" | "social" | "humanities";
export type Funder = { id: string; name: string; kind: "public" | "private" };
export type ResearcherProfile = {
  id: string;
  name: string;
  institution: string;
  fieldId: ResearchFieldId;
  expertise: string[];
  lab: string;
  interests: string;
};
export type FundedResearch = {
  id: string;
  title: string;
  funderId: string;
  researcherId: string;
  fieldId: ResearchFieldId;
  fiscalYear: number;
  primaryStrategyId: NationalStrategyId;
  allocatedAmount: number;
  status: "active" | "completed";
  summary: string;
  output: string;
};
export type ContractInstallment = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "pending" | "disbursed";
  paidDate?: string;
  reference?: string;
};
export type GrantContract = {
  id: string;
  number: string;
  projectId: string;
  signedDate: string;
  endDate: string;
  installments: ContractInstallment[];
};
