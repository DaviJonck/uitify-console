import type { Opportunity } from "../types/Leads";

export const getOpportunities = async (): Promise<Opportunity[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [] as Opportunity[];
};

export const saveOpportunity = async (
  opportunity: Opportunity
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  console.log("Saving opportunity:", opportunity);
};

export const deleteOpportunity = async (id: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  console.log("Deleting opportunity:", id);
};
