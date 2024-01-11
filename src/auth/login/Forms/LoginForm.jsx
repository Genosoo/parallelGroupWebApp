/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext/AuthContext';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_URL;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;
const loginUrl = `${baseUrl}/api/login/`;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { authState, dispatch } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [csrfToken, setCsrfToken] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Step 1
  const navigate = useNavigate();

  // // Redirect to dashboard if the user is already authenticated
  // useEffect(() => {
  //   if (authState.user || localStorage.getItem('token')) {
  //     navigate('/main');
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authState.user]);

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setTimeout(() => (
        setError("")
        ),3000)
  
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
        const roles = response.data.user.roles[0];
        dispatch({ type: 'LOGIN', payload: { user: formData.username, token } });
  
        // Step 3: Save user information to local storage if Remember Me is checked
        if (rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', formData.username);
        }
  
       // Redirect based on user roles
       if (!roles || roles === 'user') {
        navigate('/parallel-groups/home');
      } else {
        navigate('/main');
      }
  
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 2: Handle the change for Remember Me checkbox
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className='login_form_wrapper'>
      <h2>Login</h2>
      <p>Registered users can login to access the system. </p>
      <form onSubmit={handleSubmit} className='login_form'>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Enter username or Email "
          onChange={handleChange}
        />
        <input
          type="password"
          value={formData.password}
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        {/* Step 2: Remember Me checkbox */}
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          Remember Me
        </label>

        {error && <span className='error-message'>{error}</span>}
        <div className="form_button">
          <button className="btn_login" type="submit">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}
