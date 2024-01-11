 /* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import TextField from '@mui/material/TextField';

const baseUrl = import.meta.env.VITE_URL;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;
const signupUrl = `${baseUrl}/api/signup/`;



export default function Login({onClose}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorSignup, setErrorSignup] = useState('');

  const [csrfToken, setCsrfToken] = useState('');


  const [registerFormData, setRegisterFormData] = useState({
    username:'',
    password: '',
    password2: '',
    individual: {
      first_name:'',
      last_name:'',
      email:'',
    }, 
  });

  const [successMessage, setSuccessMessage] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage]);


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
            first_name: '',
            last_name: '',
          },
        });

        setSuccessMessage('Registration successful!'); // Add this line

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






  return (
    <div className="">
        <div className="flex flex-col items-center p-10 gap-10 font-manrope">
        {showSuccessMessage && (
            <p style={{ color: 'green' }}>{successMessage}</p>
          )}
          {errorSignup && <p style={{ color: 'red' }}>{errorSignup}</p>}

          <h2 className='text-[2rem] font-semibold font-manrope'>Add User</h2>
          <form className='flex flex-col gap-3 w-full font-manrope' onSubmit={handleRegisterSubmit}>
         
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
             
           

         

          <div className="btn_form_adduser">
          <button className='add' type="submit">
            {loading ? 'Adding...' : 'Add'}
          </button>
           <div className='cancel' onClick={onClose} >Cancel</div>
          </div>
        </form>
        </div>
      </div>
  );
}


