'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import ProcessCard from "../Components/ProcessCard";

interface Tag {
  name: string;
  value: string;
}

interface Process {
  id: string;
  status: string;
  tags: Tag[];
}

interface ProcessEdge {
  node: Process;
}

export default function Dashboard() {
  const [processes, setProcesses] = useState<ProcessEdge[]>([]);
  const [walletId, setWalletId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false); // State for clipboard notification

  const checkWallet = async () => {
    const isConnected = localStorage.getItem("wallet_kit_strategy_id");
    if (isConnected) {
      const walletId = await window.arweaveWallet.getActiveAddress();
      setWalletId(walletId);
      console.log(walletId);
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  useEffect(() => {
    if (walletId) {
      fetchProcessDetails(walletId);
    }
  }, [walletId]);

  const fetchProcessDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://sam-server.azurewebsites.net/getProcesses', {
        address: id,
      });
  
      // Sort processes by status
      const sortedProcesses = response.data.edges.sort((a: ProcessEdge, b: ProcessEdge) => {
        if (a.node.status < b.node.status) return -1;
        if (a.node.status > b.node.status) return 1;
        return 0;
      });
  
      setProcesses(sortedProcesses);
    } catch (error) {
      console.error("Error fetching process details:", error);
      setError("Failed to load process details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide the popup after 2 seconds
  };

  return (
    <div className="app-background text-white min-h-screen" style={{ fontFamily: "'Roboto'" }}>
      <div className="flex justify-center">
        <Navbar faqRef={undefined} howItWorksRef={undefined}/>
      </div>
      <div className="flex justify-center mb-4 mt-5">
        <h1 className="text-4xl font-bold">Process Dashboard</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-5 h-48">
          <svg
            className="animate-spin h-12 w-12 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8l4 4-4 4v-8a8 8 0 00-8-8z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : processes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {processes.map((process, index) => (
            <ProcessCard key={index} process={process.node} onCopy={handleCopy} />
          ))}
        </div>
      ) : (
        <p>No process found with the given ID.</p>
      )}

      {copied && (
        <div className="fixed bottom-4 right-4 bg-white text-black py-2 px-4 rounded shadow-lg transition-all duration-300" style={{ fontFamily: "'Roboto'" }}>
          Process ID copied to clipboard!
        </div>
      )}
    </div>
  );
}
