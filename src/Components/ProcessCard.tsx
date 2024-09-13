import React, { useState } from "react";
import { FaCopy, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Tag {
  name: string;
  value: string;
}

interface Process {
  id: string;
  tags: Tag[];
}

const ProcessCard: React.FC<{ process: Process }> = ({ process }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate hook for routing

  if (!process || !process.id) {
    return <div>Error: Process data is not available</div>;
  }

  const processId = process.id;
  const tags = process.tags;

  const handleCopyId = () => {
    navigator.clipboard.writeText(processId);
    alert("ID copied to clipboard!");
  };

  const handleAnalyze = () => {
    navigate(`/dashboard/${processId}`); // Navigate to the process page
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-4 my-4 w-3/4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3 className="text-white text-base font-semibold">ID:</h3>
          <p className="text-gray-300 text-sm truncate">{processId}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyId}
            className="text-gray-400 hover:text-white"
          >
            <FaCopy />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white"
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 bg-[#2B2B2B] p-2 rounded">
          {tags.map((tag, index) => (
            <div key={index} className="text-gray-400 text-sm">
              <strong>{tag.name}:</strong> <span className="text-white">{tag.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Analyze Button */}
      <div className="mt-4">
        <button
          onClick={handleAnalyze}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Analyze
        </button>
      </div>
    </div>
  );
};

export default ProcessCard;
