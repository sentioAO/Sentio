import React from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaListAlt, FaPauseCircle, FaSearch } from 'react-icons/fa';

const Monitoring = () => {
    // Sending Animation - simulating a Wi-Fi-like connection
    const waveVariant = {
        hidden: { pathLength: 0 },
        visible: { pathLength: 1, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } },
    };
    const stepVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="bg-black p-6 rounded-lg border h-[500px] w-full">
            <motion.div
                className="step-content text-center mt-6"
                initial="hidden"
                animate="visible"
                variants={stepVariant}
            >
                <h2 className="text-4xl text-white font-semibold mb-4 flex justify-center items-center">
                    <motion.div
                        className="mr-4"
                        animate={{
                            rotate: [0, -20, 20, -20, 20, 0],
                        }}
                        transition={{
                            duration: 1, 
                            ease: "easeInOut", 
                            repeat: Infinity,
                            repeatType: "loop", 
                        }}
                    >
                        <FaBell />
                    </motion.div>
                    Sentinel Actions
                </h2>
                <div className="flex justify-center text-center items-center">
                    <ul className="mt-4 text-gray-400 pl-6 px-4 mb-16 inline-block list">
                        <li>Notification on suspicious activity.</li>
                        <li>
                            <FaPauseCircle className="inline-block mr-1" /> Pause the process if a high-level vulnerability is detected.
                        </li>
                    </ul>
                </div>
                {/* Arrow for Actions from Sentinel */}
                <div className="relative flex flex-col sm:flex-row justify-center items-center mt-8">
                    {/* Sentinel Icon at the center */}
                    <div className="absolute text-white text-center">
                        <span className="block text-lg">Sentinel</span>
                        <FaSearch className="text-4xl ml-2 mb-16" />
                    </div>

                    {/* Path going to User Notification */}
                    <motion.svg
                        className="absolute left-1/3 w-32 h-16"
                        viewBox="0 0 100 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M90 40 Q 50 0, 10 40" // Adjusted for right to left
                            stroke="green"
                            strokeWidth="2"
                            fill="transparent"
                            variants={waveVariant}
                            initial="hidden"
                            animate="visible"
                        />
                    </motion.svg>

                    {/* Path going to Process Pause */}
                    <motion.svg
                        className="absolute right-1/3 w-32 h-16"
                        viewBox="0 0 100 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M10 40 Q 50 0, 90 40" // Adjusted for left to right
                            stroke="red"
                            strokeWidth="2"
                            fill="transparent"
                            variants={waveVariant}
                            initial="hidden"
                            animate="visible"
                        />
                    </motion.svg>

                    {/* Icons for User Notification and Process */}
                    <div className="absolute left-1/4 flex flex-col items-center">
                        <span className="block text-lg text-white">Notify</span>
                        <FaBell className="text-3xl mr-2 text-white" />
                    </div>

                    <div className="absolute right-1/4 flex flex-col items-center">
                        <span className="block text-lg text-white">Process</span>
                        <FaListAlt className="text-4xl text-white" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Monitoring;
