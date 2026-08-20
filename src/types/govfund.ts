export type GovFundScreen = "landing" | "dashboard" | "apply" | "status";

export type ApplicantProfile = {
  name: string;
  company: string;
  registrationNo: string;
  address: string;
};

export type Fund = {
  id: number;
  title: string;
  matchScore: number;
  tags: string[];
  agency: string;
};

export type ApplicationStatusTone = "amber" | "red" | "green" | "blue";

export type SubmittedApplication = {
  title: string;
  fund: string;
  status: string;
  tone: ApplicationStatusTone;
  date: string;
  progress: number;
};

export type GovFundDemoData = {
  user: ApplicantProfile;
  funds: Fund[];
  applications: SubmittedApplication[];
};
