import { useState } from 'react';
import logo from '../../../assets/login/logo2.png';
import LoginForm from './Forms/loginForm/LoginForm';
import RegisterForm from './Forms/registerForm/RegisterForm'
import {  Dialog} from '@mui/material';
import styled from 'styled-components';
import './NavbarStyle.css'

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


export default function Nav() {
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

  return (
    <div className='navbar'>
      <div>
        <img src={logo} alt="logo" />
      </div>

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
    </div>
  );
}
