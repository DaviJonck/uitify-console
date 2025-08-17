import { useState } from "react";
import { UndoIcon, EditIcon } from "lucide-react";

import type { Opportunity } from "../../types/Leads";
import Input from "../ui/input";
import Select from "../ui/Select";

interface OpportunityListProps {
  opportunities: Opportunity[];
  onUnconvert: (id: number) => void;
  onUpdateOpportunity: (id: number, updates: Partial<Opportunity>) => void;
}

function OpportunityList({
  opportunities,
  onUnconvert,
  onUpdateOpportunity,
}: OpportunityListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Opportunity>>({});

  const formatCurrency = (amount?: number) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getTotalValue = () => {
    return opportunities
      .filter((opp) => opp.amount)
      .reduce((total, opp) => total + (opp.amount || 0), 0);
  };

  const getStageCount = (stage: string) => {
    return opportunities.filter((opp) => opp.stage === stage).length;
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Discovery":
        return "bg-blue-100 text-blue-800";
      case "Proposal":
        return "bg-yellow-100 text-yellow-800";
      case "Negotiation":
        return "bg-orange-100 text-orange-800";
      case "Closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStageProgress = (stage: string) => {
    switch (stage) {
      case "Discovery":
        return 25;
      case "Proposal":
        return 50;
      case "Negotiation":
        return 75;
      case "Closed":
        return 100;
      default:
        return 0;
    }
  };

  const handleEdit = (opportunity: Opportunity) => {
    setEditingId(opportunity.id);
    setEditData({
      name: opportunity.name,
      stage: opportunity.stage,
      amount: opportunity.amount,
    });
  };

  const handleSave = () => {
    if (editingId) {
      onUpdateOpportunity(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]:
        name === "amount" ? (value ? parseFloat(value) : undefined) : value,
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 lg:p-4 border-b flex-shrink-0">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800">
          Opportunities
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {opportunities.length} opportunity
          {opportunities.length !== 1 ? "ies" : "y"}
        </p>
        {opportunities.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
            <div className="bg-blue-50 p-2 rounded">
              <div className="font-semibold text-blue-800">Total Value</div>
              <div className="text-blue-600">
                {formatCurrency(getTotalValue())}
              </div>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <div className="font-semibold text-green-800">Pipeline</div>
              <div className="text-green-600">
                {getStageCount("Discovery") +
                  getStageCount("Proposal") +
                  getStageCount("Negotiation")}{" "}
                active
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        {opportunities.length > 0 ? (
          <div className="h-full overflow-y-auto">
            <div className="min-w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stage
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {opportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        {editingId === opp.id ? (
                          <Input
                            name="name"
                            value={editData.name || ""}
                            onChange={handleInputChange}
                            className="w-full"
                          />
                        ) : (
                          <>
                            <div className="text-sm font-medium text-gray-900">
                              {opp.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {opp.id}
                            </div>
                          </>
                        )}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {opp.accountName}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {editingId === opp.id ? (
                          <Select
                            name="stage"
                            value={editData.stage || "Discovery"}
                            onChange={handleInputChange}
                            className="w-full"
                          >
                            <option value="Discovery">Discovery</option>
                            <option value="Proposal">Proposal</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Closed">Closed</option>
                          </Select>
                        ) : (
                          <div className="space-y-1">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(
                                opp.stage
                              )}`}
                            >
                              {opp.stage}
                            </span>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                style={{
                                  width: `${getStageProgress(opp.stage)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {editingId === opp.id ? (
                          <Input
                            name="amount"
                            type="number"
                            value={editData.amount || ""}
                            onChange={handleInputChange}
                            placeholder="Enter amount"
                            min="0"
                            step="0.01"
                            className="w-full"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">
                            {formatCurrency(opp.amount)}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {editingId === opp.id ? (
                            <>
                              <button
                                onClick={handleSave}
                                className="p-1 rounded text-green-600 hover:bg-green-100 transition-colors"
                                title="Save changes"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={handleCancel}
                                className="p-1 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                                title="Cancel editing"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(opp)}
                                className="p-1 rounded text-blue-600 hover:bg-blue-100 transition-colors"
                                title="Edit opportunity"
                              >
                                <EditIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onUnconvert(opp.id)}
                                className="p-1 rounded text-orange-600 hover:bg-orange-100 transition-colors"
                                title="Convert back to lead"
                              >
                                <UndoIcon className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-lg font-medium">No opportunities yet</p>
              <p className="text-sm">Convert leads to create opportunities</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OpportunityList;
