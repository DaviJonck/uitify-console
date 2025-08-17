import type { Lead } from "../../../types/Leads";

interface LeadListProps {
  leads: Lead[];
  onSelectLead: (leadId: number) => void;
  selectedLeadId: number | null;
}

function LeadList({ leads, onSelectLead, selectedLeadId }: LeadListProps) {
  if (leads.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No leads match your criteria.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <ul className="divide-y divide-gray-200">
        {leads.map((lead) => (
          <li
            key={lead.id}
            onClick={() => onSelectLead(lead.id)}
            className={`cursor-pointer p-4 transition-colors ${
              selectedLeadId === lead.id ? "bg-blue-100" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">{lead.name}</p>
                <p className="text-sm text-gray-600">{lead.company}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600">
                  Score: {lead.score}
                </p>
                <span
                  className={`px-2 inline-flex text-xs  text-black ${lead.status}`}
                >
                  {lead.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeadList;
