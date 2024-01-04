import { Outlet } from "react-router-dom"  
import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"

export default function Layout() {
  return (
    <div className="main_container">
        <Sidebar />
        <div className="content_container">
            <Navbar />
            <Outlet />
        </div>
    </div>
  )
}
