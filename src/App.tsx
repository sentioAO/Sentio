import './App.css';
import OrbitalAnimation from './Components/Orbitals';

function App() {
  return (
    <div className="bg-black h-screen w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-center md:items-start md:ml-8">
        <h1 className="text-white text-4xl md:text-8xl font-extrabold text-center md:text-left">
          SAM
        </h1>
        <p className='text-white text-2xl md:text-3xl font-extralight text-center md:text-left mt-2 md:mt-4'>
          You Write We{' '}
          <span className="inline-block px-2 py-1 border border-gray-500 rounded-lg">
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
      </div>

      <div className="w-full md:w-2/3 p-0 flex-grow">
        <OrbitalAnimation />
      </div>
    </div>
  );
}

export default App;
