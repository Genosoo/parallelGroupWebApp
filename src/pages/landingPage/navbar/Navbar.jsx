import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo2.png';
import ButtonMenu from '../../landingPage/navbar/ButtonMenu';
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/parallel-groups', text: 'Home' },
    { to: '/parallel-groups/about', text: 'About' },
    { to: '/parallel-groups/programs-and-projects', text: 'Programs & Projects' },
    { to: '/parallel-groups/news-and-articles', text: 'News & Articles' },
    { to: '/parallel-groups/contact-us', text: 'Contact Us' },
  ];

  const location = useLocation();

  return (
    <nav className="">
        <div className='p-3 font-manrope shadow flex items-center justify-around'>
        <div className="flex justify-between items-center">
          <img src={logo} alt="" />
        </div>
       
        <div className={`lg:flex lg:space-x-5 hidden`}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={closeMenu}
              className={`text-[#298BD9] text-sm px-5 py-1 rounded uppercase ${
                location.pathname === link.to  ? 'active-link' : ''
              }`}
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className='hidden lg:flex items-center shadow  rounded-full overflow-hidden px-4'>
           <input type="search" placeholder='Search...' className='p-3 rounded-full outline-none' />
           <IoSearchOutline />
          </div>

          <div className='bg-white shadow p-3 rounded-full'>
           <GoBell />
        </div>
     
          <ButtonMenu />
        </div>

        <div className="flex space-x-5 lg:hidden">
            <button onClick={toggleMenu} className="text-[#000000] text-xl">
              {isMenuOpen ? <IoClose/> : <FaBars />}
            </button>
          </div>

       
        </div>
        {isMenuOpen ?
      <div className={`flex flex-col items-center  p-10 gap-5 bg-white shadow lg:hidden`}>
      {navLinks.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          onClick={closeMenu}
          className={`text-[#298BD9] flex justify-center bg-slate-100 rounded-[10px] font-semibold font-manrope  p-3 text-sm w-full   uppercase ${
            location.pathname === link.to ? 'active-link-mobile' : ''
          }`}
        >
          {link.text}
        </Link>
      ))}
      </div>
      : ''}
    </nav>
  );
};

export default Navbar;

