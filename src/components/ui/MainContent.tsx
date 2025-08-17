import { useLeads } from "../../hooks/useLeads";

import Input from "./input";
import Select from "./Select";
import Button from "./Button";

import LeadList from "../leads/LeadList/LeadList";
import OpportunityList from "../OpportunityList/OpportunityList";
import LeadDetailPanel from "../leads/LeadsDetailPanel/LeadsDetailPanel";

function MainContent() {
  const {
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
    handleUpdateOpportunity,
  } = useLeads();

  return (
    <main className="flex-1 lg:overflow-hidden">
      <div className="h-full p-4 lg:p-6 lg:overflow-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 h-full lg:overflow-hidden">
          <div className="bg-white rounded-lg shadow flex flex-col min-h-0 lg:overflow-hidden h-[calc(100vh-200px)] lg:h-auto">
            <div className="p-3 lg:p-4 border-b flex-shrink-0">
              <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                Leads
              </h2>
              <div className="mt-3 lg:mt-4 flex flex-col gap-3 lg:gap-4">
                <Input
                  type="text"
                  placeholder="Search by name or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Unqualified">Unqualified</option>
                  </Select>
                  <Button
                    variant="secondary"
                    onClick={toggleSortOrder}
                    className="whitespace-nowrap"
                  >
                    Score {sortOrder === "desc" ? "↓" : "↑"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Loading leads...
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">{error}</div>
              ) : (
                <LeadList
                  leads={filteredLeads}
                  onSelectLead={handleSelectLead}
                  selectedLeadId={selectedLead?.id || null}
                />
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow flex flex-col min-h-0 lg:overflow-hidden lg:h-auto">
            <OpportunityList
              opportunities={opportunities}
              onUnconvert={handleUnconvertOpportunity}
              onUpdateOpportunity={handleUpdateOpportunity}
            />
          </div>
        </div>
      </div>

      <LeadDetailPanel
        lead={selectedLead}
        onClose={handleClosePanel}
        onSave={handleSaveLead}
        onConvert={handleConvertLead}
      />
    </main>
  );
}

export default MainContent;
