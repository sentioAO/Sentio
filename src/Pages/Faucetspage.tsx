import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { DotPatternHover } from '../Components/ui/Hoverdots';
import Wallet from '../Components/Wallet-Button';

const Faucetspage = () => {
  return (
    <>
      <motion.div
        className="app-background h-screen w-full flex flex-col items-center justify-center gap-9"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />

        <DotPatternHover>
          <motion.div
            className="flex flex-col items-center text-center px-4 py-10 bg-[rgba(14,17,22,0.85)] rounded-lg shadow-md backdrop-blur-md"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-4xl text-[#9966ff] mb-4">tSENTI Faucet</h1>

            <p className="text-lg text-[#cfd8e0] max-w-lg mb-6">
              Claim tSENTI tokens from the faucet to get started with code auditing, monitoring, and complete security.
            </p>

            <motion.button
              className="text-[#0e1116] py-2 px-6 text-lg rounded-md mb-6 transition"
              whileHover={{ scale: 1.05 }}
            >
              <Wallet />
            </motion.button>

            <p className="text-lg">
              Please connect wallet to get <span className="text-[#9966ff]">tSENTI Tokens</span>
            </p>
          </motion.div>
        </DotPatternHover>

        <Footer />
      </motion.div>
    </>
  );
};

export default Faucetspage;
