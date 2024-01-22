 /* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext/AuthContext';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from "react-icons/bi";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { random } from 'lodash';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';


const baseUrl = import.meta.env.VITE_URL;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;
const loginUrl = `${baseUrl}/api/login/`;
const signupUrl = `${baseUrl}/api/signup/`;
const getParallelGroup = `${baseUrl}/api/parallel_group/`
const getRegions = `${baseUrl}/api/region/`


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorSignup, setErrorSignup] = useState('');
  const { authState, dispatch } = useAuth();


  const [csrfToken, setCsrfToken] = useState('');
  const [open, setOpen] = React.useState(false);
  const [parallelGroupOptions, setParallelGroupOptions] = useState([])
  const [regionsOptions, setRegionsOptions] = useState([]);

  const [registerFormData, setRegisterFormData] = useState({
    username:'',
    password: '',
    password2: '',
    individual: {
      memship_id:'',
      first_name:'',
      last_name:'',
      parallel_group:'',
      birth_date:'',
      gender:'',
      photo:'',
      region:'',

    }, 
  });
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64String = reader.result.split(',')[1]; // Extracting the base64 string
      const filename = image.name;
  
      const photo = {
        data: base64String,
        filename: filename,
      };
  
      setSelectedImage(URL.createObjectURL(image));
  
      // Set the 'photo' property in registerFormData
      setRegisterFormData((prevData) => ({
        ...prevData,
        individual: {
          ...prevData.individual,
          photo: photo,
        },
      }));
  
      // Now, you can do something with the 'photo' object, like sending it to the server.
      console.log(photo);
    };
  
    reader.readAsDataURL(image);
  }, [setRegisterFormData]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });



  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parallelGroupResponse = await axios.get(getParallelGroup);
        setParallelGroupOptions(parallelGroupResponse.data.success);
        console.log('Test Parallel Group', parallelGroupResponse.data.success)
       
        const regionsResponse = await axios.get(getRegions);
        setRegionsOptions(regionsResponse.data.success);
        console.log('Test Regions', regionsResponse.data.success)


      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('individual.')) {
      const individualField = name.split('.')[1];
      setRegisterFormData((prevData) => ({
        ...prevData,
        individual: {
          ...prevData.individual,
          [individualField]: value,
        },
      }));
    } else {
      setRegisterFormData({ ...registerFormData, [name]: value });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      setTimeout(() => {
        setPasswordValidationError('')
        setErrorSignup('');
      }, 3000);

    if (!registerFormData.individual.first_name) {
      setErrorSignup('Please input your first name.');
      setLoading(false);
      return;
    }


    if (!registerFormData.individual.last_name) {
      setErrorSignup('Please input your last name.');
      setLoading(false);
      return;
    }

    
        //  // Check if gender is selected
        //  if (!registerFormData.individual.email) {
        //   setErrorSignup('Please create your email address.');
        //   setLoading(false);
        //   return;
        // }


        
        //  // Check if gender is selected
        //  if (!registerFormData.individual.mobile_number) {
        //   setErrorSignup('Please add your Mobile Number');
        //   setLoading(false);
        //   return;
        // }

         // Check if gender is selected
    if (!registerFormData.individual.gender) {
      setErrorSignup('Please select your gender.');
      setLoading(false);
      return;
    }


    


  
      // Ensure that birth_date is provided
      if (!registerFormData.individual.birth_date) {
        setErrorSignup('Please provide your birth date.');
        setLoading(false);
        return;
      }

        // Check if confirm password is empty
    if (!registerFormData.password2) {
      setErrorSignup('Please confirm your password.');
      setLoading(false);
      return;
    }

    

  
      // Calculate age based on the provided birth date
      const birthDate = new Date(registerFormData.individual.birth_date);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
  
      // Check if the user is at least 18 years old
      if (age < 18) {
        setErrorSignup('You must be 18 years old or above to register.');
        setLoading(false);
  
       
        return;
      }
  
      // Continue with the registration process
      const memshipId = random(100000, 999999).toString();
      const registrationData = {
        ...registerFormData,
        username: registerFormData.username,
        individual: {
          ...registerFormData.individual,
          memship_id: memshipId,
          // Exclude properties with empty values
          ...(registerFormData.individual.email && { email: registerFormData.individual.email }),
          ...(registerFormData.individual.mobile_number && {
            mobile_number: registerFormData.individual.mobile_number,
          }),
        },
      };
  
      const response = await axios.post(signupUrl, registrationData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      
      if (response.data.error && response.data.error.includes('Username already exists')) {
        setErrorSignup('Username already exists! Please choose a different username.');
      } else if (response.data.error) {
        setErrorSignup(response.data.error);
      } else {
        // Clear the registration form after a successful registration
        setRegisterFormData({
          username: '',
          password: '',
          password2: '',
          individual: {
            memship_id: '',
            first_name: '',
            last_name: '',
            parallel_group: '',
            birth_date: '',
            gender: '',
            photo: '',
            region:'',
          },
        });
  
        setSuccessMessage('Registered Successfully!');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log('Registration error:',error.response.data.error);
      setErrorSignup(error.response.data.error);
    } finally {
      setLoading(false);
    }
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

  const navigate = useNavigate();



  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (authState.user || localStorage.getItem('token')) {
      navigate('/main');
    }
  }, [authState.user]);


  return (
        <div className="form_register_wrapper">
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={snackbarOpen}
          autoHideDuration={3000} // 3 seconds
          onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message={<span id="message-id">{successMessage}</span>}
          style={{ backgroundColor: 'green' }}
        />
      </Snackbar>
        
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit} className='pr-5' >

            <input
              placeholder="First Name"
              type="text"
              name="individual.first_name"
              value={registerFormData.individual.first_name}
              required
              onChange={handleRegisterChange}

            />


          <input
              placeholder="Last Name"
              type="text"
              name="individual.last_name"
              value={registerFormData.individual.last_name}
              required
              onChange={handleRegisterChange}
            />


          <input
              placeholder="Username"
              type="text"
              name="username"
              value={registerFormData.username}
              required
              onChange={handleRegisterChange}
            />


        <input
            placeholder="Email Address"
            type="email"
            name="individual.email"
            value={registerFormData.individual.email || ''}
            onChange={handleRegisterChange}
            autoComplete="off"
          />

            <input
              placeholder="Mobile Number"
              type="number"
              name="individual.mobile_number"
              value={registerFormData.individual.mobile_number || ''}
              onChange={handleRegisterChange}
            />

            <select
              className="form-select"
              name="individual.gender"
              value={registerFormData.individual.gender}
              required
              onChange={handleRegisterChange}
            >
              <option value="" disabled>
              Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              {/* <MenuItem value="other">Other</MenuItem> */}
            </select>


              <select
                className="form-select"
                name="individual.parallel_group"
                value={registerFormData.individual.parallel_group}
                required
                onChange={handleRegisterChange}
              >
                <option value="" disabled>
                Parallel Group Name
                </option>
                {parallelGroupOptions.map((parallelGroup) => (
                  <option key={parallelGroup.id} value={parallelGroup.id}>
                    {parallelGroup.name}
                  </option>
                ))}
              </select>
              
              <input
              placeholder="Date of Birth"
              type="date"
              className='birth_date'
              name="individual.birth_date"
              value={registerFormData.individual.birth_date || null}
              onChange={handleRegisterChange}
            />

          <select
                className="form-select"
                name="individual.region"
                value={registerFormData.individual.region}
                required
                onChange={handleRegisterChange}
              >
                <option value="" disabled>
                Region
                </option>
                {regionsOptions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.desc}
                  </option>
                ))}
              </select>

       

           <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={registerFormData.password}
              placeholder="Password"
              onChange={handleRegisterChange}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password2"
              value={registerFormData.password2}
              placeholder="Confirm Password"
              onChange={handleRegisterChange}
            />
          <div>
            <input
              type="checkbox"
              id="showPasswordCheckbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPasswordCheckbox"> Show Password</label>
          </div>


