export type Screen = "dashboard" | "readiness" | "search" | "apply" | "tracking";

export type LoginRole = "researcher" | "coordinator";

export type IdentityContext = {
  role: LoginRole;
  registrantName: string;
  registrantEmail: string;
  researcherName: string;
  researcherEmail: string;
  institution: string;
};

export type PublicGrant = {
  id: string;
  title: string;
  agency: string;
  summary: string;
  window: string;
  deadline: string;
  applicants: number;
  applicantLabel: string;
  image: string;
  tags: string[];
  sourceUrl: string;
  sourceLabel: string;
};

export type MatchedFund = {
  id: number;
  title: string;
  agency: string;
  match: number;
  tags: string[];
};

export type RequirementItem = {
  id: string;
  title: string;
  detail: string;
  status: "complete" | "partial" | "missing";
};

export type FundTemplate = {
  id: string;
  shortName: string;
  fundName: string;
  agency: string;
  templateVersion: string;
  sourceUrl: string;
  requirements: RequirementItem[];
};

export type ApplicationStatusTone = "amber" | "red" | "green" | "blue";

export type ApplicationHistory = {
  id: string;
  project: string;
  fund: string;
  submittedDate: string;
  receivedDate: string;
  receiptCode: string;
  status: string;
  english: string;
  tone: ApplicationStatusTone;
  emailSubject: string;
  emailBody: string;
};
