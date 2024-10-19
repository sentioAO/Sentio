import { useNavigate } from "react-router-dom";
import Wallet from "./Wallet-Button";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";

const Navbar = () => {
    const navigate = useNavigate();

    // Animation variants
    const containerVariant = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
        },
    };

    const logoVariant = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 },
        },
    };

    const buttonVariant = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 },
        },
    };

    const walletVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.6 },
        },
    };

    return (
        <motion.div
            className="text-white flex mt-4 text-2xl justify-between items-center border border-[#66686e] rounded-lg p-6 w-2/3"
            style={{ fontFamily: "'Roboto'" }}
            initial="hidden"
            animate="visible"
            variants={containerVariant}
        >
            <motion.div className="flex items-center" variants={logoVariant}>
                <div className="w-20">
                    <img src={logo} alt="" />
                </div>
                <p onClick={() => { navigate("/") }}>
                    SENTIO
                </p>
            </motion.div>

            <motion.div className="flex gap-4 text-lg" variants={buttonVariant}>
                <button>How it works </button>
                <button>FAQ</button>
                <button>Features</button>
            </motion.div>

            <motion.div variants={walletVariant}>
                <Wallet />
            </motion.div>
        </motion.div>
    );
};

export default Navbar;
