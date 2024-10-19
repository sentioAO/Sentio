import { useNavigate } from "react-router-dom";
import Wallet from "./Wallet-Button";
import logo from "../assets/logo.png"
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="text-white flex mt-4 text-2xl justify-between items-center border border-[#66686e] rounded-lg p-6 w-2/3"  style={{fontFamily:"'Roboto'"}}>
                <div className="flex items-center ">
                    <div className="w-20">

                        <img src={logo} alt="" />
                    </div>
                    <p onClick={()=>{navigate("/")}}>
                        SENTIO
                    </p>

                
                </div>
                <div className="flex gap-4  text-lg">
                    <button>How it works </button>
                    <button>FAQ</button>
                    <button>Features</button>
                    
                </div>
                <div>
                    <Wallet/>
                </div>

            </div>
        </>
    );
};

export default Navbar;

// export default Navbar;
