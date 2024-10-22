import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SentinelProps {
  processes: { id: string }[]; // Assuming each process has an 'id' property
  onClose: () => void; // Callback to close the modal
  onSpawnSentinel: (processId: string) => void; // Callback to handle spawning the sentinel
}

const Sentinel: React.FC<SentinelProps> = ({ processes, onClose, onSpawnSentinel }) => {
  const [selectedProcessId, setSelectedProcessId] = useState<string>("");
    const navigate=useNavigate()
  const handleSpawn = () => {
    onSpawnSentinel(selectedProcessId);
    navigate(`/sentinel/${selectedProcessId}`) // Navigate to the Sentinel page with the selected process ID
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-black rounded-lg p-5 w-96 h-96 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-4">Spawn Sentinel</h2>
        <div className="mb-4 text-white">
          <label htmlFor="processId" className="block mb-2 text-sm">Select Process ID:</label>
          <select
            id="processId"
            value={selectedProcessId}
            onChange={(e) => setSelectedProcessId(e.target.value)}
            className="border rounded p-2 text-black w-full"
          >
            <option value="" >Select a process...</option>
            {processes.map(process => (
              <option key={process.id} value={process.id}>
                {process.id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-blue-500 text-black rounded"
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
