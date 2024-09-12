import { useActiveAddress } from "arweave-wallet-kit";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";

const Onchain = () => {
    const address = useActiveAddress();
    const fetchProcesses = async () => {
        const processes = await axios.post("https://sam-server.azurewebsites.net/getProcesses", { address });
        console.log(processes.data);
    }
    useEffect(() => {
        fetchProcesses();
    }, []);

    return (
        <>
            <div className="app-background">
                <Navbar />
                <div>
                    <h1 className="text-white tracking-widest mt-5 mx-2 my-3 py-3" style={{ fontFamily: "'Roboto'", textAlign: 'left' }}>HELLO {address}</h1>
                </div>

                <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        style={{ width: '50%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} 
                    />
                </div>
            </div>
        </>
    );
}

export default Onchain;