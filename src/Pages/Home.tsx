import React from 'react';
// import { FaLock, FaCheckCircle, FaEye } from 'react-icons/fa'; // Import icons for your cards
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { motion } from 'framer-motion'; // Import Framer Motion for animations
// import CustomCard from '../Components/Cards'; // Import the CustomCard component
import Navbar from '../Components/Navbar';
// import SwitchNet from '../Components/SwitchNet';
import Footer from '../Components/Footer';
import { DotPattern } from "../Components/ui/dot-pattern";
import { cn } from '../../src/lib/utils';
import { AnimatedBeamDemo } from '../Components/Graph';
// import OrbitalAnimation from '../Components/Orbitals';
import tick from "../assets/icons8-checkmark.svg"
// import ClientTweetCard from '../Components/ClientTweetCard';

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
            className="text-white text-2xl md:text-5xl font-extralight mt-2 md:mt-4"
            style={{ fontFamily: "'Roboto'" }}
            >
            Enter an End To End Pipeline with <br/> Security, analysis and{" "}
            <motion.span
              className="inline-block px-2 py-1  font-extrabold text-[#9966ff]  rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
            >
              Monitoring
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
        

        <hr className="w-[50%] border-t border-gray-500 mt-10 my-10" />
        <div className='flex w-3/4 justify-between items-center'>
          <div>

            <h1 className='text-4xl text-white mb-5'>
              How it Works
            </h1>
            <ul className="list-none text-white">

              <li className="flex items-center mb-2 gap-3">
                <div className=' border items-center w-12 ' style={{borderRadius:"100%"}}>
                  <img src={tick} alt="tick" className="" />
                </div>
                Feature 1
              </li>
              <li className="flex items-center mb-2 gap-3">
                <div className=' border items-center w-12 ' style={{borderRadius:"100%"}}>
                  <img src={tick} alt="tick" className="" />
                </div>
                Feature 1
              </li>
              <li className="flex items-center mb-2 gap-3">
                <div className=' border items-center w-12 ' style={{borderRadius:"100%"}}>
                  <img src={tick} alt="tick" className="" />
                </div>
                Feature 1
              </li>
            </ul>
          </div>
          <div className='w-1/2 flex flex-col items-center'>

            <AnimatedBeamDemo />
          </div>
        </div>

        <hr className="w-[50%] border-t border-gray-500 mt-10 my-10" />

        

        <Footer />
      </div>
    </>
  );
};

export default Home;
