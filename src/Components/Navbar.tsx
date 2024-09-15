import { useNavigate } from "react-router-dom";
import Wallet from "./Wallet-Button";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="w-[100%] px-6  flex justify-between items-center pt-6">
                <h1
                    className="text-white gradient-text text-2xl md:text-4xl font-light tracking-widest"
                    style={{ fontFamily: "'Anton SC', sans-serif" }}
                    onClick={()=>{navigate('/')}}
                >
                    <button>SENTIO</button>
                </h1>
                <Wallet />
            </div>
            <hr className="w-[100%] px-6 border-t border-gray-500 mt-4" />
        </>
    );
};

export default Navbar;

// export default Navbar;
