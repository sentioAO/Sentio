import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SentinelProps {
  processes: { id: string }[]; // Assuming each process has an 'id' property
  onClose: () => void; // Callback to close the modal
  onSpawnSentinel: (processId: string) => void; // Callback to handle spawning the sentinel
}

const Sentinel: React.FC<SentinelProps> = ({ processes, onClose, onSpawnSentinel }) => {
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSpawn = () => {
    if (selectedProcessId) {
      onSpawnSentinel(selectedProcessId);
      navigate(`/setup/${selectedProcessId}`); // Navigate to the Sentinel page with the selected process ID
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-black rounded-lg p-5 w-96 h-96 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Spawn Sentinel</h2>
        <div className="flex flex-col space-y-4 overflow-y-auto mb-4">
          {processes.map(process => (
            <div
              key={process.id}
              className={`p-4 rounded-lg cursor-pointer transition duration-300 
                          ${selectedProcessId === process.id ? 'bg-[#9966ff] text-white' : 'bg-gray-700 text-white'}`}
              onClick={() => setSelectedProcessId(process.id)}
            >
              {process.id}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-[#9966ff] text-black rounded"
            onClick={handleSpawn}
            disabled={!selectedProcessId} // Disable button if no process is selected
          >
            Spawn Sentinel
          </button>
          <button
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sentinel;
