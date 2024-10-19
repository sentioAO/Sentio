import React from 'react';
// import { FaLock, FaCheckCircle, FaEye } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { motion } from 'framer-motion'; // Import Framer Motion for animations
// import CustomCard from '../Components/Cards';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { DotPattern } from "../Components/ui/dot-pattern";
import { cn } from '../../src/lib/utils';
import OrbitalAnimation from '../Components/Orbitals';
import SecurityAuditingMonitoring from  '../../src/Components/SAM';


// import ClientTweetCard from '../../src/Components/ClientTweetCard';
const Home: React.FC = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const goToDashboard = () => {
    navigate('/dashboard'); // Navigate to /wait when the button is clicked
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

  // const cardVariant = {
  //   hidden: { opacity: 0, scale: 0.9 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       duration: 0.7,
  //       ease: 'easeInOut',
  //       staggerChildren: 0.2, // Add delay between cards
  //     },
  //   },
  // };

  return (
    <>
      <div className="app-background min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <Navbar />
        
        <OrbitalAnimation/>
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
              className="px-10 py-3 text-white outline  rounded-xl font-bold text-lg  "
              onClick={goToDashboard}
            >
              Get Started
            </button>
          </motion.div>
        </motion.div>
        <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
        {/* Cards Section
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
        </motion.div> */}
        <hr className="w-[50%] border-t border-gray-500 mt-10 my-10" />
        <SecurityAuditingMonitoring/>
        <hr className="w-[50%] border-t border-gray-500 mt-10 my-10" />
          
          {/* Tweets Section */}
        {/* <div className="flex justify-center items-center space-x-4">
          <ClientTweetCard id="1845372595656630434" className='shadow-2xl' />
          <ClientTweetCard id="1845372597590163659" className='shadow-2xl' />
          <ClientTweetCard id="1845372599687315484" className='shadow-2xl' />
          <ClientTweetCard id="1845372601805439043" className='shadow-2xl' />
        </div> */}

        <Footer />
      </div>
    </>
  );
};

export default Home;
