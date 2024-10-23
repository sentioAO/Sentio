import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';  // Import react-select
// import './Sentinel.css';  // Import custom CSS for styling

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
      navigate(`/sentinel/${selectedProcessId}`); // Navigate to the Sentinel page with the selected process ID
    }
  };

  const options = processes.map(process => ({
    value: process.id,
    label: process.id,
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-black rounded-lg p-5 w-96 h-96 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-4">Spawn Sentinel</h2>
        <div className="mb-4 text-white">
          <label htmlFor="processId" className="block mb-2 text-sm">Select Process ID:</label>
          <Select
            id="processId"
            options={options}
            className="text-black w-full custom-select"
            onChange={(selectedOption) => setSelectedProcessId(selectedOption ? selectedOption.value : null)}
            placeholder="Select a process..."
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: 'white',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#9966ff' : state.isFocused ? '#9966ff' : 'white',
                color: state.isSelected || state.isFocused ? 'white' : 'black',
              }),
              singleValue: (base) => ({
                ...base,
                color: 'black',
              }),
            }}
          />
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
