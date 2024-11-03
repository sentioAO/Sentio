import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const SetupPage = () => {
    const [processId, setProcessId] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTime, setSelectedTime] = useState("1 min");
    // const [sentinelName, setSentinelName] = useState('');
    const { processId: pid } = useParams();
    const totalSteps = 3;

    const [keyValuePairs, setKeyValuePairs] = useState<{ key: string, value: string }[]>([]);
    const [email, setEmail] = useState('');
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

    useEffect(() => {
        setProcessId(pid || '');
    }, [pid]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => {
                if (prevStep < totalSteps) {
                    return prevStep + 1;
                } else {
                    clearInterval(interval);
                    return prevStep;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(event.target.value);
    };


    const handleKeyValueChange = (index: number, event: React.ChangeEvent<HTMLInputElement>, type: 'key' | 'value') => {
        const newKeyValuePairs = [...keyValuePairs] as { key: string, value: string }[];
        newKeyValuePairs[index][type] = event.target.value;
        setKeyValuePairs(newKeyValuePairs);
    };

    const handleAddKeyValuePair = () => {
        setKeyValuePairs([...keyValuePairs, { key: '', value: '' }] as { key: string, value: string }[]);
    };

    const handleRemoveKeyValuePair = (index: number) => {
        const newKeyValuePairs = keyValuePairs.filter((_, i) => i !== index);
        setKeyValuePairs(newKeyValuePairs);
    };

    const handleSpawnSentinel = () => {
        console.log(`Spawning Sentinel with name: `);
        console.log("Key-Value Pairs:", keyValuePairs);
        console.log("Email:", email);
        console.log("Email Confirmation:", isEmailConfirmed);
    };

    return (
        <div className='app-background min-h-screen text-white flex flex-col'>
            {/* Navbar */}
            <header className="navbar flex justify-center py-4 shadow-md bg-gray-900 bg-opacity-75">
                <Navbar />
            </header>

            {/* Main Content */}
            <main className='flex-grow container mx-auto px-6 md:px-10 py-12'>
                {/* Setup Sentinel Section */}
                <section className='rounded-xl bg-gray-800 bg-opacity-70 p-8 shadow-lg mb-12 text-center md:text-left'>
                    <h1 className='text-4xl font-extrabold text-white mb-4'>
                        Sentinel Setup Process
                    </h1>
                    <p className='text-lg text-gray-300'>
                        Your process ID is: <span className='font-mono text-blue-400'>{processId || 'N/A'}</span>
                    </p>
                </section>

                {/* Progress Bar for Installation Steps */}
                <section className='rounded-xl bg-gray-800 bg-opacity-70 p-6 shadow-md mb-8'>
                    <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>
                        Installation Progress
                    </h2>
                    <div className='flex items-center space-x-4 mb-8'>
                        {[...Array(totalSteps)].map((_, index) => (
                            <div
                                key={index}
                                className={`flex-1 h-4 rounded-full transition-all duration-1000 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-600'}`}
                            ></div>
                        ))}
                    </div>

                    {/* Step Description */}
                    <div className='text-lg font-semibold text-gray-200 text-center mt-6'>
                        {currentStep === 1 && <p>Step 1: Install the Sentinel software on your system.</p>}
                        {currentStep === 2 && <p>Step 2: Launch the Sentinel and configure initial settings.</p>}
                        {currentStep === 3 && <p>Step 3: Monitor and review Sentinel activity.</p>}
                    </div>
                </section>

                {/* Configure Sentinel Section */}
                <section className='rounded-xl bg-gray-800 bg-opacity-70 p-6 shadow-md flex justify-center'>
                    <div className="text-center w-full max-w-lg">
                        <h2 className='text-3xl font-semibold text-gray-100 mb-4'>Configure Sentinel</h2>
                        <form>
                            <div className='flex items-center justify-between mb-4'>
                                <div className="w-1/2">
                                    <label htmlFor="time-select" className='block text-sm text-gray-300 mb-2'>Select Time Interval:</label>
                                    <select
                                        id="time-select"
                                        value={selectedTime}
                                        onChange={handleTimeChange}
                                        className='w-full p-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    >
                                        <option value="1 min">1 min</option>
                                        <option value="3 min">3 min</option>
                                        <option value="5 min">5 min</option>
                                        <option value="10 min">10 min</option>
                                    </select>
                                </div>

                                {/* Spawn Sentinel Button */}
                                <button
                                    type="button"
                                    onClick={handleSpawnSentinel}
                                    className='ml-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-8'
                                >
                                    Spawn Sentinel
                                </button>
                            </div>

                            {/* Key-Value Pair Inputs */}
                            <div className="mb-4 ">
                                <h3 className='text-lg text-gray-300 mb-2'>Key-Value Pairs:</h3>
                                {keyValuePairs.map((pair, index) => (
                                    <div key={index} className="flex items-center justify-center mb-2 ">
                                        <input
                                            type="text"
                                            placeholder="Key"
                                            value={pair.key}
                                            onChange={(e) => handleKeyValueChange(index, e, 'key')}
                                            className='w-32 p-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2'
                                        />
                                        <input
                                            type="text"
                                            placeholder="Value"
                                            value={pair.value}
                                            onChange={(e) => handleKeyValueChange(index, e, 'value')}
                                            className='w-32 p-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2'
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveKeyValuePair(index)}
                                            className='px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md'
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                {keyValuePairs.length === 0 && (
                                    <p className='text-gray-400'>Select key-value pairs</p>
                                )}
                                <button
                                    type="button"
                                    onClick={handleAddKeyValuePair}
                                    className='mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'
                                >
                                    Add Key-Value Pair
                                </button>
                            </div>

                            {/* Email Confirmation Section */}
                            <div className="mb-4">
                                <div className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id="email-confirm"
                                        checked={isEmailConfirmed}
                                        onChange={(e) => setIsEmailConfirmed(e.target.checked)}
                                        className='mr-2'
                                    />
                                    <label htmlFor="email-confirm" className='text-sm text-gray-300'>I want to receive updates via email</label>
                                </div>

                                {/* Conditional rendering of email input based on checkbox */}
                                {isEmailConfirmed && (
                                    <>
                                        <label htmlFor="email" className='block text-sm text-gray-300 mb-2'>Email:</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className='w-64 p-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2'
                                        />
                                    </>
                                )}
                            </div>

                            {/* Key-Value Pair Representation */}
                            <div className='mt-6 text-center'>
                                <h3 className='text-lg text-gray-300 mb-2'>Current Key-Value Pairs:</h3>
                                <div className='flex flex-wrap justify-center'>
                                    {keyValuePairs.length > 0 ? (
                                        keyValuePairs.map((pair, index) => (
                                            <div key={index} className='flex items-center bg-gray-700 text-gray-300 rounded-md px-4 py-2 mx-2 mb-2'>
                                                <span>{pair.key}: {pair.value}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-gray-400'>No pairs added yet.</p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer bg-gray-900 bg-opacity-75 py-4">
                <Footer />
            </footer>
        </div>
    );
};

export default SetupPage;
