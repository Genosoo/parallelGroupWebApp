 /* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext/AuthContext';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import logo from '../../assets/login/logo.png'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from "react-icons/bi";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Menu } from '@mui/icons-material';
import { random } from 'lodash';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useCsrfToken } from '../../../context/CsrfTokenContext';
import {
  loginUrl,
  signupUrl,
  getPrefix,
  getSuffix,
  getOccupation,
  getRegions,
  getProvince,
  getMunicipality,
  getBrgy,
  getMembershipType,
  getMembershipStatus,
  getPosition,
  getParallelGroup
} from '../../../api/api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Login() {
  const {csrfToken} = useCsrfToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorSignup, setErrorSignup] = useState('');
  const { authState, dispatch } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });



  const [open, setOpen] = React.useState(false);

  const [prefixOptions, setPrefixOptions] = useState([]);
  const [suffixOptions, setSuffixOptions] = useState([]);
  const [occupationOptions, setOccupationOptions] = useState([]);
  const [regionsOptions, setRegionsOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [membershipTypeOptions, setMembershipTypeOptions] = useState([]);
  const [membershipStatusOptions, setMembershipStatusOptions] = useState([]);
  const [parallelGroupOptions, setParallelGroupOptions] = useState([])

  const [registerFormData, setRegisterFormData] = useState({
    username:'',
    password: '',
    password2: '',
    individual: {
      memship_id:'',
      // prefix:'',
      first_name:'',
      // middle_name:'',
      last_name:'',
      // suffix: '',
      // nickname:'',
      mobile_number:'',
      email:'',
      parallel_group:'',
      birth_date:'',
      gender:'',
      // occupation:'',
      // region:'',
      // province:'',
      // municipality:'',
      // barangay:'',
      // bldg_number:'',
      // bldg_name:'',
      // street_number:'',
      // street_name:'',
      // memship_type:'',
      // position:'',
      // application_date:'',
      // approved_date:'',
      // memship_status:'',
      // closed_date:'',
      photo:'',
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
        // Assuming the API returns an array of prefix options, e.g., ["Mr", "Mrs", "Ms"]
        const prefixResponse = await axios.get(getPrefix);
        setPrefixOptions(prefixResponse.data.success);
        console.log('Test Prefix', prefixResponse.data.success)
  
        // Assuming the API returns an array of suffix options, e.g., ["Jr", "Sr", "III"]
        const suffixResponse = await axios.get(getSuffix);
        setSuffixOptions(suffixResponse.data.success);
        console.log('Test Suffix', suffixResponse.data.success)

        const occupationResponse = await axios.get(getOccupation);
        setOccupationOptions(occupationResponse.data.success);
        console.log('Test Occupation', occupationResponse.data.success)

        const regionsResponse = await axios.get(getRegions);
        setRegionsOptions(regionsResponse.data.success);
        console.log('Test Regions', regionsResponse.data.success)

        
        const provinceResponse = await axios.get(getProvince);
        setProvinceOptions(provinceResponse.data.success);
        console.log('Test Province', provinceResponse.data.success)

        const municipalityResponse = await axios.get(getMunicipality);
        setMunicipalityOptions(municipalityResponse.data.success);
        console.log('Test Municipality', municipalityResponse.data.success)

        const brgyResponse = await axios.get(getBrgy);
        setBrgyOptions(brgyResponse.data.success);
        console.log('Test Brgy', brgyResponse.data.success)

        
        const membershipTypeResponse = await axios.get(getMembershipType);
        setMembershipTypeOptions(membershipTypeResponse.data.success);
        console.log('Test Membership Type', membershipTypeResponse.data.success)

        const positionResponse = await axios.get(getPosition);
        setPositionOptions(positionResponse.data.success);
        console.log('Test Position', positionResponse.data.success)

        const membershipStatusResponse = await axios.get(getMembershipStatus);
        setMembershipStatusOptions(membershipStatusResponse.data.success);
        console.log('Test Membership Status', membershipStatusResponse.data.success)

        const parallelGroupResponse = await axios.get(getParallelGroup);
        setParallelGroupOptions(parallelGroupResponse.data.success);
        console.log('Test Parallel Group', parallelGroupResponse.data.success)

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

    
         // Check if gender is selected
         if (!registerFormData.individual.email) {
          setErrorSignup('Please create your email address.');
          setLoading(false);
          return;
        }


        
         // Check if gender is selected
         if (!registerFormData.individual.mobile_number) {
          setErrorSignup('Please add your Mobile Number');
          setLoading(false);
          return;
        }

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
        username: registerFormData.individual.email,
        individual: {
          ...registerFormData.individual,
          memship_id: memshipId,
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
            mobile_number: '',
            email: '',
            parallel_group: '',
            birth_date: '',
            gender: '',
            photo: '',
          },
        });
  
        setSuccessMessage('Registered Successfully!');
        setSnackbarOpen(true);
        setOpen(false);
      }
    } catch (error) {
      console.log('Registration error:',error.response.data.error);
      setErrorSignup(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

 



  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(loginUrl, formData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      // Check the response for errors
      if (response.data.error) {
        setError(response.data.error);
      } else {
        const { token } = response.data;
        dispatch({ type: 'LOGIN', payload: { user: formData.username, token } });
        navigate('/main/');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setError('Wrong credentials. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (authState.user || localStorage.getItem('token')) {
      navigate('/main');
    }
  }, [authState.user]);


  return (
    <div className="form_container">
      
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
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
          <form onSubmit={handleRegisterSubmit}>

            <TextField
          label="First Name"
              type="text"
              name="individual.first_name"
              value={registerFormData.individual.first_name}
              placeholder="First Name"
              required
              onChange={handleRegisterChange}
            />


          <TextField
          label="Last Name"
              type="text"
              name="individual.last_name"
              value={registerFormData.individual.last_name}
              placeholder="Last Name"
              required
              onChange={handleRegisterChange}
            />

        <TextField
        label="Email Address"
            type="email"
            name="individual.email"
            value={registerFormData.individual.email}
            placeholder="Email Address"
            required
            onChange={handleRegisterChange}
          />

            <TextField
              type="number"
              name="individual.mobile_number"
              value={registerFormData.individual.mobile_number}
              placeholder="Mobile Number"
              required
              onChange={handleRegisterChange}
            />

<FormControl>
            <InputLabel>Gender</InputLabel>
            <Select
              name="individual.gender"
              value={registerFormData.individual.gender}
              required
              onChange={handleRegisterChange}
            >
              <MenuItem value="" disabled>
                Select Gender
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              {/* <MenuItem value="other">Other</MenuItem> */}
            </Select>
          </FormControl>


              <FormControl>
              <InputLabel>Parallel Group Name</InputLabel>
              <Select
                name="individual.parallel_group"
                value={registerFormData.individual.parallel_group}
                required
                onChange={handleRegisterChange}
              >
                <MenuItem value="" disabled>
                Parallel Group Name
                </MenuItem>
                {parallelGroupOptions.map((parallelGroup) => (
                  <MenuItem key={parallelGroup.id} value={parallelGroup.id}>
                    {parallelGroup.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    value={registerFormData.individual.birth_date || null}
    label="Date of Birth"
    renderInput={(props) => (
      <TextField
        {...props}
        label="Date of Birth"
        placeholder="Date of Birth"
      />
    )}
    
    onChange={(date) => {
      const formattedDate = date ? date.format('YYYY-MM-DD') : null;
      handleRegisterChange({
        target: {
          name: 'individual.birth_date',
          value: formattedDate,
        },
      });
    }}
  />
</LocalizationProvider>

       

           <TextField
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={registerFormData.password}
              placeholder="Password"
              onChange={handleRegisterChange}
            />
            <TextField
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

          <div className='button_signin' onClick={handleClose}>Sign In</div>

        </form>
        </div>
      </Dialog>
        <img src={logo} alt="logo" />

       <div className="form_form_wrapper">
        <div className="form_title">
            <h2>Login</h2>
            <p>Registered users can login to access the system. </p>
        </div>


       <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="username"
            value={formData.username}
            placeholder="Enter username or Email "
            onChange={handleChange}
          />
          <input
            className="input"
            type="password"
            value={formData.password}
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="form_button">
            <button className="btn_login" type="submit">
                {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <div className="btn_register" onClick={handleClickOpen}>Register</div>
          </div>
        </form>
       </div>
      </div>
  );
}


