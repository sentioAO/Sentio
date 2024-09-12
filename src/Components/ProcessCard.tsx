import React, { useState } from "react";
import { FaCopy, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Tag {
  name: string;
  value: string;
}

interface Node {
  id: string;
  tags: Tag[];
}

interface Process {
  node: Node;
}

const ProcessCard: React.FC<{ process: Process }> = ({ process }) => {
  if (!process || !process.node) {
    return <div>Error: Process data is not available</div>;
  }

  const [isOpen, setIsOpen] = useState(false);

  const processId = process.node.id;
  const tags = process.node.tags;

  const handleCopyId = () => {
    navigator.clipboard.writeText(processId);
    alert("ID copied to clipboard!");
  };

  return (
    <div className="bg-[#1E1E1E] text-white rounded-lg p-4 my-4 w-full max-w-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-white text-lg font-semibold">ID:</h3>
        <div className="flex items-center space-x-2">
          <p className="text-gray-300 text-sm truncate max-w-xs">{processId}</p>
          <button onClick={handleCopyId} className="text-gray-400 hover:text-white">
            <FaCopy />
          </button>
        </div>
      </div>

      <div className="mt-2">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white flex items-center space-x-1">
          <span>{isOpen ? 'Hide Tags' : 'Show Tags'}</span>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isOpen && (
          <div className="mt-2">
            {tags.map((tag, index) => (
              <div key={index} className="text-gray-400 text-sm">
                <strong>{tag.name}:</strong> <span className="text-white">{tag.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessCard;
