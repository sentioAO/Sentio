import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

    const tabButtonVariants = {
        active: { scale: 1.05, backgroundColor: '#6C3AE1' }, // Purple for active tab
        inactive: { scale: 1, backgroundColor: 'gray' }, // Darker purple for inactive
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6  flex flex-col" style={{fontFamily:"'Amaranth'"}}>
            {/* Tab Selection at the Top */}
            <div className="flex justify-center mb-4">
                <motion.button
                    className="flex-1 py-2 text-white font-semibold rounded-l-xl focus:outline-none bg-gray-700"
                    onClick={() => handleTabChange('security')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'security' ? 'active' : 'inactive'}
                >
                    Security
                </motion.button>
                <motion.button
                    className="flex-1 py-2 text-white font-semibold focus:outline-none bg-gray-700"
                    onClick={() => handleTabChange('auditing')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'auditing' ? 'active' : 'inactive'}
                >
                    Auditing
                </motion.button>
                <motion.button
                    className="flex-1 py-2 text-white font-semibold rounded-r-xl focus:outline-none bg-gray-700"
                    onClick={() => handleTabChange('monitoring')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'monitoring' ? 'active' : 'inactive'}
                >
                    Monitoring
                </motion.button>
            </div>

            {/* Main Content Below the Tabs */}
            <div className="flex flex-col md:flex-row" style={{ fontFamily: "'Amaranth'" }}>
                {/* Right Side Content */}
                <div className="flex-grow flex flex-col" style={{ minHeight: '500px', width: '100%' }}>
                    <div className="p-4 rounded-lg flex-grow" style={{ minHeight: '500px' }}>
                        {activeTab === 'security' && (
                            <div>
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
                                <p className="text-lg text-center text-gray-300 mt-4">
                                    Audit the codebase and transaction history to ensure compliance and integrity of the smart contract.
                                </p>
                                <div className="h-[500px] bg-black mt-4 flex justify-center items-center">
                                    <img
                                        src={offchain}
                                        alt="Auditing illustration"
                                        className="h-full object-contain"
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === 'monitoring' && (
                            <div>
                                <p className="text-lg text-center text-gray-300 mt-4">
                                    Monitor on-chain activity to detect potential issues or anomalies in real time.
                                </p>
                                <div className="mt-6 h-[500px] w-full ">
                                    <Monitoring />
                                </div>
                            </div>
                        )}

                        {/* Dynamic Go Button */}
                        <div className="mt-6 flex justify-center">
                            <motion.button
                                onClick={handleNavigate}
                                className="px-6 py-2 gradient-button p-1  text-white font-semibold rounded-xl hover:bg-[#6c42e2]"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {buttonText}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwitchNet;
