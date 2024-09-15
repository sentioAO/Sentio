import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaListAlt, FaSearch, FaBell, FaPauseCircle } from 'react-icons/fa';
import { BsArrowDown } from 'react-icons/bs';
import Navbar from '../Components/Navbar';

const SentinelProcess = () => {
  const [step, setStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextStep = () => setStep(step + 1);

  // Scroll to the latest step
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [step]);

  // Animation variants
  const stepVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const arrowVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
  };

  // Sending Animation - simulating a Wi-Fi-like connection
  const waveVariant = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } },
  };

  return (
    <div className="app-background min-h-screen flex flex-col items-center bg-[#1a1a1a] text-white">
      <Navbar />
      <div
        className="sentinel-setup p-6 rounded-lg w-full max-w-3xl mx-auto mt-12 overflow-y-auto"
        ref={containerRef}
        style={{ height: '80vh' }} // To allow vertical scrolling
      >
        {/* Step 1 */}
        <motion.div
          className="step-content text-center"
          initial="hidden"
          animate="visible"
          variants={stepVariant}
        >
          <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center">
            <FaWallet className="mr-2" /> Step 1: Connect Your Wallet
          </h2>
          <p className="text-gray-400 mb-6">
            Connect your wallet to get started with monitoring your active processes.
          </p>
          <motion.button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={nextStep}
            initial="hidden"
            animate="visible"
            variants={buttonVariant}
          >
            Connect Wallet
          </motion.button>
        </motion.div>

        {/* Arrow between steps */}
        {step >= 2 && (
          <motion.div
            className="flex justify-center my-4"
            initial="hidden"
            animate="visible"
            variants={arrowVariant}
          >
            <BsArrowDown className="text-white text-2xl" />
          </motion.div>
        )}

        {/* Step 2 */}
        {step >= 2 && (
          <motion.div
            className="step-content text-center"
            initial="hidden"
            animate="visible"
            variants={stepVariant}
          >
            <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center">
              <FaListAlt className="mr-2" /> Step 2: Active Processes
            </h2>
            <p className="text-gray-400 mb-6">
              Your active processes will be listed here. Select a process to monitor.
            </p>
            <motion.button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={nextStep}
              initial="hidden"
              animate="visible"
              variants={buttonVariant}
            >
              Select a Process
            </motion.button>
          </motion.div>
        )}

        {/* Arrow between steps */}
        {step >= 3 && (
          <motion.div
            className="flex justify-center my-4"
            initial="hidden"
            animate="visible"
            variants={arrowVariant}
          >
            <BsArrowDown className="text-white text-2xl" />
          </motion.div>
        )}

        {/* Step 3 */}
        {step >= 3 && (
          <motion.div
            className="step-content text-center"
            initial="hidden"
            animate="visible"
            variants={stepVariant}
          >
            <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center">
              <FaSearch className="mr-2" /> Step 3: Setup Sentinel Process
            </h2>
            <ul className="text-gray-400 list-disc pl-6 mb-6 text-left inline-block">
              <li>Download the sentinel package.</li>
              <li>Set up the constructor with the sentinel ID.</li>
              <li>Start sending messages from the process to the sentinel.</li>
            </ul>
            <motion.button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={nextStep}
              initial="hidden"
              animate="visible"
              variants={buttonVariant}
            >
              Finish Setup
            </motion.button>
          </motion.div>
        )}

        {/* Sending Animation - Process sends messages to sentinel */}
        {step >= 3 && (
          <div className="relative flex justify-center items-center mt-12">
            {/* Process Icon */}
            <div className="mr-6 text-white text-center">
              <span className="block text-lg">Process</span>
              <FaListAlt className="text-4xl" />
            </div>

            {/* SVG Path (Wi-Fi like connection) */}
            <motion.svg
              className="w-48 h-32"
              viewBox="0 0 100 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10 40 Q 50 0, 90 40"
                stroke="blue"
                strokeWidth="2"
                fill="transparent"
                variants={waveVariant}
                initial="hidden"
                animate="visible"
              />
              <motion.circle
                cx="10"
                cy="40"
                r="2"
                fill="blue"
                variants={waveVariant}
                initial="hidden"
                animate="visible"
              />
            </motion.svg>

            {/* Sentinel Icon (Magnifying glass) */}
            <div className="ml-6 text-white text-center">
              <span className="block text-lg">Sentinel</span>
              <FaSearch className="text-4xl" />
            </div>
          </div>
        )}

        {/* Arrow between steps */}
        {step >= 4 && (
          <motion.div
            className="flex justify-center my-4"
            initial="hidden"
            animate="visible"
            variants={arrowVariant}
          >
            <BsArrowDown className="text-white text-2xl" />
          </motion.div>
        )}

        {/* Step 4 - Sentinel Actions */}
        {/* Step 4 - Sentinel Actions */}
        {step >= 4 && (
          <motion.div
            className="step-content text-center mt-12"
            initial="hidden"
            animate="visible"
            variants={stepVariant}
          >
            <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center">
              <FaBell className="mr-2" /> Sentinel Actions
            </h2>
            <ul className="text-gray-400 list-disc pl-6 mb-6 text-left inline-block">
              <li>Notification on suspicious activity.</li>
              <li>
                <FaPauseCircle className="inline-block mr-1" /> Pause the process if a high-level vulnerability is detected.
              </li>
            </ul>

            {/* Arrow for Actions from Sentinel */}
            <div className="relative flex justify-center items-center mt-8">
              {/* Sentinel Icon at the center */}
              <div className="absolute text-white text-center">
                <span className="block text-lg">Sentinel</span>
                <FaSearch className="text-4xl" />
              </div>

              {/* Path going to User Notification */}
              <motion.svg
                className="absolute left-1/4 w-32 h-16"
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M90 40 Q 50 0, 10 40"  // Adjusted for right to left
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
                className="absolute right-1/4 w-32 h-16"
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M10 40 Q 50 0, 90 40"  // Adjusted for left to right
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
                <span className="block text-lg text-white">User Notification</span>
                <FaBell className="text-3xl text-white" />
              </div>

              <div className="absolute right-1/4 flex flex-col items-center">
                <span className="block text-lg text-white">Process</span>
                <FaListAlt className="text-4xl text-white" />
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default SentinelProcess;
