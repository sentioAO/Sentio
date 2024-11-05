import { FaCopy } from "react-icons/fa";
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
  if (!process || !process.id) {
    return <div>Error: Process data is not available</div>;
  }

  const processId = process.id;
  const tags = process.tags;

  const handleCopyId = () => {
    navigator.clipboard.writeText(processId);
    onCopy(); // Call the onCopy callback
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg my-4 w-full  p-4 bg-[#1A1A1A] shadow-lg"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3 className="text-white text-lg font-semibold">Process ID:</h3>
          <div className="flex items-center">
            <p className="text-gray-300 text-sm truncate">{processId}</p>
            <button
              onClick={handleCopyId}
              className="text-gray-400 hover:text-white ml-2"
              aria-label="Copy Process ID"
            >
              <FaCopy />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 bg-[#2B2B2B] p-4 rounded">
        {tags.map((tag, index) => (
          <div key={index} className="text-gray-400 text-sm">
            <strong>{tag.name}:</strong> <span className="text-white">{tag.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProcessCard;
