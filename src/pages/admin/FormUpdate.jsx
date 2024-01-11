/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';





// eslint-disable-next-line no-unused-vars
export default function FormUpdate({ data, apiEndpoint, csrfToken, onClose  }) {
    const [loading, setLoading] = useState(false);
    const [errorSignup, setErrorSignup] = useState('');
  
    const [formData, setFormData] = useState({
      id: data.id,
      individual: {
        user_id: data.individual?.user_id || "",
        first_name: data.individual?.first_name || "",
        last_name: data.individual?.last_name || "",
        email: data.individual?.email || "",
        password: "",  // Add password field to formData
        password2: "", // Add password2 field to formData
      },
    });
  
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  
  
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
        } else if (formData.individual.password !== formData.individual.password2) {
          setErrorSignup('Passwords do not match.');
          setLoading(false);
  
          const timeoutId = setTimeout(() => {
            setErrorSignup('');
          }, 3000);
  
          return () => clearTimeout(timeoutId);
        } else {
          const response = await axios.put(apiEndpoint, formData, {
            headers: {
              'X-CSRFToken': csrfToken,
            },
          });
  
          console.log("Update success:", response.data);
  
          setSnackbarOpen(true);
  
          // setTimeout(() => (
          //   window.location.reload()
          // ), 1000);
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
     
        <h2 className="text-lg font-bold">Update Administrator</h2>
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
    <span>First Name:</span>
     <TextField
    type="text"
    name="individual.first_name"
    value={formData.individual.first_name || ""}
    onChange={handleInputChange}
  />
  </div>

  <div className="flex flex-col">
    <span>Last Name:</span>
  <TextField
    type="text"
    name="individual.last_name"
    value={formData.individual.last_name || ""}
    onChange={handleInputChange}
  />
  </div>


  <div className="flex flex-col">
    <span>Email Address:</span>
  <TextField
    type="email"
    name="individual.email"
    value={formData.individual.email || ""}
    onChange={handleInputChange}
  />
  </div>

 

    <div className="flex flex-col">
          <span>Password:</span>
          <TextField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <span>Confirm Password:</span>
          <TextField
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleInputChange}
          />
        </div>
{errorSignup && <p style={{ color: 'red' }}>{errorSignup}</p>}

  <button
            className={`button_register`}
            type="submit"
            onClick={handleUpdate}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
</div>
    </div>
  );
}
