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
            <div className='w-full h-screen bg-black'>

                <div className='flex justify-center'>
                    <Navbar />

                </div>
                <div>
                    <h1 className='text-white text-4xl text-center mt-10'>Sentinel Page</h1>
                    <h1 className='text-white text-4xl text-center mt-10'>{processId}</h1>
                    <div>
                        <button>
                            Spawn a Sentinel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SentinelPage
