import { useState } from 'react';
import logo from '../../../assets/login/logo2.png';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm'
import {  Dialog} from '@mui/material';

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
    <div className='login_navbar'>
      <div>
        <img src={logo} alt="logo" />
      </div>

      <div className='login_nav_btn_wrapper'>
        <button className='btn_1' onClick={handleDialogOpenLogin}>Sign In</button>
        <button className='btn_2' onClick={handleDialogOpenRegister}>Register</button>
      </div>

      {/* Material-UI Dialog for Login Form */}
      <Dialog  open={openDialogLogin} onClose={handleDialogCloseLogin}>
          <LoginForm />
      </Dialog>
      <Dialog  open={openDialogRegister} onClose={handleDialogCloseRegister}>
          <RegisterForm />
      </Dialog>
    </div>
  );
}
