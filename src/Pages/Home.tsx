import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';  // Hook to detect when elements are in view
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { DotPattern } from "../Components/ui/dot-pattern";
import { cn } from '../../src/lib/utils';
import { AnimatedBeamDemo } from '../Components/Graph';
// import tick from "../assets/icons8-checkmark.svg";
// import TweetCard from '../Components/ClientTweetCard';
import SwitchNet from '../Components/SwitchNet';
import FAQSection from '../Components/FAQ';
// Import icons for your cards
import { DotPatternHover } from '../Components/ui/Hoverdots';




// import { ExpandableCardDemo } from '../Components/TeamCards';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const faqRef = useRef<HTMLDivElement | null>(null);  // Create ref for FAQ section
  const howItWorksRef = useRef<HTMLDivElement | null>(null); // Create ref for "How it works"
  const switchNetRef = useRef<HTMLDivElement | null>(null);  // Create ref for SwitchNet section

  const goToonchain = () => {
    navigate('/dashboard');
  };
  const goTooffchain = () => {
    navigate('/offchain');
  }
  const scrollToFeatures = () => {
    howItWorksRef?.current?.scrollIntoView({ behavior: "smooth" });
    // setIsSidebarOpen(false);
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



  // Use Framer Motion's `useAnimation` to control the animation
  const controls = useAnimation();
  const [, inView] = useInView({ triggerOnce: true, threshold: 0.2 });




  // Trigger animation when cards are in view
  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <>

      <div className="app-background min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <Navbar faqRef={faqRef} howItWorksRef={howItWorksRef} switchNetRef={switchNetRef} />
        <DotPatternHover>
          {/* Pass refs to Navbar */}


          <motion.div
            className="flex flex-col justify-center items-center text-center mb-16 mt-24"
            initial="hidden"
            animate="visible"
            variants={textVariant}
          >

            <p className="text-white text-2xl md:text-5xl font-extralight mt-2 md:mt-4" style={{ fontFamily: "'Roboto'" }}>
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
            <DotPattern
              className={cn("[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]")}
            />

            <motion.div
              className="mt-8"
              initial="hidden"
              animate="visible"
              variants={buttonVariant}
            >
              <button
                className="px-10 py-3 text-white purple-gradient-button mt-7 z-10 rounded-xl font-bold text-lg"
                onClick={scrollToFeatures}
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>



          <hr className="w-[76%] border-t justify-center border-gray-500 my-10 mx-auto" />



          {/* "How it Works" section */}

          <motion.div
            ref={howItWorksRef}
            className="flex w-full justify-between items-center flex-col lg:flex-row"
            initial="hidden"
            animate="visible"
            variants={sectionVariant}
          >
            <div className='flex justify-between flex-col w-full mt-[2%]' style={{ fontFamily: "Roboto" }}>
              <h1 className='text-4xl text-white mb-5 text-center'>What do we Offer?</h1>
              <div className='w-full flex flex-col items-center'>
                <AnimatedBeamDemo />
              </div>
              <div className='flex justify-center gap-9'>
                <button className="px-10 py-3 text-white gradient-button mt-7 rounded-xl font-bold text-lg" onClick={goToonchain}>
                  Pre Deployment
                </button>
                <button className="px-10 py-3 text-white gradient-button mt-7 rounded-xl font-bold text-lg" onClick={goTooffchain}>
                  Post Deployment
                </button>
              </div>
            </div>
          </motion.div>

          {/* Lazy Loading Cards */}

          <hr className="w-[76%] border-t justify-center border-gray-500 my-10 mx-auto" />



          <div ref={switchNetRef}>
            <SwitchNet />
          </div>

          <hr className="w-[76%] border-t justify-center border-gray-500 my-10 mx-auto" />


          <div ref={faqRef}>
            <FAQSection />
          </div>


          <Footer />
        </DotPatternHover>
      </div>

    </>
  );
};

export default Home;
