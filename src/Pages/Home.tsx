// import React from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import OrbitalAnimation from "../Components/Orbitals";
import Wallet from "../Components/Wallet-Button";

const Home = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleJoinWaitlist = () => {
    navigate("/wait"); // Navigate to /wait when the button is clicked
  };

  return (
    <div className="bg-[#0E0E0E] h-screen w-full flex flex-col md:flex-row relative">
      {/* Left section */}
      <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-center md:items-start md:ml-8">
        <h1 className="text-white text-4xl md:text-8xl font-light text-center md:text-left tracking-widest" style={{ fontFamily: "'Anton SC',sans-serif" }}>
          SAM
        </h1>
        <p className='text-white text-2xl md:text-3xl font-extralight text-center md:text-left mt-2 md:mt-4' style={{ fontFamily: "'Roboto'" }}>
          You Write We{' '}
          <span className="inline-block px-2 py-1 border font-extrabold border-gray-500 rounded-lg" style={{ fontFamily: "'Roboto'" }}>
            Monitor
          </span>
        </p>
        <div className='flex flex-col md:flex-row gap-4 mt-3 items-center md:items-start'>
          <button className='px-6 py-3 bg-white rounded-xl font-bold'>
            Offchain
          </button>
          <button className='px-6 py-3 bg-white rounded-xl font-bold'>
            Onchain
          </button>
        </div>
        <div className="flex p-4 items-center justify-center">
          {/* Longer Join Waitlist Button */}
          <button
            className="px-10 py-3 bg-white rounded-xl font-bold text-lg"
            onClick={handleJoinWaitlist} // Trigger navigation on click
          >
            Join Waitlist
          </button>
        </div>
      </div>

      {/* Right section with 3D animation */}
      <div className="w-full md:w-2/3 p-0 flex-grow">
        <OrbitalAnimation />
      </div>

      {/* Wallet Button in the top right corner */}
      <div className="absolute top-4 right-4">
        <Wallet />
      </div>
    </div>
  );
};

export default Home;
