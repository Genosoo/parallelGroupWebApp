import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo2.png';
import ButtonMenu from '../../landingPage/navbar/ButtonMenu';
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import './NavbarStyle.css'
import Cookies from 'js-cookie'; 
import {  Dialog} from '@mui/material';
import styled from 'styled-components';
import LoginForm from './Forms/loginForm/LoginForm';
import RegisterForm from './Forms/registerForm/RegisterForm';

const StyledLoginDialog = styled(Dialog)`
  /* Your custom styles for the dialog go here */
  .MuiDialog-paper {
    background:none;
    border-radius:30px;
  }
`;

const StyledRegisterDialog = styled(Dialog)`
  /* Your custom styles for the dialog go here */
  .MuiDialog-paper {
    background:none;
    border-radius:30px;
  }
`;


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDialogLogin, setOpenDialogLogin] = useState(false);
  const [openDialogRegister, setOpenDialogRegister] = useState(false);

  const handleDialogOpenLogin = () => {
    setOpenDialogLogin(true);
  };

  const handleDialogCloseLogin = () => {
    setOpenDialogLogin(false);
  };

  const handleDialogOpenRegister = () => {
    setOpenDialogRegister(true);
  };

  const handleDialogCloseRegister = () => {
    setOpenDialogRegister(false);
  };
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
  const hasSessionId = Cookies.get('sessionid'); // Check if sessionid cookie exists

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
          {hasSessionId&& 
          <>
           <div className='bellBox'><GoBell /></div> 
          <ButtonMenu />
          </>}

          {!hasSessionId && 
            <>
            <div className='navbarBtn'>
            <button className='btn1' onClick={handleDialogOpenLogin}>Sign In</button>
            <button className='btn2' onClick={handleDialogOpenRegister}>Register</button>
          </div>
    
         
          <StyledLoginDialog open={openDialogLogin} onClose={handleDialogCloseLogin}>
            <LoginForm />
          </StyledLoginDialog>
    
          <StyledRegisterDialog  open={openDialogRegister} onClose={handleDialogCloseRegister}>
              <RegisterForm  setOpenDialogRegister={setOpenDialogRegister}/>
          </StyledRegisterDialog>
            </>
          }
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

