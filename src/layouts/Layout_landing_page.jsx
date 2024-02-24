import Footer from '../pages/landingPage/footer/Footer'
import Navbar from '../pages/landingPage/navbar/Navbar'
import { Outlet } from "react-router-dom"  


export default function Layout_landing_page() {
  return (
    <div className='flex flex-col justify-between bg-[#EBF4FD]'>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}
