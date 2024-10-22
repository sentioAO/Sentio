import { useState } from "react";
import { FaCopy, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import SentinelDemo from "./SentinelDemo";
import { motion } from "framer-motion";

interface Tag {
  name: string;
  value: string;
}

interface Process {
  id: string;
  tags: Tag[];
}

const ProcessCard: React.FC<{ process: Process; onCopy: () => void }> = ({ process, onCopy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSentinelDemo, setShowSentinelDemo] = useState(false); // New state for SentinelDemo visibility
  // const navigate = useNavigate();

  if (!process || !process.id) {
    return <div>Error: Process data is not available</div>;
  }

  const processId = process.id;
  const tags = process.tags;

  const handleCopyId = () => {
    navigator.clipboard.writeText(processId);
    onCopy(); // Call the onCopy callback
  };

  // const handleAnalyze = () => {
  //   navigate(`/dashboard/${processId}`);
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg my-4 w-3/4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3 className="text-white text-base font-semibold">ID:</h3>
          <div className="flex items-center">
            <p className="text-gray-300 text-sm truncate">{processId}</p>
            <button
              onClick={handleCopyId}
              className="text-gray-400 hover:text-white ml-2"
            >
              <FaCopy />
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="text-gray-400 hover:text-white"
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-2 bg-[#2B2B2B] p-2 rounded"
        >
          {tags.map((tag, index) => (
            <div key={index} className="text-gray-400 text-sm">
              <strong>{tag.name}:</strong> <span className="text-white">{tag.value}</span>
            </div>
          ))}
          <div className="mt-2">
          {/* <button
          onClick={handleAnalyze}
          className="px-10 py-3 text-white bg-[#9966FF] mt-7 z-10 rounded-xl font-bold text-md"
        >
          Analyze 
        </button> */}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
      </motion.div>
      <button
        className="px-10 py-3 text-[#9966FF] bg-white mt-7 z-10 rounded-xl font-bold text-sm"
        onClick={() => setShowSentinelDemo(prev => !prev)} 
      >
        Setup Sentinel
      </button>

      {showSentinelDemo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md  relative"> 
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowSentinelDemo(false)}
            >
              <FaTimes />
            </button>
            <SentinelDemo />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProcessCard;
