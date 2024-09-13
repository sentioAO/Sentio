import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence from Framer Motion
import offchainImg from '../assets/offchain.png'; // Offchain image
import onchainImg from '../assets/onchain2.png';   // Onchain image

const SwitchNet: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'offchain' | 'onchain'>('offchain');
    const [buttonText, setButtonText] = useState<string>(activeTab === 'offchain' ? 'Go to Offchain' : 'Go to Onchain');
    const navigate = useNavigate();

    const handleTabChange = (tab: 'offchain' | 'onchain') => {
        setActiveTab(tab);
        setButtonText(tab === 'offchain' ? 'Go to Offchain' : 'Go to Onchain');
    };

    const handleNavigate = () => {
        if (activeTab === 'offchain') {
            navigate('/offchain'); // Navigate to the Offchain page when in Offchain tab
        } else {
            navigate('/onchain');  // Navigate to the Onchain page when in Onchain tab
        }
    };

    const handleMouseEnter = () => {
        setButtonText(activeTab === 'offchain' ? 'Audit Process Code' : 'Monitor & Analyze Process');
    };

    const handleMouseLeave = () => {
        setButtonText(activeTab === 'offchain' ? 'Go to Offchain' : 'Go to Onchain');
    };

    // Animation variants
    const tabButtonVariants = {
        active: { scale: 1.05, backgroundColor: '#4a4a4a', transition: { duration: 0.3 } },
        inactive: { scale: 1, backgroundColor: '#2a2a2a', transition: { duration: 0.3 } },
    };

    const imageVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#1a1a1a] p-6 rounded-lg flex flex-col md:flex-row">
            {/* Left Image */}
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 w-full md:w-[400px] lg:w-[500px] h-auto">
                <AnimatePresence>
                    <motion.img
                        key={activeTab} // Ensures that the component will re-render when the tab changes
                        src={activeTab === 'offchain' ? offchainImg : onchainImg} // Dynamically change image based on active tab
                        alt={activeTab === 'offchain' ? 'Offchain illustration' : 'Onchain illustration'}
                        className="rounded-lg w-full h-full object-cover"
                        variants={imageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>
            </div>

            {/* Right Side Content */}
            <div className="flex-grow">
                {/* Tab Selection */}
                <div className="flex justify-between mb-4">
                    <motion.button
                        className={`flex-1 py-2 text-white font-semibold rounded-l-lg focus:outline-none ${activeTab === 'offchain' ? 'bg-gray-700' : 'bg-gray-900'}`}
                        onClick={() => handleTabChange('offchain')}
                        variants={tabButtonVariants}
                        animate={activeTab === 'offchain' ? 'active' : 'inactive'}
                    >
                        Offchain
                    </motion.button>
                    <motion.button
                        className={`flex-1 py-2 text-white font-semibold rounded-r-lg focus:outline-none ${activeTab === 'onchain' ? 'bg-gray-700' : 'bg-gray-900'}`}
                        onClick={() => handleTabChange('onchain')}
                        variants={tabButtonVariants}
                        animate={activeTab === 'onchain' ? 'active' : 'inactive'}
                    >
                        Onchain
                    </motion.button>
                </div>

                {/* Content Boxes */}
                <AnimatePresence>
                    <motion.div
                        className="bg-[#2a2a2a] p-4 rounded-lg"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {activeTab === 'offchain' && (
                            <div>
                                <h2 className="text-lg font-bold text-white">Offchain</h2>
                                <p className="text-sm text-gray-400 mt-2">
                                    Write your Offchain-related content here. This could be anything from brief descriptions to detailed information about your project.
                                </p>
                            </div>
                        )}
                        {activeTab === 'onchain' && (
                            <div>
                                <h2 className="text-lg font-bold text-white">Onchain</h2>
                                <p className="text-sm text-gray-400 mt-2">
                                    Write your Onchain-related content here. Explain how it works or any details you want the user to know.
                                </p>
                            </div>
                        )}

                        {/* Additional Content Box */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-400">
                                Additional information or details that can complement the selected tab's content.
                            </p>
                        </div>

                        {/* Dynamic Go Button */}
                        <div className="mt-6">
                            <motion.button
                                onClick={handleNavigate}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="px-6 py-2 bg-transparent border border-[#a09e9e] rounded-xl p-1 text-white font-semibold rounded-lg hover:bg-black"
                                whileHover={{ scale: 2.0 }}
                                whileTap={{ scale: 1.95 }}
                            >
                                {buttonText}
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SwitchNet;
