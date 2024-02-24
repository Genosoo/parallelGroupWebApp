 /* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useCsrfToken } from '../../context/csrftoken/CsrfTokenContext';
import {
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
  getParallelGroup,
  apiUser,
} from '../../api/api'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function Login() {
  const {csrfToken} = useCsrfToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorSignup, setErrorSignup] = useState('');
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
    }, 
  });
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
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
  
           // Check if gender is selected
    if (!registerFormData.individual.first_name) {
      setErrorSignup('Please input your first name.');
      setLoading(false);

      // Clear the gender-specific error message after 3 seconds
      setTimeout(() => {
        setErrorSignup('');
      }, 3000);

      return;
    }


    if (!registerFormData.individual.last_name) {
      setErrorSignup('Please input your last name.');
      setLoading(false);

      // Clear the gender-specific error message after 3 seconds
      setTimeout(() => {
        setErrorSignup('');
      }, 3000);

      return;
    }

    

         // Check if gender is selected
    if (!registerFormData.individual.gender) {
      setErrorSignup('Please select your gender.');
      setLoading(false);

      // Clear the gender-specific error message after 3 seconds
      setTimeout(() => {
        setErrorSignup('');
      }, 3000);

      return;
    }


    


  
      // Ensure that birth_date is provided
      if (!registerFormData.individual.birth_date) {
        setErrorSignup('Please provide your birth date.');
         // Clear the error message after 3 seconds
      setTimeout(() => {
        setErrorSignup('');
      }, 3000);

        setLoading(false);
        return;
      }

        // Check if confirm password is empty
    if (!registerFormData.password2) {
      setErrorSignup('Please confirm your password.');
      setLoading(false);

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setErrorSignup('');
      }, 3000);

      return;
    }

    // Check if passwords match
    if (registerFormData.password !== registerFormData.password2) {
      setErrorSignup('Passwords do not match. Please confirm your password.');
      setLoading(false);

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setErrorSignup('');
      }, 3000);

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
  
        // Hide the error message after 3 seconds
        setTimeout(() => {
          setErrorSignup('');
        }, 3000);
  
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
        },
      };
  
      const response = await axios.post(apiUser, registrationData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
  
      // Check the response for errors
      if (response.data.error) {
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
          },
        });
  
        setSuccessMessage('Registration successful!');
        setSnackbarOpen(true);

        setTimeout(() => {
          window.location.reload()
        },5000)
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorSignup('An error occurred during registration. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  
  

 


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="">
        <div className="">
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
          <form onSubmit={handleRegisterSubmit} className='flex flex-col gap-4 p-10 overflow-hidden'>

            <TextField
              type="text"
              name="individual.first_name"
              value={registerFormData.individual.first_name}
              placeholder="First Name"
              onChange={handleRegisterChange}
            />


          <TextField
              type="text"
              name="individual.last_name"
              value={registerFormData.individual.last_name}
              placeholder="Last Name"
              onChange={handleRegisterChange}
            />

          <TextField
              type="text"
              name="username"
              value={registerFormData.username}
              placeholder="Username"
              onChange={handleRegisterChange}
            />

        <TextField
            type="email"
            name="individual.email"
            value={registerFormData.individual.email}
            placeholder="Email Address"
            onChange={handleRegisterChange}
          />

            <TextField
              type="number"
              name="individual.mobile_number"
              value={registerFormData.individual.mobile_number}
              placeholder="Mobile Number"
              onChange={handleRegisterChange}
            />

<FormControl>
            <InputLabel>Gender</InputLabel>
            <Select
              name="individual.gender"
              value={registerFormData.individual.gender}
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
    label="Birth Date"
    renderInput={(props) => (
      <TextField
        {...props}
        label="Birth Date"
        placeholder="Birth Date"
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
              type="password"
              name="password"
              value={registerFormData.password}
              placeholder="Password"
              onChange={handleRegisterChange}
            />
            <TextField
              type="password"
              name="password2"
              value={registerFormData.password2}
              placeholder="Confirm Password"
              onChange={handleRegisterChange}
            />


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

    
          {errorSignup && <p style={{ color: 'red' }}>{errorSignup}</p>}
          <button
            className={`button_register`}
            type="submit"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>


        </form>
        </div>
  

    
      </div>
  );
}


