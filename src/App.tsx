import './App.css';
import OrbitalAnimation from './Components/Orbitals';

function App() {
  return (
    <div className="bg-black h-screen w-full flex">
      <div className="w-1/3 p-6 ml-8 flex flex-col justify-center"> {/* Center content vertically */}
        <h1 className="text-white text-8xl font-extrabold">
          SAM
        </h1>
        <p className='text-white text-left text-3xl font-extralight'>
          You Write We{' '}
          <span className="inline-block px-2 py-1 border border-gray-500 rounded-lg">
             Monitor
          </span>
        </p>
        <div className='flex gap-4 mt-3'> 
          <button className='px-6 py-3 bg-white rounded-xl font-bold'>Offchain</button>
          <button className='px-6 py-3 bg-white rounded-xl font-bold'>Onchain</button>
        </div>
      </div>

      <div className="w-2/3 p-0 flex-grow">
        <OrbitalAnimation />
      </div>
    </div>
  );
}

export default App;
