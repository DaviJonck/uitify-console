import initialLeadsData from "../data/leads.json";
import type { Lead } from "../types/Leads";

export const getLeads = (): Promise<Lead[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialLeadsData as Lead[]);
    }, 1000);
  });
};

export const saveLead = (updatedLead: Lead): Promise<Lead> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.9) {
        return reject(new Error("Simulated API failure!"));
      }
      resolve(updatedLead);
    }, 500);
  });
};
