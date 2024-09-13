import React from 'react';
import { FaLock, FaCheckCircle, FaEye } from 'react-icons/fa'; // Import icons for your cards
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import CustomCard from '../Components/Cards'; // Import the CustomCard component

import Navbar from '../Components/Navbar';
import SwitchNet from '../Components/SwitchNet';


const Home: React.FC = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleJoinWaitlist = () => {
    navigate('/wait'); // Navigate to /wait when the button is clicked
  };

  // const active = useActiveAddress(); // Call the useActiveAddress hook outside of the callback function


  return (
    <>
      <div className='app-background flex flex-col justify-center items-center'>

        <Navbar />
        <div className="flex flex-col justify-center items-center text-center mb-16 mt-24">
          <p
            className="text-white text-2xl md:text-3xl font-extralight mt-2 md:mt-4"
            style={{ fontFamily: "'Roboto'" }}
          >
            You Write, We{' '}
            <span className="inline-block px-2 py-1 border font-extrabold border-gray-500 rounded-lg">
              Monitor
            </span>
          </p>

          {/* <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button className="px-6 py-3 bg-white rounded-xl font-bold">Offchain</button>
            <button onClick={handleOnchainClick} className="px-6 py-3 bg-white rounded-xl font-bold">Onchain</button>
          </div> */}

          <div className="mt-8">
            <button className="px-10 py-3 bg-white rounded-xl font-bold text-lg" onClick={handleJoinWaitlist}>
              Join Waitlist
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center mb-4 items-center px-6">
          <CustomCard
            glowColor='green'
            icon={FaLock}
            title="SECURITY"
            description="Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua."
          />
          <CustomCard
            glowColor='yellow'
            icon={FaCheckCircle}
            title="AUDITING"
            description="Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat."
          />
          <CustomCard
            glowColor='red'
            icon={FaEye}
            title="MONITORING"
            description="Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua."
          />
        </div>
        <div className='mt-7 '>

          <SwitchNet />
        </div>
      </div>
    </>
  )
};
export default Home;
