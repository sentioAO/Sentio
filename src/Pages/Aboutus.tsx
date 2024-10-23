
import { ExpandableCardDemo } from '../Components/TeamCards'
import { TimelineDemo } from '../Components/TimelineDemo'
import Navbar from '../Components/Navbar'


const Aboutus = () => {
  return (
    <>
      <div className='app-background h-screen w-full'>

        <div className="navbar flex justify-center">
          <Navbar />
        </div>
        <div className="timeline bg-black">
          <TimelineDemo />
        </div>
        <ExpandableCardDemo />
      </div>

    </>
  )
}

export default Aboutus