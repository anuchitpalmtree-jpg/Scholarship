import type { Screen } from "@/src/types/govfund";
import type { WorkspaceHub } from "@/src/types/strategy";
import { FunderDashboard } from "./FunderDashboard";
import { ResearchLibrary } from "./ResearchLibrary";
import { GrantContracts } from "./GrantContracts";
import { ResearcherDirectory } from "./ResearcherDirectory";

export function PortfolioWorkspace({hub,screen}:{hub:WorkspaceHub;screen:Screen}){
  if(hub==="funder"){
    if(screen==="funding")return <FunderDashboard/>;
    if(screen==="research-library")return <ResearchLibrary/>;
    if(screen==="contracts")return <GrantContracts/>;
  }
  if(hub==="researcher"&&screen==="researchers")return <ResearcherDirectory/>;
  return null;
}
