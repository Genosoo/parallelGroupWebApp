import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const baseUrl = import.meta.env.VITE_URL;
const myAccount = `${baseUrl}/api/my_account/`;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;

export default function Account() {
  const [csrfToken, setCsrfToken] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  const handleOpenChangePasswordDialog = () => {
    setOpenChangePasswordDialog(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false);
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
  }, []);



  const changePassword = async () => {
    try {
      const changePassData = {
        type: "changepass",
        current_password: currentPassword, // You should have a state for the current password
        password: password,
        password2: password2,
      }
  

      const changePasswordResponse = await axios.post(
        myAccount,  // Replace with the actual endpoint for changing password
        changePassData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
     


      console.log("change password response", changePasswordResponse.data);
        localStorage.removeItem('token'); // Replace 'yourAuthTokenKey' with the actual key used to store the token
        window.location.reload()
    } catch (error) {
      console.error(error)
    }
  };


  return (
    <>
     <span className="cursor-pointer text-xs text-blue-500 hover:font-bold duration-200"  onClick={handleOpenChangePasswordDialog}>
         Change Password
      </span>

      <Dialog open={openChangePasswordDialog} onClose={handleCloseChangePasswordDialog}>
      <h2 className="text-center font-manrope pt-2 font-bold text-lg">Change Password</h2>
        <DialogContent>
         <div className="flex flex-col gap-3 font-manrope">
         <TextField
            label="Current Password"
            type="password"
            value={currentPassword || ""}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={password2 || ""}
            onChange={(e) => setPassword2(e.target.value)}
          />
         </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePasswordDialog}>Cancel</Button>
          <Button variant="contained" onClick={changePassword}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
