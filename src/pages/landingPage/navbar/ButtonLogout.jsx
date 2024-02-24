/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth } from '../../../context/authContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCsrfToken } from '../../../context/csrftoken/CsrfTokenContext';
import { logoutUrl } from '../../../api/api';



// eslint-disable-next-line react/prop-types, no-unused-vars
export default function ButtonLogout({isOpen}) {
    const { dispatch } = useAuth();
    const {csrfToken} = useCsrfToken();
    const navigate = useNavigate()



      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          const headers = {
            'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
          };
      
          await axios.get(logoutUrl, null, { headers });
          dispatch({ type: 'LOGOUT' });
          navigate('/main');
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
