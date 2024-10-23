
import { TimelineDemo } from '../Components/TimelineDemo'
import Navbar from '../Components/Navbar'
import Footer from "../Components/Footer"


const Aboutus = () => {
  return (
    <>
      <div className='app-background h-screen w-full app-background'>

        <div className="navbar flex justify-center">
          <Navbar />
        </div>
        <div className="timeline bg-black">
          <TimelineDemo />
        </div>

        <Footer/>
      </div>

    </>
  )
}

export default Aboutus