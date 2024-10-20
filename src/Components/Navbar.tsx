import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wallet from "./Wallet-Button";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa"; // Import hamburger icon

const Navbar = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Animation variants for the sidebar
    const sidebarVariants = {
        hidden: { x: "-100%" },
        visible: {
            x: 0,
            transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
        },
    };

    return (
        <motion.div
            className="text-white flex mt-4 text-2xl justify-between items-center border border-[#66686e] rounded-lg p-6 w-[90%] lg:w-2/3"
            style={{ fontFamily: "'Roboto'" }}
        >
            <div className="flex items-center">
                <div className="w-12">
                    <img src={logo} alt="Logo" />
                </div>
                <p className="hidden lg:block ml-2" onClick={() => navigate("/")}>
                    SENTIO
                </p>
            </div>

            {/* Hamburger for smaller devices */}
            <div className="lg:hidden">
                <FaBars onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="cursor-pointer" />
            </div>

            {/* Full Navbar for laptops */}
            <div className="hidden lg:flex gap-4 text-lg">
                <button onClick={() => navigate("/how-it-works")}>How it works</button>
                <button onClick={() => navigate("/faq")}>FAQ</button>
                <button onClick={() => navigate("/features")}>Features</button>
                <Wallet />
            </div>

            {/* Sidebar for smaller devices */}
            {isSidebarOpen && (
                <motion.div
                    className="fixed top-0  left-0 h-full w-2/3 bg-[#333] p-6 z-50 flex flex-col gap-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={sidebarVariants}
                >
                    <div className="flex items-center mb-4">
                        <img src={logo} alt="Logo" className="w-12" />
                    </div>
                    <button className="text-left" onClick={() => navigate("/how-it-works")}>How it works</button>
                    <button  className="text-left" onClick={() => navigate("/features")}>Features</button>
                    <button  className="text-left" onClick={() => navigate("/faq")}>FAQ</button>
                    <Wallet />
                </motion.div>
            )}
        </motion.div>
    );
};

export default Navbar;
