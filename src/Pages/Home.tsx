import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';  // Hook to detect when elements are in view
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { DotPattern } from "../Components/ui/dot-pattern";
import { cn } from '../../src/lib/utils';
import { AnimatedBeamDemo } from '../Components/Graph';
import tick from "../assets/icons8-checkmark.svg";
import TweetCard from '../Components/ClientTweetCard';
import SwitchNet from '../Components/SwitchNet';
import FAQSection from '../Components/FAQ';
import CustomCard from '../Components/Cards';
import { FaLock, FaCheckCircle, FaEye } from 'react-icons/fa'; // Import icons for your cards
import { DotPatternHover } from '../Components/ui/Hoverdots';




// import { ExpandableCardDemo } from '../Components/TeamCards';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const faqRef = useRef<HTMLDivElement | null>(null);  // Create ref for FAQ section
  const howItWorksRef = useRef<HTMLDivElement | null>(null); // Create ref for "How it works"
  const switchNetRef = useRef<HTMLDivElement | null>(null);  // Create ref for SwitchNet section

  // const goToDashboard = () => {
  //   navigate('/dashboard');
  // };

  const goToonchain = () => {
    navigate('/dashboard');
  };

  const goTooffchain = () => {
    navigate('/offchain');
  };

  const goToDocs = () => {
    window.location.href = 'https://sentio-docs.vercel.app/';
  }

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

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, duration: 0.5 },
    }),
  };

  // Use Framer Motion's `useAnimation` to control the animation
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });




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
              <div className='flex gap-9'>
                <button
                  className="px-10 py-3 text-white bg-[#9966FF] mt-7 z-10 hover:bg-white hover:text-[#9966FF] rounded-xl font-bold text-lg"
                  onClick={goToonchain}
                >
                  On Chain
                </button>

                <button
                  className="px-10 py-3 text-white bg-[#9966FF] hover:bg-white hover:text-[#9966FF] mt-7 z-10 rounded-xl font-bold text-lg"
                  onClick={goTooffchain}
                >
                  Off Chain
                </button>

              </div>

              <div>
                <button className='py-4 px-6 bg-transperant outline text-[#9966FF] hover:text-white mt-7 z-10 rounded-xl font-bold text-lg' onClick={goToDocs}>
                  Explore Docs
                </button>
              </div>
            </motion.div>
          </motion.div>



          <hr className="w-full border-t justify-center border-gray-500  my-10" />

          {/* "How it Works" section */}
          <motion.div
            ref={howItWorksRef}
            className="flex w-full justify-between items-center flex-col lg:flex-row"
            initial="hidden"
            animate="visible"
            variants={sectionVariant}
          >
            <div className='flex justify-between  ' >
              <div className='w-[100%]'>

                <h1 className='text-4xl text-white mb-5'>How it Works</h1>
                <ul className="list-none text-white">
                  <li className="flex items-center mb-2 gap-3">
                    <div className='border items-center w-12' style={{ borderRadius: "100%" }}>
                      <img src={tick} alt="tick" />
                    </div>
                    1. Analyzes the CodeBase Ensuring Pre Deployment Security
                  </li>
                  <li className="flex items-center mb-2 gap-3">
                    <div className='border items-center w-12' style={{ borderRadius: "100%" }}>
                      <img src={tick} alt="tick" />
                    </div>
                    2. Fetches your Inbox Cronically and Monitors the Transactions
                  </li>
                  <li className="flex items-center mb-2 gap-3">
                    <div className='border items-center w-12' style={{ borderRadius: "100%" }}>
                      <img src={tick} alt="tick" />
                    </div>
                    3. In Case of Security Breach, Notifies the User Immediately
                  </li>
                </ul>
              </div>

              <div className='w-1/2 flex flex-col items-center'>
                <div className='ml-[200%]'>
                  <AnimatedBeamDemo />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lazy Loading Cards */}
          <div ref={ref} className="cards flex flex-row gap-20 mt-10">
            {[
              {
                functionality: "Real-Time Security Alerts",
                glowColor: "red",
                icon: FaLock,
                title: "SECURITY",
                description: "Secure your messages with the power of Sentinels, ensuring immediate alerts for any security breaches."
              },
              {
                functionality: "Comprehensive Code Auditing and Certification",
                glowColor: "yellow",
                icon: FaCheckCircle,
                title: "AUDITING",
                description: "In-depth code auditing with certification to identify and mitigate potential threats before deployment on Arweave."
              },
              {
                functionality: "Continuous Threat Monitoring and Alerts",
                glowColor: "green",
                icon: FaEye,
                title: "MONITORING",
                description: "A continuous process monitoring and alerting system designed to keep you safe from potential threats in your messages."
              }

            ].map((card, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate={controls}
                variants={cardVariants}
              >
                <CustomCard
                  functionality={card.functionality}
                  glowColor={card.glowColor}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />

              </motion.div>

            ))}
          </div>


          <hr className="w-full border-t justify-center border-gray-500  my-10" />





          <div ref={switchNetRef}>
            <SwitchNet />
          </div>


          <motion.div
            className="flex w-full gap-2 max-h text-white flex-wrap justify-center"
            initial="hidden"
            animate="visible"
            variants={sectionVariant}
          >
            <hr className="w-full border-tjustify-center border-gray-500  my-10" />
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 lg:justify-between">
              <div className="flex flex-col items-center justify-center w-[90%] sm:w-1/3 h-[450px] max-h-[450px] overflow-hidden">
                <TweetCard id="1845372593144201450" />
              </div>
              <div className="flex flex-col items-center justify-center w-[90%] sm:w-1/3 h-[450px] max-h-[450px] overflow-hidden">
                <TweetCard id="1844334374558499117" />
              </div>
            </div>
          </motion.div>
          <hr className="w-full border-tjustify-center border-gray-500  my-10" />

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
