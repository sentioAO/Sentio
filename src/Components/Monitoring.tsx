"use client";

import { motion } from 'framer-motion';
import { FaBell, FaListAlt, FaPauseCircle, FaSearch } from 'react-icons/fa';

export default function Component() {
    const waveVariant = {
        hidden: { pathLength: 0 },
        visible: { pathLength: 1, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } },
    };
    const stepVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="bg-black p-4 sm:p-6 rounded-lg border min-h-[500px] w-full">
            <motion.div
                className="step-content text-center mt-4 sm:mt-6"
                initial="hidden"
                animate="visible"
                variants={stepVariant}
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold mb-4 flex justify-center items-center">
                    <motion.div
                        className="mr-2 sm:mr-4"
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
                        <FaBell className="text-xl sm:text-2xl md:text-3xl" />
                    </motion.div>
                    Sentinel Actions
                </h2>
                <div className="flex flex-col justify-center text-left items-center">
                    <ul className="mt-4 text-gray-400 pl-4 sm:pl-6 pr-4 sm:pr-6 mb-8 sm:mb-16 list-disc space-y-2 text-sm sm:text-base">
                        <li>Notification on suspicious activity.</li>
                        <li>
                            <FaPauseCircle className="inline-block mr-1" /> Pause the process if a high-level vulnerability is detected.
                        </li>
                    </ul>
                </div>

                {/* Paths and Icons */}
                <div className="relative flex flex-col justify-center items-center mt-8 sm:mt-16">
                    {/* Central icon */}
                    <div className="absolute text-white text-center">
                        <span className="block text-base sm:text-lg ">Sentinel</span>
                        <FaSearch className="text-2xl sm:text-3xl md:text-4xl  mx-auto mb-8 sm:mb-16" />
                    </div>

                    {/* Path going to "Notify" */}
                    <motion.svg
                        className="absolute left-[15%] mt-2 sm:left-[30%] w-24 sm:w-32 h-12 sm:h-16"
                        viewBox="0 0 100 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M90 40 Q 50 0, 10 40"
                            stroke="green"
                            strokeWidth="2"
                            fill="transparent"
                            variants={waveVariant}
                            initial="hidden"
                            animate="visible"
                        />
                    </motion.svg>

                    <motion.svg
                        className="absolute right-[15%] mt-3 sm:right-[30%] w-24 sm:w-32 h-12 sm:h-16"
                        viewBox="0 0 100 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M10 40 Q 50 0, 90 40"
                            stroke="red"
                            strokeWidth="2"
                            fill="transparent"
                            variants={waveVariant}
                            initial="hidden"
                            animate="visible"
                        />
                    </motion.svg>

                    {/* Notify icon and label */}
                    <div className="absolute left-[10%] sm:left-[25%] flex flex-col items-center mt-24 sm:mt-32">
                        <span className="block text-sm sm:text-base md:text-lg text-white">Notify</span>
                        <FaBell className="text-xl sm:text-2xl md:text-3xl text-white mt-1" />
                    </div>

                    {/* Process icon and label */}
                    <div className="absolute right-[10%] sm:right-[25%] flex flex-col items-center mt-24 sm:mt-32">
                        <span className="block text-sm sm:text-base md:text-lg text-white">Process</span>
                        <FaListAlt className="text-xl sm:text-2xl md:text-3xl text-white mt-1" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
