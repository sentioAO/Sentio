import { useActiveAddress } from "arweave-wallet-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ProcessCard from "../Components/ProcessCard";
import ErrorBoundary from "../Components/ErrorBoundary"; 

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

interface ApiResponse {
  edges: { node: Process }[];
}

const Onchain = () => {
  const address = useActiveAddress();
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProcesses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse>(
        "https://sam-server.azurewebsites.net/getProcesses",
        { address }
      );
      const processArray = response.data.edges.map((edge) => edge.node);
      setProcesses(processArray);
    } catch (err) {
      console.error("Error fetching processes:", err);
      setError("Failed to fetch processes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchProcesses();
    }
  }, );

  return (
    <div className="app-background min-h-screen flex flex-col">
      <Navbar />

      <div className="flex justify-center items-center">
        <h1
          className="text-white font-bold text-center text-3xl tracking-widest py-3"
          style={{ fontFamily: "'Roboto'" }}
        >
          CHECK YOUR PROCESSES
        </h1>
      </div>

      <div className="flex flex-col items-center mt-5 space-y-4">
        {loading ? (
          <p className="text-white">Loading processes...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : processes.length > 0 ? (
          processes.map((process, index) => (
            <ErrorBoundary key={index}>
              <ProcessCard process={process} />
            </ErrorBoundary>
          ))
        ) : (
          <p className="text-white">No processes available.</p>
        )}
      </div>
    </div>
  );
};

export default Onchain;
