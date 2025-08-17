import { useEffect, useState } from "react";

import type { Lead } from "../../../types/Leads";

import Input from "../../ui/input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

interface LeadDetailPanelProps {
  lead: Lead | null;
  onClose: () => void;
  onSave: (updatedLead: Lead) => Promise<void>;
  onConvert: (lead: Lead) => void;
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

  useEffect(() => {
    if (lead) {
      setFormData({ email: lead.email, status: lead.status });
      setError(null);
    }
  }, [lead]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
              <Button variant="primary" onClick={() => onConvert(lead)}>
                Convert Lead
              </Button>
              <div className="space-x-2">
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  isLoading={isSaving}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LeadDetailPanel;
