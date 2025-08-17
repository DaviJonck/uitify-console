import { UndoIcon } from "lucide-react";

import type { Opportunity } from "../../types/Leads";

interface OpportunityListProps {
  opportunities: Opportunity[];
  onUnconvert: (id: number) => void;
}

function OpportunityList({ opportunities, onUnconvert }: OpportunityListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 lg:p-4 border-b flex-shrink-0">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800">
          Opportunities
        </h2>
      </div>
      <div className="flex-1 overflow-hidden">
        {opportunities.length > 0 ? (
          <div className="h-full overflow-y-auto p-3 lg:p-4">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="group p-3 mb-2 bg-gray-50 rounded-lg flex justify-between items-center"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-700 truncate">
                    {opp.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {opp.accountName}
                  </p>
                </div>
                <button
                  onClick={() => onUnconvert(opp.id)}
                  className="p-2 rounded-full hover:bg-blue-300 text-blue-600 transition-all cursor-pointer flex-shrink-0 ml-3"
                  aria-label="Revert to lead"
                >
                  <UndoIcon className="w-4 h-4 text-blue-600 hover:text-blue-800" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No opportunities.
          </div>
        )}
      </div>
    </div>
  );
}

export default OpportunityList;
