// import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Navbar from '../Components/Navbar';

const SentinelPage = () => {
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
            <div className='w-full h-screen app-background'>
                
                <div className='flex justify-center'>
                    <Navbar />

                </div>
                <div className='flex text-4xl flex-col text-white items-center mt-36' style={{fontFamily:"'Roboto'"}}>
                    <p> Sentinel Spawning shortly for {processId}</p>
                    COMING SOON...
                </div>
            </div>
        </>
    )
}

export default SentinelPage
