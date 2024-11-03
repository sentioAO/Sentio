// import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
// import Footer from '../Components/Footer';

const SetupPage = () => {
    const [processId, setProcessId] = useState('')
    // const { processId } = useParams<{ processId: string }>()
    const pid = useParams();
    console.log(pid)
    useEffect(() => {
        if (!pid.processId) {
            setProcessId('')
        }
        setProcessId(pid.processId || '')
    }, [pid, processId])
    return (
        <>
            <div className='app-background w-full h-screen text-white'>

            <div className='flex justify-center'>
                <Navbar />

            </div>
            <div className='flex text-lg text-left justify-start items-start w-[85%]'>
                Your process ID is: {processId}
            </div>
            <div>
                <ol>
                    <li>Step 1: Install the Sentinel</li>
                    <li>Step 2: Run the Sentinel</li>
                    <li>Step 3: Monitor the Sentinel</li>
                    <li>Step 4: Analyze the Sentinel</li>
                    <li>Step 5: Report the Sentinel</li>
                </ol>
            </div>

            <div className='absolute bottom-0 w-full'>
                <Footer />
            </div>
            </div>


        </>
    )
}

export default SetupPage
