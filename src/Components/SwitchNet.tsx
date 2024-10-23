import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { OrbitingCirclesDemo } from './Circles';
import offchain from "../assets/offchain.png";
import Monitoring from './Monitoring';

const SwitchNet: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'security' | 'auditing' | 'monitoring'>('security');
    const [buttonText, setButtonText] = useState<string>('Go to Security');
    const navigate = useNavigate();

    const handleTabChange = (tab: 'security' | 'auditing' | 'monitoring') => {
        setActiveTab(tab);
        setButtonText(tab === 'security' ? 'Go to Security' : tab === 'auditing' ? 'Go to Auditing' : 'Go to Monitoring');
    };

    const handleNavigate = () => {
        if (activeTab === 'security') {
            navigate('/dashboard');
        } else if (activeTab === 'auditing') {
            navigate('/offchain');
        } else {
            navigate('/dashboard');
        }
    };

    const handleMouseEnter = () => {
        if (activeTab === 'security') {
            setButtonText('Ensure Code Security');
        } else if (activeTab === 'auditing') {
            setButtonText('Audit Process Code');
        } else {
            setButtonText('Monitor & Analyze Process');
        }
    };

    const handleMouseLeave = () => {
        setButtonText(activeTab === 'security' ? 'Go to Security' : activeTab === 'auditing' ? 'Go to Auditing' : 'Go to Monitoring');
    };

    const tabButtonVariants = {
        active: { scale: 1.05, backgroundColor: '#6c42e2', transition: { duration: 0.3 } }, // Purple for active tab
        inactive: { scale: 1, backgroundColor: '#4d2f91', transition: { duration: 0.3 } }, // Darker purple for inactive
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="w-full max-w-5xl mx-auto  p-6 rounded-lg flex flex-col"> {/* Greyish background */}

            {/* Tab Selection at the Top */}
            <div className="flex justify-center mb-4">
                <motion.button
                    className={`flex-1 py-2 text-[white] font-semibold rounded-l-lg focus:outline-none ${activeTab === 'security' ? 'bg-[#6c42e2]' : 'bg-gray-700'}`} // Purple and greyish background
                    onClick={() => handleTabChange('security')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'security' ? 'active' : 'inactive'}
                >
                    Security
                </motion.button>
                <motion.button
                    className={`flex-1 py-2 text-white font-semibold focus:outline-none ${activeTab === 'auditing' ? 'bg-[#6c42e2]' : 'bg-gray-700'}`}
                    onClick={() => handleTabChange('auditing')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'auditing' ? 'active' : 'inactive'}
                >
                    Auditing
                </motion.button>
                <motion.button
                    className={`flex-1 py-2 text-white font-semibold rounded-r-lg focus:outline-none ${activeTab === 'monitoring' ? 'bg-[#6c42e2]' : 'bg-gray-700'}`}
                    onClick={() => handleTabChange('monitoring')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'monitoring' ? 'active' : 'inactive'}
                >
                    Monitoring
                </motion.button>
            </div>

            {/* Main Content Below the Tabs */}
            <div className="flex flex-col md:flex-row" style={{ fontFamily: "'Roboto'" }}>
                {/* Right Side Content */}
                <div className="flex-grow flex flex-col">
                    <AnimatePresence>
                        <motion.div
                            className=" p-4 rounded-lg flex-grow" 
                            style={{ minHeight: '300px' }}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {activeTab === 'security' && (
                                <div>
                                    <h2 className="text-4xl font-bold text-center text-white">Security</h2>
                                    <p className="text-lg text-center text-gray-300 mt-7">
                                        Ensure that your smart contracts are secure and free from vulnerabilities before deployment.
                                    </p>

                                    <div className="mt-6">
                                        <OrbitingCirclesDemo />
                                    </div>
                                </div>
                            )}
                            {activeTab === 'auditing' && (
                                <div>
                                    <h2 className="text-4xl text-center font-bold text-white">Auditing</h2>
                                    <p className="text-lg text-center text-gray-300 mt-4">
                                        Audit the codebase and transaction history to ensure compliance and integrity of the smart contract.
                                    </p>
                                    <motion.div
                                        className="h-[500px] bg-black mt-4 flex justify-center items-center"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={offchain}
                                            alt="Auditing illustration"
                                            className="h-full object-contain"
                                        />
                                    </motion.div>
                                </div>
                            )}
                            {activeTab === 'monitoring' && (
                                <div>
                                    <h2 className="text-4xl text-center font-bold text-white">Monitoring</h2>
                                    <p className="text-lg text-center text-gray-300 mt-4">
                                        Monitor on-chain activity to detect potential issues or anomalies in real time.
                                    </p>
                                    <div className="mt-6">
                                        <Monitoring />
                                    </div>
                                </div>
                            )}

                            {/* Dynamic Go Button */}
                            <div className="mt-6 flex justify-center">
                                <motion.button
                                    onClick={handleNavigate}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="px-6 py-2 bg-black border border-[#a09e9e] p-1 text-white font-semibold rounded-lg hover:bg-[#6c42e2]" // Purple hover effect
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {buttonText}
                                </motion.button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SwitchNet;
