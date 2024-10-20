import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import { OrbitingCirclesDemo } from './Cricles';

const SwitchNet: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'security' | 'monitoring' | 'auditing'>('security');
    const [buttonText, setButtonText] = useState<string>('Go to Security');
    const navigate = useNavigate();

    const handleTabChange = (tab: 'security' | 'monitoring' | 'auditing') => {
        setActiveTab(tab);
        setButtonText(tab === 'security' ? 'Go to Security' : tab === 'monitoring' ? 'Go to Monitoring' : 'Go to Auditing');
    };

    const handleNavigate = () => {
        if (activeTab === 'security') {
            navigate('/security');
        } else if (activeTab === 'monitoring') {
            navigate('/monitoring');
        } else {
            navigate('/auditing');
        }
    };

    const handleMouseEnter = () => {
        if (activeTab === 'security') {
            setButtonText('Ensure Code Security');
        } else if (activeTab === 'monitoring') {
            setButtonText('Monitor & Analyze Process');
        } else {
            setButtonText('Audit Process Code');
        }
    };

    const handleMouseLeave = () => {
        setButtonText(activeTab === 'security' ? 'Go to Security' : activeTab === 'monitoring' ? 'Go to Monitoring' : 'Go to Auditing');
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
        <div className="w-full max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg flex flex-col"> {/* Greyish background */}

            {/* Tab Selection at the Top */}
            <div className="flex justify-center mb-4">
                <motion.button
                    className={`flex-1 py-2 text-white font-semibold rounded-l-lg focus:outline-none ${activeTab === 'security' ? 'bg-[#6c42e2]' : 'bg-gray-700'}`} // Purple and greyish background
                    onClick={() => handleTabChange('security')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'security' ? 'active' : 'inactive'}
                >
                    Security
                </motion.button>
                <motion.button
                    className={`flex-1 py-2 text-white font-semibold focus:outline-none ${activeTab === 'monitoring' ? 'bg-[#6c42e2]' : 'bg-gray-700'}`}
                    onClick={() => handleTabChange('monitoring')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'monitoring' ? 'active' : 'inactive'}
                >
                    Monitoring
                </motion.button>
                <motion.button
                    className={`flex-1 py-2 text-white font-semibold rounded-r-lg focus:outline-none ${activeTab === 'auditing' ? 'bg-[#6c42e2]' : 'bg-gray-700'}`}
                    onClick={() => handleTabChange('auditing')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'auditing' ? 'active' : 'inactive'}
                >
                    Auditing
                </motion.button>
            </div>

            {/* Main Content Below the Tabs */}
            <div className="flex flex-col md:flex-row">
                {/* Right Side Content */}
                <div className="flex-grow flex flex-col">
                    <AnimatePresence>
                        <motion.div
                            className="bg-gray-700 p-4 rounded-lg flex-grow" // Greyish background for content area
                            style={{ minHeight: '300px' }} 
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {activeTab === 'security' && (
                                <div>
                                    <h2 className="text-lg font-bold text-white">Security</h2>
                                    <p className="text-sm text-gray-300 mt-7">
                                        Ensure that your smart contracts are secure and free from vulnerabilities before deployment.
                                    </p>
                                
                                    <div className="mt-6">
                                        <OrbitingCirclesDemo />
                                    </div> 
                                </div>
                            )}
                            {activeTab === 'monitoring' && (
                                <div>
                                    <h2 className="text-lg font-bold text-white">Monitoring</h2>
                                    <p className="text-sm text-gray-300 mt-4">
                                        Monitor on-chain activity to detect potential issues or anomalies in real time.
                                    </p>
                                </div>
                            )}
                            {activeTab === 'auditing' && (
                                <div>
                                    <h2 className="text-lg font-bold text-white">Auditing</h2>
                                    <p className="text-sm text-gray-300 mt-4">
                                        Audit the codebase and transaction history to ensure compliance and integrity of the smart contract.
                                    </p>
                                </div>
                            )}

                            {/* Dynamic Go Button */}
                            <div className="mt-6 flex justify-center">
                                <motion.button
                                    onClick={handleNavigate}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="px-6 py-2 bg-transparent border border-[#a09e9e] p-1 text-white font-semibold rounded-lg hover:bg-[#6c42e2]" // Purple hover effect
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
