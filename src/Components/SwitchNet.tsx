import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import offchainImg from '../assets/offchain.png'; // Offchain image
import onchainImg from '../assets/onchain2.png';   // Onchain image

const SwitchNet: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'offchain' | 'onchain'>('offchain');
    const navigate = useNavigate();

    const handleTabChange = (tab: 'offchain' | 'onchain') => {
        setActiveTab(tab);
    };

    const handleNavigate = () => {
        if (activeTab === 'offchain') {
            navigate('/offchain'); // Navigate to the Offchain page when in Offchain tab
        } else {
            navigate('/onchain');  // Navigate to the Onchain page when in Onchain tab
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#1a1a1a] p-6 rounded-lg flex flex-col md:flex-row">
            {/* Left Image */}
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 w-full md:w-[400px] lg:w-[500px] h-auto">
                <img
                    src={activeTab === 'offchain' ? offchainImg : onchainImg} // Dynamically change image based on active tab
                    alt={activeTab === 'offchain' ? 'Offchain illustration' : 'Onchain illustration'}
                    className="rounded-lg w-full h-full object-cover"
                />
            </div>

            {/* Right Side Content */}
            <div className="flex-grow">
                {/* Tab Selection */}
                <div className="flex justify-between mb-4">
                    <button
                        className={`flex-1 py-2 text-white font-semibold ${activeTab === 'offchain' ? 'bg-gray-700' : 'bg-gray-900'
                            } rounded-l-lg focus:outline-none`}
                        onClick={() => handleTabChange('offchain')}
                    >
                        Offchain
                    </button>
                    <button
                        className={`flex-1 py-2 text-white font-semibold ${activeTab === 'onchain' ? 'bg-gray-700' : 'bg-gray-900'
                            } rounded-r-lg focus:outline-none`}
                        onClick={() => handleTabChange('onchain')}
                    >
                        Onchain
                    </button>
                </div>

                {/* Content Boxes */}
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
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
                        <button
                            onClick={handleNavigate}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
                        >
                            {activeTab === 'offchain' ? 'Go to Offchain' : 'Go to Onchain'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwitchNet;
