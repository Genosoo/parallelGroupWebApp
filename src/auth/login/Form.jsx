 /* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';
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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Menu } from '@mui/icons-material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const baseUrl = import.meta.env.VITE_URL;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;
const loginUrl = `${baseUrl}/api/login/`;
const signupUrl = `${baseUrl}/api/signup/`;

const getPrefix = `${baseUrl}/api/user_prefix/`
const getSuffix = `${baseUrl}/api/user_suffix/`
const getOccupation = `${baseUrl}/api/user_occupation/`
const getRegions = `${baseUrl}/api/region/`
const getProvince = `${baseUrl}/api/province/`
const getMunicipality = `${baseUrl}/api/municipality/`
const getBrgy = `${baseUrl}/api/barangay/`
const getMembershipType = `${baseUrl}/api/user_membership_type/`
const getPosition = `${baseUrl}/api/position/`
const getMembershipStatus = `${baseUrl}/api/parallel_group_membership_status/`


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorSignup, setErrorSignup] = useState('');
  const { authState, dispatch } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });



  const [csrfToken, setCsrfToken] = useState('');
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

  const [registerFormData, setRegisterFormData] = useState({
    username:'',
    password: '@Password123',
    password2: '@Password123',
    individual: {
      memship_id:'',
      prefix:'',
      first_name:'',
      last_name:'',
      suffix: '',
      nickname:'',
      mobile_number:'',
      email:'',
      occupation:'',
      region:'',
      province:'',
      municipality:'',
      barangay:'',
      bldg_number:'',
      bldg_name:'',
      street_number:'',
      street_name:'',
      memship_type:'',
      position:'',
      application_date:'',
      approved_date:'',
      memship_status:'',
      closed_date:'',
      photo:'',
    }, 
  });
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        // Convert the image to base64 and update the registerFormData
        const base64Image = reader.result.split(',')[1]; // Extract the base64 data
        const filename = file.name; // Get the filename
        setRegisterFormData((prevData) => ({
          ...prevData,
          individual: {
            ...prevData.individual,
            photo: {
              data: base64Image,
              filename: filename,
            },
          },
        }));
      };
  
      reader.readAsDataURL(file);
    }
  };
  
  

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

       // Generate a unique ID for memship_id
    const memshipId = uuid();

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

      // Check the response for errors
      if (response.data.error) {
        setError(response.data.error);
      } else {
        // Clear the registration form after a successful registration
        setRegisterFormData({
          username: '',
          password: '',
          password2: '',
          individual: {
            prefix:'',
            first_name: '',
            last_name: '',
            suffix:'',
            nickname:'',
            mobile_number:'',
            email:'',
            occupation:'',
            region:'',
            province:'',
            municipality:'',
            barangay:'',
            bldg_number:'',
            bldg_name:'',
            street_number:'',
            street_name:'',
            memship_type:'',
            position:'',
            application_date:'',
            approved_date:'',
            memship_status:'',
            closed_date:'',
            photo:'',
          },
        });

        setSuccessMessage('Registration successful!'); // Add this line
        setOpen(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorSignup('An error occurred during registration. Please try again later.');
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
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
          <FormControl>
              <InputLabel>Prefix</InputLabel>
              <Select
                name="individual.prefix"
                value={registerFormData.individual.prefix}
                onChange={handleRegisterChange}
              >
                <MenuItem value="" disabled>
                  Prefix
                </MenuItem>
                {prefixOptions.map((prefix) => (
                  <MenuItem key={prefix.id} value={prefix.id}>
                    {prefix.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="text"
              name="individual.first_name"
              value={registerFormData.individual.first_name}
              placeholder="First name"
              onChange={handleRegisterChange}
            />

          <TextField
              type="text"
              name="individual.last_name"
              value={registerFormData.individual.last_name}
              placeholder="Last name"
              onChange={handleRegisterChange}
            />

         
            <FormControl>
              <InputLabel>Suffix</InputLabel>
              <Select
                name="individual.suffix"
                value={registerFormData.individual.suffix}
                onChange={handleRegisterChange}
              >
                <MenuItem value="" disabled>
                  Suffix
                </MenuItem>
                {suffixOptions.map((suffix) => (
                  <MenuItem key={suffix.id} value={suffix.id}>
                    {suffix.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


           
            <TextField
              type="text"
              name="individual.nickname"
              value={registerFormData.individual.nickname}
              placeholder="Nickname"
              onChange={handleRegisterChange}
            />

            <TextField
              type="number"
              name="individual.mobile_number"
              value={registerFormData.individual.mobile_number}
              placeholder="Mobile Number"
              onChange={handleRegisterChange}
            />

          
          <TextField
            type="email"
            name="individual.email"
            value={registerFormData.individual.email}
            placeholder="Email Address"
            onChange={handleRegisterChange}
          />

            
            <FormControl>
              <InputLabel>Occupation</InputLabel>
              <Select
                name="individual.occupation"
                value={registerFormData.individual.occupation}
                onChange={handleRegisterChange}
              >
                <MenuItem value="" disabled>
                 Occupation
                </MenuItem>
                {occupationOptions.map((occupation) => (
                  <MenuItem key={occupation.id} value={occupation.id}>
                    {occupation.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


            <FormControl>
              <InputLabel>Region</InputLabel>
              <Select
                name="individual.region"
                value={registerFormData.individual.region}
                onChange={handleRegisterChange}
              >
                <MenuItem value="" disabled>
                  Region
                </MenuItem>
                {regionsOptions.map((region) => (
                  <MenuItem key={region.id} value={region.id}>
                    {region.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            

            <FormControl>
              <InputLabel>Province</InputLabel>
              <Select
                name="individual.province"
                value={registerFormData.individual.province}
                onChange={(e) => {
                  handleRegisterChange(e);
                  setSelectedProvince(e.target.value);
                }}
              >
                <MenuItem value="" disabled>
                  Province
                </MenuItem>
                {provinceOptions
                .slice() // Create a shallow copy of the array
                .sort((a, b) => a.desc.localeCompare(b.desc)) // Sort alphabetically
                .map((province) => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Municipality</InputLabel>
              <Select
                name="individual.municipality"
                value={registerFormData.individual.municipality}
                onChange={(e) => {
                  handleRegisterChange(e);
                  setSelectedMunicipality(e.target.value);
              
                  // Find the selected municipality based on its ID
                  const selectedMunicipalityObject = municipalityOptions.find(
                    (municipality) => municipality.id === parseInt(e.target.value)
                  );
              
                  // Update legist_dist in the state
                  setRegisterFormData((prevData) => ({
                    ...prevData,
                    individual: {
                      ...prevData.individual,
                      legist_dist: selectedMunicipalityObject ? selectedMunicipalityObject.legist_dist : '',
                    },
                  }));
                }}
                disabled={!selectedProvince}
              >
              <MenuItem value="" disabled={!selectedProvince}>
                {selectedProvince ? 'City/Municipality' : 'City/Municipality'}
              </MenuItem>
              {municipalityOptions
                .filter((municipality) => municipality.province === parseInt(selectedProvince))
                .slice()
                .sort((a, b) => a.desc.localeCompare(b.desc))
                .map((municipality) => (
                  <MenuItem key={municipality.id} value={municipality.id}>
                    {municipality.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="text"
              name="individual.legist_dist"
              value={registerFormData.individual.legist_dist}
              placeholder="District"
              disabled
              onChange={handleRegisterChange}
            />

            <FormControl>
              <InputLabel>Barangay</InputLabel>
              <Select
                name="individual.barangay"
                value={registerFormData.individual.barangay}
                onChange={handleRegisterChange}
                 disabled={!selectedMunicipality}
                
              >
              <MenuItem value="" disabled>
                Barangay
                </MenuItem>
                {brgyOptions
                  .filter((brgy) => brgy.municipality === parseInt(selectedMunicipality))
                  .slice() // Create a shallow copy of the array
                  .sort((a, b) => a.desc.localeCompare(b.desc)) // Sort alphabetically
                  .map((brgy) => (
                    <MenuItem key={brgy.id} value={brgy.id}>
                      {brgy.desc}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>


            <div className='flex justify-between'>
              <TextField
                  type="text"
                  name="individual.bldg_number"
                  value={registerFormData.individual.bldg_number}
                  placeholder="Bldg. Number"
                  onChange={handleRegisterChange}
                />
              <TextField
                  type="text"
                  name="individual.bldg_name"
                  value={registerFormData.individual.bldg_name}
                  placeholder="Bldg. Name"
                  onChange={handleRegisterChange}
                />
            </div>

          <TextField
            type="text"
            name="individual.street_number"
            value={registerFormData.individual.street_number}
            placeholder="Street. Number"
            onChange={handleRegisterChange}
          />
        <TextField
            type="text"
            name="individual.street_name"
            value={registerFormData.individual.street_name}
            placeholder="Street. Name"
            onChange={handleRegisterChange}
          />




            <FormControl>
              <InputLabel>Membership Type</InputLabel>
              <Select
                name="individual.memship_type"
                value={registerFormData.individual.memship_type}
                onChange={handleRegisterChange}
              >
              <MenuItem value="" disabled>
             Membership Type
              </MenuItem>
                  {membershipTypeOptions.map((membershipType) => (
                    <MenuItem key={membershipType.id} value={membershipType.id}>
                      {membershipType.desc}
              </MenuItem>
              ))}
              </Select>
            </FormControl>



            <FormControl>
              <InputLabel>Position</InputLabel>
              <Select
                name="individual.position"
                value={registerFormData.individual.position}
                onChange={handleRegisterChange}
              >
                <MenuItem value="" disabled>
                  Position
                </MenuItem>
                {positionOptions.map((position) => (
                  <MenuItem key={position.id} value={position.id}>
                    {position.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    value={registerFormData.individual.application_date || null}
    label="Membership Date Application"
    renderInput={(props) => (
      <TextField
        {...props}
        label="Membership Date Application"
        placeholder="Membership Date Application"
      />
    )}
    onChange={(date) => {
      const formattedDate = date ? date.format('YYYY-MM-DD') : null;
      handleRegisterChange({
        target: {
          name: 'individual.application_date',
          value: formattedDate,
        },
      });
    }}
  />
</LocalizationProvider>


<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    value={registerFormData.individual.approved_date || null}
    label="Membership Date Approved"
    renderInput={(props) => (
      <TextField
        {...props}
        label="Membership Date Approved"
        placeholder="Membership Date Approved"
      />
    )}
    onChange={(date) => {
      const formattedDate = date ? date.format('YYYY-MM-DD') : null;
      handleRegisterChange({
        target: {
          name: 'individual.approved_date',
          value: formattedDate,
        },
      });
    }}
  />
</LocalizationProvider>

        <FormControl>
              <InputLabel>Membership Status</InputLabel>
              <Select
                name="individual.memship_status"
                value={registerFormData.individual.memship_status}
                onChange={handleRegisterChange}
              >
              <MenuItem value="" disabled>
             Membership Status
              </MenuItem>
                  {membershipStatusOptions.map((memshipStatus) => (
                    <MenuItem key={memshipStatus.id} value={memshipStatus.id}>
                      {memshipStatus.desc}
              </MenuItem>
              ))}
              </Select>
            </FormControl>


            <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    value={registerFormData.individual.closed_date || null}
    label="Membership Date Closed"
    renderInput={(props) => (
      <TextField
        {...props}
        label="Membership Date Closed"
        placeholder="Membership Date Closed"
      />
    )}
    onChange={(date) => {
      const formattedDate = date ? date.format('YYYY-MM-DD') : null;
      handleRegisterChange({
        target: {
          name: 'individual.closed_date',
          value: formattedDate,
        },
      });
    }}
  />
</LocalizationProvider>


        
<div className='image_input_box' >
  <label htmlFor='inputField'>dfdsafadsf</label>
      <input
      id='inputField'
        type="file"
        accept="image/*"
        className='text-white d-none'
        name="individual.photo"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}
    </div>

    <div>
  <input
    type="checkbox"
    id="termsCheckbox"
    checked={agreeToTerms}
    onChange={() => setAgreeToTerms(!agreeToTerms)}
  />
  <label htmlFor="termsCheckbox">I agree to the <b className='text-[#33C0E4]'>Terms and Conditions</b></label>
</div>
{successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      
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
            placeholder="Enter username "
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