<div>
          <div {...getRootProps()} className={isDragActive ? 'dropzone-active' : 'dropzone'}>
            <input {...getInputProps()} id="file-input" />
            {selectedImage ? (
        <div>
          <img src={selectedImage} alt="Selected" className="selected-image" />
        </div>
      ) : (
        <div className="text-[30px] text-gray-500">
          <BiImageAdd />
        </div>
      )}
            {
              isDragActive ?
                <p className='text-xl text-gray-700 font-light'>Drop the image here...</p> :
                <p className='text-xl text-gray-400 font-light'>Drag and drop an image here or</p>
            }
            
          <div  className="choose-image-button">
            Choose Image
          </div>
          </div>


        
        </div>

    <div className='flex gap-3'>
    <input
      type="checkbox"
      id="termsCheckbox"
      checked={agreeToTerms}
      onChange={() => setAgreeToTerms(!agreeToTerms)}
    />
    <label htmlFor="termsCheckbox"> I agree to the <span className='text-[#33C0E4]'>Terms and Conditions</span></label>
</div>
{passwordValidationError && <p style={{ color: 'red' }}>{passwordValidationError}</p>}
          {errorSignup && <p style={{ color: 'red' }}>{errorSignup}</p>}
          <button
            className={`button_register ${!agreeToTerms ? 'disabled' : 'button_register'}`}
            type="submit"
            disabled={!agreeToTerms}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>


        </form>
        </div>
  );
}


