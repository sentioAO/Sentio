import { useActiveAddress } from "arweave-wallet-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ProcessCard from "../Components/ProcessCard";

interface Tag {
    name: string;
    value: string;
}

interface Node {
    id: string;
    tags: Tag[];
}



interface ApiResponse {
    edges: { node: Node }[];
}

const Onchain = () => {
    const address = useActiveAddress();
    const [processes, setProcesses] = useState<{ id: string; tags: Tag[] }[]>([]);

    useEffect(() => {
        const fetchProcesses = async () => {
            try {
                const response = await axios.post<ApiResponse>("https://sam-server.azurewebsites.net/getProcesses", { address });
                const processArray = response.data.edges.map(edge => ({
                    id: edge.node.id,
                    tags: edge.node.tags,
                }));
                setProcesses(processArray);
            } catch (error) {
                console.error("Error fetching processes:", error);
            }
        };
        if (address) {
            fetchProcesses();
        }
    }, [address]);

    return (
        <div className="app-background flex-grow min-h-screen flex flex-col">
            <Navbar />

            <div className="flex justify-center items-center py-3">
                <h1 className="text-white font-bold text-center text-3xl tracking-widest" style={{ fontFamily: "'Roboto'" }}>
                    CHECK YOUR PROCESSES
                </h1>
            </div>

            <div className="flex flex-col items-center w-full mt-5 space-y-4">
                {processes.length > 0 ? (
                    processes.map((process, index) => (
                        <ProcessCard key={index} process={process} />
                    ))
                ) : (
                    <p className="text-white">No processes available.</p>
                )}
            </div>
        </div>
    );
};
export default Onchain;