export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
}

export interface Opportunity {
  id: number;
  name: string;
  accountName: string;
  stage: "Discovery" | "Proposal" | "Negotiation" | "Closed";
  amount?: number;
  originalLeadData: Omit<Lead, "id">;
}
