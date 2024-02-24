import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo2.png';
import ButtonMenu from '../../landingPage/navbar/ButtonMenu';
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import './NavbarStyle.css'

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
    <nav className="navbarContainer">
        <div className='navbarWrapper'>
          <img src={logo} alt=""  className='navbarLogo'/>
       
        <div className='navbarLinkBox'>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={closeMenu}
              className={`navbarLink ${
                location.pathname === link.to  ? 'active-link' : ''
              }`}
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className="navbarRightBox">
          <div className='searchBox'>
           <input type="search" placeholder='Search...' className='searchInput' />
           <IoSearchOutline />
          </div>

          <div className='bellBox'>
           <GoBell />
          </div>
          <ButtonMenu />
        </div>

        <div className="menuBtn">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <IoClose/> : <FaBars />}
            </button>
          </div>

       
        </div>
        {isMenuOpen ?
      <div className='mobileLinkBox'>
      {navLinks.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          onClick={closeMenu}
          className={`mobileLink ${
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

