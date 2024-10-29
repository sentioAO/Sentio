import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { DotPatternHover } from '../Components/ui/Hoverdots';
import Wallet from '../Components/Wallet-Button';
import { useEffect, useState } from 'react';
import { useActiveAddress } from 'arweave-wallet-kit';
import { handleAirDrop } from '../lib/tokenServices';
import AirdropGif from "../assets/Airdropping.gif";

const Faucetspage = () => {
  const address = useActiveAddress();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [testSentiBalance, setTestSentiBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      console.log('Wallet connected ' + address);
      setWalletAddress(address);
      getTokenBalance();
    }
  }, [address]);

  const getTokenBalance = async () => {
    // @ts-expect-error - window.arweaveWallet is not defined
    await window.arweaveWallet.connect(["ACCESS_TOKENS"]);
    // @ts-expect-error - window.arweaveWallet is not defined
    const tokens = await window.arweaveWallet.userTokens();
    console.log("Tokens owned by the user:", tokens);
    for (let i = 0; i < tokens.length; i++) {
      console.log(tokens[i].Name);
      if (tokens[i].Name === 'TEST$SENTI') {
        const tokenid = tokens[i].processId;
        // @ts-expect-error - window.arweaveWallet is not defined
        const balance = await window.arweaveWallet.tokenBalance(tokenid);
        console.log("Test Senti Balance: ", balance);
        setTestSentiBalance(balance);
      }
    }
  };

  const handleAirDropWithBalanceUpdate = async (walletAddress: string) => {
    setLoading(true); // Start loading
    await handleAirDrop(walletAddress, window.arweaveWallet);
    setTimeout(() => {
      getTokenBalance();
      setLoading(false); // Stop loading after 5 seconds
    }, 3000);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <img src={AirdropGif} alt="Airdrop in progress" className="w-69 h-69" />
        </div>
      )}

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
            <div className='text-left'>
              <p className="text-lg">
                Please connect wallet to get <span className="text-[#9966ff]">tSENTI Tokens</span>
              </p>
              <p>
                Your Wallet Address: <span className="text-[#9966ff]">{walletAddress}</span>
              </p>
              <p>
                Your Test Senti Balance: <span className="text-[#9966ff]">{testSentiBalance}</span>
              </p>
              {walletAddress && (
                <div className='flex justify-end px-5'>
                  <button
                    onClick={() => handleAirDropWithBalanceUpdate(walletAddress)}
                    className='text-[#9966ff] bg-white px-5 py-2 rounded-lg'
                    disabled={!walletAddress || loading}
                  >
                    {loading ? "Processing..." : "Claim tSENTI"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </DotPatternHover>

        <Footer />
      </motion.div>
    </>
  );
};

export default Faucetspage;