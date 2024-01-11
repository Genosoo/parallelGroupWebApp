import { AiOutlineAlignLeft } from 'react-icons/ai';
import Logo from '../../assets/sidebar/logo.png';
import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BsGrid} from 'react-icons/bs';
import { IoMapOutline } from 'react-icons/io5';
import ButtonLogout from './ButtonLogout';
import { CiSettings } from 'react-icons/ci';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GrGroup } from "react-icons/gr";
import { TbUsersGroup } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { PiPerson } from "react-icons/pi";
const baseUrl = import.meta.env.VITE_URL;
const myAccount = `${baseUrl}/api/my_account/`;

const originalMenuItem = [
    {
        path: '/main/dashboard',
        name: 'Dashboard',
        icon: <BsGrid />,
    },
    {
        path: '/main/roles',
        name: 'Roles',
        icon: <PiPerson />,
    },
    {
        path: '/main/users',
        name: 'Users',
        icon: <CgProfile />,
    },
    
    {
        path: '/main/administrators',
        name: 'Administrators',
        icon: <RiAdminLine />,
    },
    {
        path: '/main/members',
        name: 'Members',
        icon: <GrGroup />,
    },
    {
        path: '/main/parallel-groups',
        name: 'Parallel Groups',
        icon: <TbUsersGroup />,
        subItems: [
            {
                path: '/main/parallel-groups/group1',
                name: 'Group 1',
            },
            {
                path: '/main/parallel-groups/group2',
                name: 'Group 2',
            },
        ],
    },
    {
        path: '/main/map',
        name: 'Map',
        icon: <IoMapOutline />,
    },
];

const menuItem2 = [
    {
        path: '/main/settings',
        name: 'Settings',
        icon: <CiSettings />,
    },
];

const Sidebar = () => {
    const [data, setData] = useState([]);

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataResponse = await axios.get(myAccount);

                setData(dataResponse.data.success);

                console.log('testttt', dataResponse.data.success);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const filteredMenuItem = originalMenuItem.filter((item) => {
        if (data && data.roles) {
            if (data.roles.includes('Administrator')) {
                // Show all menu items for administrators
                return true;
            } else if (data.roles.includes('Parallel Group Administrator')) {
                return item.name !== "Administrators" && item.name !== "Roles";
            } else if (data.roles.length === 0 || data.roles.includes('user')) {
                return item.name !== item.name;
            }
        }
        return true; // default case, include all other items
    });
    
    
    return (
        <div className="sidebar_container">
            <div style={{ width: isOpen ? '250px' : '100px' }} className="sidebar">
                <div>
                    <div className="top_section">
                        <div className="logo_box">
                            <img
                                src={Logo}
                                alt="logo"
                                style={{
                                    width: isOpen ? '70%' : '80px',
                                    transition: 'width 0.3s ease',
                                }}
                            />
                        </div>
                    </div>

                    <div className="link_wrapper">
                        <span>Navigate</span>
                        {filteredMenuItem.map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                                className={`link ${({ isActive }) => (isActive ? 'active' : '')}`}
                                style={{ justifyContent: isOpen ? 'start' : 'center' }}
                            >
                                <div className="icon">{item.icon}</div>
                                <h2 style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                                    {item.name}
                                </h2>
                            </NavLink>
                        ))}
                    </div>
                </div>

                <div className="link_wrapper2">
                    {menuItem2.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            className={`link ${({ isActive }) => (isActive ? 'active' : '')}`}
                            style={{ justifyContent: isOpen ? 'start' : 'center' }}
                        >
                            <div className="icon">{item.icon}</div>
                            <h2 style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                                {item.name}
                            </h2>
                        </NavLink>
                    ))}
                    <ButtonLogout isOpen={isOpen} />
                </div>
            </div>

            <div style={{ marginLeft: isOpen ? '20px' : '10px' }} className="toggle_bar">
                <AiOutlineAlignLeft onClick={toggle} />
            </div>
        </div>
    );
};

export default Sidebar;
