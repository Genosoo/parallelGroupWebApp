/* eslint-disable react/prop-types */
// CsrfTokenContext.js
import  { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getCsrfTokenUrl } from '../../api/api'

const CsrfTokenContext = createContext();

export const CsrfTokenProvider = ({ children }) => {

  const [csrfToken, setCsrfToken] = useState('');

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
  }, [getCsrfTokenUrl]);

  return (
    <CsrfTokenContext.Provider value={{ csrfToken }}>
      {children}
    </CsrfTokenContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCsrfToken = () => {
  const context = useContext(CsrfTokenContext);
  if (!context) {
    throw new Error('useCsrfToken must be used within a CsrfTokenProvider');
  }
  return context;
};
