/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { apiAccount } from "../../../api/api";
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { ChangePasswordDialog, StyledFormControl} from "../StyledComponent";
import './FormStyle.css'
import { getCsrfTokenUrl } from "../../../api/api";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');


  const navigate = useNavigate()

  const handleOpenChangePasswordDialog = () => {
    setOpenChangePasswordDialog(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false);
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    const getTheCsrfToken = async () => {
      try {
        const response = await axios.get(getCsrfTokenUrl);
        setCsrfToken(response.data['csrf-token']);
      } catch (error) {
        console.log(error);
      }
    };
  
    getTheCsrfToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCsrfTokenUrl]);



  const changePassword = async () => {
    try {
      const changePassData = {
        type: "changepass",
        current_password: currentPassword,
        password: password,
        password2: password2,
      };
  
      const changePasswordResponse = await axios.post(
        apiAccount,
        changePassData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
  
      console.log("change password response", changePasswordResponse);


  
      // Check if the response status is 200
      if (changePasswordResponse.status === 200) {
        // Log the response data for further inspection
        console.log("Change password success:", changePasswordResponse.data);
        
        // Check if sessionId is present in cookies
        const sessionId = Cookies.get('sessionid');
        console.log('sessionid', sessionId);
  
        // Remove sessionId from cookies
        Cookies.remove('sessionid');
        navigate('/main');
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(error.response.data.error)
    }

    setTimeout(() => {
      setErrorMessage(null)
    },2000)
  };
  


  return (
    <>
     <button onClick={handleOpenChangePasswordDialog}>Change Password</button>
      <ChangePasswordDialog open={openChangePasswordDialog} >
      {errorMessage && <p className="messageFailed">{errorMessage}</p>}

      <h2 className="changePassTitle">Change Password</h2>
         <div className="changePassBox">
            <StyledFormControl  variant="filled" >
            <InputLabel htmlFor="filled-adornment-password">Current Password</InputLabel>
                <FilledInput
                 disableUnderline
                  id="filled-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword || ""}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon/>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
            </StyledFormControl>
            <StyledFormControl  variant="filled">
              <InputLabel htmlFor="filled-adornment-new-password">New Password</InputLabel>
              <FilledInput
               disableUnderline
                id="filled-adornment-new-password"
                type={showPassword ? 'text' : 'password'}
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </StyledFormControl>
            <StyledFormControl variant="filled">
              <InputLabel htmlFor="filled-adornment-confirm-new-password">Confirm New Password</InputLabel>
              <FilledInput
               disableUnderline
                id="filled-adornment-confirm-new-password"
                type={showPassword ? 'text' : 'password'}
                value={password2 || ""}
                onChange={(e) => setPassword2(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </StyledFormControl>
            <div className="changePassBtn">
          <button className="changePassBtnSave" onClick={changePassword}>Save</button>
            <button className="changePassBtnCancel"  onClick={handleCloseChangePasswordDialog}>Cancel</button>
          </div>
         </div>
         
      </ChangePasswordDialog>
    </>
  );
}
