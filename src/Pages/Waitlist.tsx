import React, { useState } from 'react';
import "../styles/Waitlist.css"
const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setEmail("");
    setName("");
  };

  return (
    <div className="bg-[#0E0E0E] app-background h-screen w-full flex flex-col justify-center items-center">
      {!showConfirmation ? (
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-8xl font-light tracking-widest mb-4" style={{ fontFamily: "'Anton SC',sans-serif" }}>
            JOIN OUR WAITLIST
          </h1>
          <p className="text-white text-xl md:text-3xl font-extralight mb-8" style={{ fontFamily: "'Roboto'" }}>
            Be the first to know when we launch!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="px-4 py-2 rounded-lg text-black text-lg mb-4 w-72 md:w-96"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg text-black text-lg mb-4 w-72 md:w-96"
              required
            />
            <button type="submit" className="px-6 py-3 bg-white rounded-xl font-bold w-40">
              Join Waitlist
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-black bg-opacity-80 flex justify-center items-center fixed inset-0 z-50">
          <div className="bg-[#1a1a1a] p-8 rounded-lg text-center relative shadow-lg w-80 md:w-96">
            <button
              className="absolute top-2 right-2 text-white text-xl"
              onClick={handleClose}
            >
              &times;
            </button>
            <div className="flex justify-center items-center mb-6">
              <div className="checkmark">
                <div className="checkmark_stem"></div>
                <div className="checkmark_kick"></div>
              </div>
            </div>
            <h2 className="text-white text-2xl font-semibold mb-2">
              We've added you to our waiting list!
            </h2>
            <p className="text-gray-400 mb-6">We'll let you know when we're ready to launch.</p>
            <div className="bg-[#262626] p-4 rounded-md text-left">
              <p className="text-white text-sm mb-2">
                <span className="font-semibold">Name:</span> {name}
              </p>
              <p className="text-white text-sm">
                <span className="font-semibold">Email:</span> {email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Waitlist;
