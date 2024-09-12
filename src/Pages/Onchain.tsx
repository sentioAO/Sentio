import { useActiveAddress } from "arweave-wallet-kit"
import axios from "axios";
import { useEffect } from "react";

const Onchain = () => {
    const address = useActiveAddress();
    const fetchProcesses = async () => {
        const processes = await axios.post("https://sam-server.azurewebsites.net/getProcesses", { address });
        console.log(processes.data);
    }
    useEffect(() => {
        fetchProcesses();
        // const processes = axios.post("https://sam-server.azurewebsites.net/getProcesses", { address });
    }
        ,)
    // console.log(processes);
    return (
        <div>
            HELLO {address}
        </div>
    )
}

export default Onchain
