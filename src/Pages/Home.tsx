import React from 'react';
import { FaLock, FaCheckCircle, FaEye } from 'react-icons/fa'; // Import icons for your cards
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import CustomCard from '../Components/Cards'; // Import the CustomCard component
import Navbar from '../Components/Navbar';
import SwitchNet from '../Components/SwitchNet';

const Home: React.FC = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleJoinWaitlist = () => {
    navigate('/wait'); // Navigate to /wait when the button is clicked
  };

  // Animation variants for text and button
  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }, // Smoother easing curve
    },
  };

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeInOut',
        staggerChildren: 0.2, // Add delay between cards
      },
    },
  };

  return (
    <>
      <div className="app-background min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <Navbar />

        <motion.div
          className="flex flex-col justify-center items-center text-center mb-16 mt-24"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          <p
            className="text-white text-2xl md:text-3xl font-extralight mt-2 md:mt-4"
            style={{ fontFamily: "'Roboto'" }}
          >
            You Write, We{' '}
            <motion.span
              className="inline-block px-2 py-1 border font-extrabold border-gray-500 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
            >
              Monitor
            </motion.span>
          </p>

          <motion.div
            className="mt-8"
            initial="hidden"
            animate="visible"
            variants={buttonVariant}
          >
            <button
              className="px-10 py-3 bg-white rounded-xl font-bold text-lg"
              onClick={handleJoinWaitlist}
            >
              Join Waitlist
            </button>
          </motion.div>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center mb-4 items-center px-6"
          initial="hidden"
          animate="visible"
          variants={cardVariant}
        >
          <CustomCard
            functionality="Notifying of Security Breach"
            glowColor="green"
            icon={FaLock}
            title="SECURITY"
            description="Any Security Breach Will Be Notified To The User Immediately To Take Necessary Actions."
          />
          <CustomCard
            functionality="Auditing Process Code"
            glowColor="yellow"
            icon={FaCheckCircle}
            title="AUDITING"
            description="Auditing Process Code To Ensure The Security Of The Process And The Data."
          />
          <CustomCard
            functionality="Monitoring and Analyzing Process"
            glowColor="red"
            icon={FaEye}
            title="MONITORING"
            description="Monitoring And Analyzing The Process To Ensure The Security And Integrity Of The Data."
          />
        </motion.div>

        <hr className="w-[50%] border-t border-gray-500 mt-10 my-10" />

        <SwitchNet />
      </div>
    </>
  );
};

export default Home;
