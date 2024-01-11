import Footer from '../pages/landingPage/footer/Footer'
import Navbar from '../pages/landingPage/navbar/Navbar'
import { Outlet } from "react-router-dom"  


export default function LandingPageLayout() {
  return (
    <div className='flex flex-col justify-between h-[100vh]'>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}
