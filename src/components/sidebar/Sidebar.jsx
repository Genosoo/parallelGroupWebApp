import { useState } from 'react';
import { AiOutlineAlignLeft } from 'react-icons/ai'
import Logo from '../../assets/sidebar/logo.png'
import { NavLink } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { BsGrid,BsPeople, BsPerson  } from "react-icons/bs";
import { IoMapOutline } from "react-icons/io5";
import ButtonLogout from './ButtonLogout';
import { CiSettings } from "react-icons/ci";
const menuItem = [
    {
        path:"/main/dashboard",
        name:"Dashboard",
        icon:<BsGrid/>
    },

    {
        path:"/main/users",
        name:"Users",
        icon:<CgProfile/>
    },
    {
        path:"/main/individual",
        name:"Individual",
        icon:<BsPerson/>
    },


    {
        path: "/main/parallel-groups",
        name: "Parallel Groups",
        icon: <BsPeople />,
        subItems: [
            {
                path: "/main/parallel-groups/group1",
                name: "Group 1",
            },
            {
                path: "/main/parallel-groups/group2",
                name: "Group 2",
            },
        ],
    },

    {
        path:"/main/map",
        name:"Map",
        icon:<IoMapOutline/>
    },

  
]


const menuItem2 = [
    {
        path:"/main/settings",
        name:"Settings",
        icon:<CiSettings/>
    },

  
]



const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);


    return (
        <div className="sidebar_container">
           <div style={{width: isOpen ? "250px" : "100px"}} className="sidebar">
             <div>
             <div className="top_section">
                   <div className="logo_box">
                   <img src={Logo} alt="logo"  style={{
                        width: isOpen ? '70%' : '80px',
                        transition: 'width 0.3s ease',
                    }} />
                   </div>
                   
               </div>

              <div className="link_wrapper">
              <span>Navigate</span>
              {menuItem.map((item, index) => (
                   // Check the 'disabled' property and conditionally disable the menu item
                   !item.disabled ? (
                       <NavLink to={item.path} key={index} className={`link ${({ isActive }) => isActive ? "active" : ''}`} style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </NavLink>
                   ) : (
                       // Render a disabled menu item
                       <div key={index} className="link disabled" style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </div>
                   )
               ))}
              </div>
             </div>

              <div className="link_wrapper2">
              {menuItem2.map((item, index) => (
                   // Check the 'disabled' property and conditionally disable the menu item
                   !item.disabled ? (
                       <NavLink to={item.path} key={index} className={`link ${({ isActive }) => isActive ? "active" : ''}`} style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </NavLink>
                   ) : (
                       // Render a disabled menu item
                       <div key={index} className="link disabled" style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </div>
                   )
               ))}
               <ButtonLogout isOpen={isOpen} />
              </div>
           </div>

           <div style={{marginLeft: isOpen ? "20px" : "10px"}} className="toggle_bar">
                       <AiOutlineAlignLeft onClick={toggle}/>
            </div>

            

        </div>
    );
};




export default Sidebar;