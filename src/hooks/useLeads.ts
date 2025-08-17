import { useState, useEffect, useMemo, useCallback } from "react";
import { getLeads, saveLead } from "../services/LeadService";
import type { Lead, Opportunity } from "../types/Leads";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const data = await getLeads();
        setLeads(data);
      } catch (err) {
        setError("Failed to load leads data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return leads
      .filter(
        (lead) =>
          (lead.name
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
            lead.company
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())) &&
          (statusFilter === "All" || lead.status === statusFilter)
      )
      .sort((a, b) =>
        sortOrder === "desc" ? b.score - a.score : a.score - b.score
      );
  }, [leads, debouncedSearchTerm, statusFilter, sortOrder]);

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === selectedLeadId) || null,
    [leads, selectedLeadId]
  );

  const handleSelectLead = useCallback(
    (id: number) => setSelectedLeadId(id),
    []
  );
  const handleClosePanel = useCallback(() => setSelectedLeadId(null), []);
  const toggleSortOrder = useCallback(
    () => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc")),
    []
  );

  const handleSaveLead = useCallback(
    async (updatedLead: Lead) => {
      try {
        await saveLead(updatedLead);
        setLeads((prev) =>
          prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
        );
        handleClosePanel();
      } catch (error) {
        console.error("Failed to save lead:", error);
        throw error;
      }
    },
    [handleClosePanel]
  );

  const handleConvertLead = (leadToConvert: Lead) => {
    const { ...originalLeadData } = leadToConvert;
    const newOpportunity: Opportunity = {
      id: Date.now(),
      name: `${leadToConvert.name}'s Opportunity`,
      accountName: leadToConvert.company,
      stage: "Discovery",
      originalLeadData: originalLeadData,
    };
    setOpportunities((prev) => [...prev, newOpportunity]);
    setLeads((prev) => prev.filter((lead) => lead.id !== leadToConvert.id));
    handleClosePanel();
  };

  const handleUnconvertOpportunity = (idToUnconvert: number) => {
    const opportunityToUnconvert = opportunities.find(
      (opp) => opp.id === idToUnconvert
    );
    if (!opportunityToUnconvert) return;

    const newLead: Lead = {
      id: Date.now(),
      ...opportunityToUnconvert.originalLeadData,
    };

    setLeads((prev) => [...prev, newLead]);
    setOpportunities((prev) => prev.filter((opp) => opp.id !== idToUnconvert));
  };

  return {
    leads,
    filteredLeads,
    opportunities,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOrder,
    toggleSortOrder,
    selectedLead,
    handleSelectLead,
    handleClosePanel,
    handleSaveLead,
    handleConvertLead,
    handleUnconvertOpportunity,
  };
};
