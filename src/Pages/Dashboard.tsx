'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../Components/Navbar"

interface Tag {
  name: string
  value: string
}

interface Process {
  id: string
  status: string
  tags: Tag[]
}

interface ProcessEdge {
  node: Process
}

export default function Dashboard() {
  const [processes, setProcesses] = useState<ProcessEdge[]>([])
  const [walletId, setWalletId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false) // State for clipboard notification

  const checkWallet = async () => {
    const isConnected = localStorage.getItem("wallet_kit_strategy_id")
    if (isConnected) {
      const walletId = await window.arweaveWallet.getActiveAddress()
      setWalletId(walletId)
      console.log(walletId)
    }
  }

  useEffect(() => {
    checkWallet()
  }, [])

  useEffect(() => {
    if (walletId) {
      fetchProcessDetails(walletId)
    }
  }, [walletId])

  const fetchProcessDetails = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('https://sam-server.azurewebsites.net/getProcesses', {
        address: id
      })
      console.log(response.data)
      setProcesses(response.data.edges)
    } catch (error) {
      console.error("Error fetching process details:", error)
      setError("Failed to load process details. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (processId: string) => {
    navigator.clipboard.writeText(processId)
    setCopied(true) 
    setTimeout(() => setCopied(false), 2000) 
  }

  return (
    <>
    <div className="app-background text-white p-6 min-h-screen " style={{ fontFamily: "'Roboto'" }}>
      <Navbar/>
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
        <div className="flex flex-wrap gap-4">
          {processes.map((process, index) => (
            <div key={index} className="outline p-4 rounded-lg shadow-lg mb-4">
              <h2 className="text-2xl font-semibold mb-2">Process ID: {process.node.id}</h2>
              <p className="mb-4"><strong>Status:</strong> {process.node.status}</p>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Tags</h3>
                <ul className="list-disc list-inside">
                  {process.node.tags.map((tag, index) => (
                    <li key={index}>
                      <strong>{tag.name}:</strong> {tag.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-5">
                <button
                  className="px-4 py-2 outline text-white hover:bg-white hover:text-black rounded transition duration-200"
                  onClick={() => handleCopy(process.node.id)} // Handle copy action
                >
                  Copy Process ID
                </button>
                <button
                  className="px-4 py-2 bg-white text-black rounded hover:bg-black hover:outline hover:text-white transition duration-200"
                  onClick={() => alert("Analyzer feature coming soon!")}
                >
                  Analyze Process
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No process found with the given ID.</p>
      )}

      {copied && (
        <div className="fixed bottom-4 right-4 bg-white text-black  py-2 px-4 rounded shadow-lg transition-all duration-300"style={{ fontFamily: "'Roboto'" }}>
          Process ID copied to clipboard!
        </div>
      )}
    </div>
    </>
  )
}