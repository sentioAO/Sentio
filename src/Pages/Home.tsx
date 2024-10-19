import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { DotPattern } from "../Components/ui/dot-pattern";
import { cn } from '../../src/lib/utils';
import { AnimatedBeamDemo } from '../Components/Graph';
import tick from "../assets/icons8-checkmark.svg";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  // Animation variants for different components
  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
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

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 },
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
            Enter an End To End Pipeline with <br /> Security, analysis and{" "}
            <motion.span
              className="inline-block px-2 py-1 font-extrabold text-[#9966ff] rounded-lg"
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
              className="px-10 py-3 text-white bg-[#9966FF] mt-7 z-10 rounded-xl font-bold text-lg"
              onClick={goToDashboard}
            >
              Get Started
            </button>
          </motion.div>
        </motion.div>

        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
          )}
        />

        <hr className="w-[50%] border-t border-gray-500 mt-10 my-10" />

        <motion.div
          className="flex w-3/4 justify-between items-center"
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
        >
          <div>
            <h1 className='text-4xl text-white mb-5'>
              How it Works
            </h1>
            <ul className="list-none text-white">
              <li className="flex items-center mb-2 gap-3">
                <div className='border items-center w-12' style={{ borderRadius: "100%" }}>
                  <img src={tick} alt="tick" className="" />
                </div>
                Feature 1
              </li>
              <li className="flex items-center mb-2 gap-3">
                <div className='border items-center w-12' style={{ borderRadius: "100%" }}>
                  <img src={tick} alt="tick" className="" />
                </div>
                Feature 2
              </li>
              <li className="flex items-center mb-2 gap-3">
                <div className='border items-center w-12' style={{ borderRadius: "100%" }}>
                  <img src={tick} alt="tick" className="" />
                </div>
                Feature 3
              </li>
            </ul>
          </div>
          <div className='w-1/2 flex flex-col items-center'>
            <AnimatedBeamDemo />
          </div>
        </motion.div>

        <hr className="w-[50%] border-t border-gray-500 mt-10 my-10" />

        <Footer />
      </div>
    </>
  );
};

export default Home;
