import React from 'react'
import { ExpandableCardDemo } from '../Components/TeamCards'
import { TimelineDemo } from '../Components/TimelineDemo'
import Navbar from '../Components/Navbar'


const Aboutus = () => {
  return (
        <>

        <div className="navbar flex justify-center">
        <Navbar/>
        </div>
        <div className="timeline bg-black">
        <TimelineDemo/>
        </div>
        <ExpandableCardDemo/>
        
        </>
  )
}

export default Aboutus