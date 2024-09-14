import React, { useState } from "react";
import { FaCopy, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }} // Start with an offset
      animate={{ opacity: 1, y: 0 }} // Bring into view
      transition={{ duration: 0.5 }} // Animation timing
      className="bg-[#1E1E1E] rounded-lg p-4 my-4 w-3/4"
    >
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

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-2 bg-[#2B2B2B] p-2 rounded"
          >
            {tags.map((tag, index) => (
              <div key={index} className="text-gray-400 text-sm">
                <strong>{tag.name}:</strong>{" "}
                <span className="text-white">{tag.value}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Analyze Button */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
        <button
          onClick={handleAnalyze}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Analyze
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProcessCard;
