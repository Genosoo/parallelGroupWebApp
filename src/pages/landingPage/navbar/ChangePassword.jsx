import { useState} from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useCsrfToken } from '../../../context/CsrfTokenContext';
import { apiAccount } from "../../../api/api";

export default function Account() {
  const {csrfToken} = useCsrfToken();
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






  const changePassword = async () => {
    try {
      const changePassData = {
        type: "changepass",
        current_password: currentPassword, // You should have a state for the current password
        password: password,
        password2: password2,
      }
  

      const changePasswordResponse = await axios.post(
        apiAccount,  // Replace with the actual endpoint for changing password
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
