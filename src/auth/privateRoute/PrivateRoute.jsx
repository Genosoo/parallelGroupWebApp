/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRouteComponent = ({ children }) => {
  const sessionId = Cookies.get('sessionid'); 
  console.log('sessionId', sessionId)
  
  if (!sessionId) {
    // Redirect to the login page if not authenticated
    return <Navigate to='/main' />;
  }

  // If the user is authenticated or sessionid exists, render the children (dashboard)
  return children;
};

export default PrivateRouteComponent;
