import { useState } from "react";
import { FaCopy, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-between items-center px-6  py-3 bg-[#1A1A1A] text-wrap " style={{zIndex:3}}>
        <div className="flex items-center space-x-2  ">
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
          className="mt-2 bg-[#2B2B2B] p-2 rounded text-wrap max-w-[70%]"
        >
          {tags.map((tag, index) => (
            <div key={index} className="text-gray-400 text-sm">
              <strong>{tag.name}:</strong> <span className="text-white">{tag.value}</span>
            </div>
          ))}
          <div className="mt-2">
        
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
      

    </motion.div>
  );
};

export default ProcessCard;
