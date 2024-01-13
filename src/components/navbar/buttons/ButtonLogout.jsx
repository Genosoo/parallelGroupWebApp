/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/authContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_URL;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`
const logoutUrl = `${baseUrl}/api/logout/`


// eslint-disable-next-line react/prop-types, no-unused-vars
export default function ButtonLogout({isOpen}) {
    const [csrfToken, setCsrfToken] = useState('');
    const { dispatch } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        const getTheCsrfToken = async () => {
          try {
            const response = await axios.get(getCsrfTokenUrl);
            setCsrfToken(response.data['csrf-token']);
            console.log(response.data['csrf-token'])
          } catch (error) {
            console.log(error);
          }
        };
    
      
        getTheCsrfToken();
      }, []);


      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          const headers = {
            'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
          };
      
          await axios.get(logoutUrl, null, { headers });
          dispatch({ type: 'LOGOUT' });
          navigate('/login');
        } catch (error) {
          console.error('Logout error:', error);
        }
      };
    

  return (
    <span className='flex  items-center font-montserrat cursor-pointer
    bg-[#298ad915] w-full p-3 text-[#298BD9] rounded-[15px] hover:bg-gray-800 hover:text-white duration-200' onClick={handleLogout}>
      Logout
      </span>
  )
}
