import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ReportDetailsProps {
  reportItems: {
    description: string;
    line: number;
    name: string;
    pattern: string;
    severity: string;
  }[];
  severityLabel: string;
  severityColor: string;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({ reportItems, severityLabel, severityColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#2e2e2e] mb-4 p-3 rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDetails}
      >
        <div className="text-lg font-semibold">
          <span className={`px-3 py-1 rounded-lg text-white ${severityColor}`}>{severityLabel}</span> ({reportItems.length})
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className="mt-3  text-gray-300">
          {reportItems.length > 0 ? (
            reportItems.map((item, index) => (
              <div key={index} className="mb-3">
                <p><strong>{item.name}</strong> - Line {item.line}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Pattern:</strong> {item.pattern}</p>
              </div>
            ))
          ) : (
            <p>No vulnerabilities found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportDetails;
