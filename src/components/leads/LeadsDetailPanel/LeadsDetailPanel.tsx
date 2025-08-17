import { useEffect, useState } from "react";

import type { Lead, Opportunity } from "../../../types/Leads";

import Input from "../../ui/input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

interface LeadDetailPanelProps {
  lead: Lead | null;
  onClose: () => void;
  onSave: (updatedLead: Lead) => Promise<void>;
  onConvert: (lead: Lead, opportunityData: Partial<Opportunity>) => void;
}

function LeadDetailPanel({
  lead,
  onClose,
  onSave,
  onConvert,
}: LeadDetailPanelProps) {
  const [formData, setFormData] = useState<Partial<Lead>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [opportunityData, setOpportunityData] = useState<Partial<Opportunity>>({
    name: "",
    stage: "Discovery",
    amount: undefined,
  });

  useEffect(() => {
    if (lead) {
      setFormData({ email: lead.email, status: lead.status });
      setOpportunityData({
        name: `${lead.name}'s Opportunity`,
        stage: "Discovery",
        amount: undefined,
      });
      setError(null);
    }
  }, [lead]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpportunityInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOpportunityData((prev) => ({
      ...prev,
      [name]:
        name === "amount" ? (value ? parseFloat(value) : undefined) : value,
    }));
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = async () => {
    if (!lead) return;
    if (formData.email && !validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      await onSave({ ...lead, ...formData } as Lead);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleConvertClick = () => {
    setShowConvertModal(true);
  };

  const handleConvertConfirm = () => {
    if (!lead) return;
    onConvert(lead, opportunityData);
    setShowConvertModal(false);
  };

  const handleConvertCancel = () => {
    setShowConvertModal(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 transition-all duration-300
          ${
            lead
              ? " bg-opacity-90 backdrop-blur-sm"
              : "bg-transparent pointer-events-none"
          }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40
          ${lead ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {lead && (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold truncate">{lead.name}</h2>
              <button
                onClick={onClose}
                className="text-2xl leading-none text-gray-500 hover:text-gray-800 flex-shrink-0 ml-4"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-6 flex-grow overflow-y-auto">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <Select
                  id="status"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleInputChange}
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Unqualified</option>
                </Select>
              </div>
              <div className="text-sm text-gray-500 space-y-2 pt-4 border-t">
                <p>
                  <strong>Company:</strong> {lead.company}
                </p>
                <p>
                  <strong>Source:</strong> {lead.source}
                </p>
                <p>
                  <strong>Score:</strong> {lead.score}
                </p>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
            <div className="p-4 border-t bg-gray-50 flex flex-col gap-3">
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  onClick={handleConvertClick}
                  className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Convert to Opportunity
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  isLoading={isSaving}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showConvertModal && (
        <>
          <div
            className="fixed cursor-pointer inset-0 z-50 backdrop-blur-sm"
            onClick={handleConvertCancel}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Convert to Opportunity
                </h3>
                <button
                  onClick={handleConvertCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only ">Close</span>
                  <svg
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opportunity Name
                  </label>
                  <Input
                    name="name"
                    value={opportunityData.name || ""}
                    onChange={handleOpportunityInputChange}
                    placeholder="Enter opportunity name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stage
                  </label>
                  <Select
                    name="stage"
                    value={opportunityData.stage || "Discovery"}
                    onChange={handleOpportunityInputChange}
                  >
                    <option value="Discovery">Discovery</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Closed">Closed</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (Optional)
                  </label>
                  <Input
                    name="amount"
                    type="number"
                    value={opportunityData.amount || ""}
                    onChange={handleOpportunityInputChange}
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Account:</strong> {lead?.company}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    This opportunity will be created from the lead "{lead?.name}
                    "
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="secondary" onClick={handleConvertCancel}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleConvertConfirm}>
                  Convert to Opportunity
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LeadDetailPanel;
