/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



// eslint-disable-next-line no-unused-vars
export default function FormUpdate({ data, apiEndpoint, csrfToken, onClose  }) {
    const [loading, setLoading] = useState(false);
    const [errorSignup, setErrorSignup] = useState('');
  
    const [formData, setFormData] = useState({
      username: data?.username || "",
      individual: {
        user_id:data.individual?.user_id,
        first_name: data.individual?.first_name || "",
        last_name: data.individual?.last_name || "",
        email: data.individual?.email || "",
        mobile_number:data.individual?.mobile_number,
        birth_date:data.individual?.birth_date,
        gender:data.individual?.gender,
      },
    });


    console.log("form data user", formData)
    


    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [errorPasswordChange, setErrorPasswordChange] = useState('');

    const [formData2, setFormData2] = useState({
      type:'changepass',
      password:'',
      password2:'',
      user_id:data.individual?.user_id
   });

  
  
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleInputChange2 = (e) => {
      const { name, value } = e.target;
    
      setFormData2((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  
    const handleOpenPasswordDialog = () => {
      setOpenPasswordDialog(true);
    };
  
    const handleClosePasswordDialog = () => {
      setOpenPasswordDialog(false);
      setErrorPasswordChange(''); // Clear any previous error message
    };

    const handleChangePassword = async () => {
      try {
        const response = await axios.post(apiEndpoint, formData2, {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
  
        console.log("Update success:", response.data);
        setSnackbarOpen(true);
        handleClosePasswordDialog();
      } catch (error) {
        console.error("Error changing password:", error);
        setErrorPasswordChange('Error changing password. Please try again.'); // Display error message
      }
    };


  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      if (name.includes('individual.')) {
        const individualField = name.split('.')[1];
  
        setFormData((prevData) => ({
          ...prevData,
          individual: {
            ...prevData.individual,
            [individualField]: value,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
 

    const handleUpdate = async () => {
      try {
        setLoading(true);
    
        const birthDate = new Date(formData.individual.birth_date);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();
    
        if (age < 18) {
          setErrorSignup('You must be 18 years old or above to update.');
          setLoading(false);
    
          const timeoutId = setTimeout(() => {
            setErrorSignup('');
          }, 3000);
    
          return () => clearTimeout(timeoutId);
        } else {

          const registrationData = {
            ...formData,
            username: formData.username,
            individual: {
              ...formData.individual,
            },
          };

          // Always send formData with PUT request
          const response = await axios.put(apiEndpoint, registrationData, {
            headers: {
              'X-CSRFToken': csrfToken,
            },
          });
    
          console.log("Update success:", response.data);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      } finally {
        setLoading(false);
      }
    };
    
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };
  
    useEffect(() => {
      const birthDate = new Date(formData.individual.birth_date);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
  
      if (age < 18) {
        setErrorSignup('You must be 18 years old or above to register.');
        setLoading(false);
  
        const timeoutId = setTimeout(() => {
          setErrorSignup('');
        }, 3000);
  
        return () => clearTimeout(timeoutId);
      }
    }, [formData.individual.birth_date]);
  

  return (
    <div className="flex flex-col items-center pt-10 font-manrope">
     
        <h2 className="text-lg font-bold ">Update User</h2>
<div className="flex flex-col gap-5 p-10 w-full">
<Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Adjust as needed
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
            Update successful!
          </MuiAlert>
        </Snackbar>

  <div className="flex flex-col">
     <TextField
    label="First Name"
    type="text"
    name="individual.first_name"
    value={formData.individual.first_name || ""}
    onChange={handleInputChange}
  />
  </div>

  <div className="flex flex-col">
  <TextField
    label="Last Name"
    type="text"
    name="individual.last_name"
    value={formData.individual.last_name || ""}
    onChange={handleInputChange}
  />
  </div>

  <div className="flex flex-col">
  <TextField
    label="Username"
    type="text"
    name="username"
    value={formData.username || ""}
    onChange={handleInputChange}
  />
  </div>

  <div className="flex flex-col">
  <TextField
   label="Email Address"
    type="email"
    name="individual.email"
    value={formData.individual.email || ""}
    onChange={handleInputChange}
  />
  </div>

  <div className="flex flex-col">
  <TextField
   label="Mobile Number"
    type="number"
    name="individual.mobile_number"
    value={formData.individual.mobile_number || ""}
    onChange={handleInputChange}
  />
  </div>

  
  <div className="flex flex-col">
            <span>Gender:</span>
            <Select
              name="individual.gender"
              value={formData.individual.gender || ""}
              required
              onChange={handleInputChange}
            >
              <MenuItem  value="" disabled>
                <span className='text-black'> Gender</span>
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              {/* <MenuItem value="other">Other</MenuItem> */}
            </Select>
          </div>

  <div className="flex flex-col">
    <span>Date of Birth:</span>
  <TextField
    type="date"
    name="individual.birth_date"
    value={formData.individual.birth_date || ""}
    onChange={handleInputChange}
  />
  </div>


  <Button
          className={`button_change_password`}
          onClick={handleOpenPasswordDialog}
        >
          Change Password
        </Button>

  
        {errorSignup && <p style={{ color: 'red' }}>{errorSignup}</p>}
          <button
            className={`button_register`}
            type="submit"
            onClick={handleUpdate}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
      </div>

      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
          <TextField
              label="password"
                type="password"
                name="password"
                value={formData2.password || ""}
                onChange={handleInputChange2}
              />
               <TextField
              label="password2"
                type="password"
                name="password2"
                value={formData2.password2 || ""}
                onChange={handleInputChange2}
              />
            {errorPasswordChange && <p style={{ color: 'red' }}>{errorPasswordChange}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePasswordDialog}>Cancel</Button>
            <Button onClick={handleChangePassword}>Change Password</Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
