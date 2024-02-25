/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../context/authContext/AuthContext';
import axios from 'axios';
import { useCsrfToken } from '../../../../../context/csrftoken/CsrfTokenContext';
import { loginUrl } from '../../../../../api/api';
import './LoginFormStyle.css'


export default function LoginForm() {
  const {csrfToken} = useCsrfToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { authState, dispatch } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false); // Step 1
  const navigate = useNavigate();

  
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
        const roles = response.data.user.roles[0];
        dispatch({ type: 'LOGIN', payload: { user: formData.username} });
  
        // Step 3: Save user information to local storage if Remember Me is checked
        if (rememberMe) {
          localStorage.setItem('username', formData.username);
        }
  
       // Redirect based on user roles
       if (!roles || roles === 'user') {
        navigate('/parallel-groups');
      } else {
        navigate('/main/dashboard');
      }
  
      }
  
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }

    setTimeout(() => (
      setError("")
      ),3000)

  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 2: Handle the change for Remember Me checkbox
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className='loginContainer'>
      <h2>Login</h2>
      <p>Registered users can login to access the system. </p>
      <form onSubmit={handleSubmit} className='loginForm'>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Enter username"
          onChange={handleChange}
        />
        <input
          type="password"
          value={formData.password}
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          Remember Me
        </label>

        {error && <span className='loginErrorMessage'>{error}</span>}
        <div className="formButton">
          <button className="btnLogin" type="submit">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}
