/* eslint-disable react/prop-types */
import { useAuth } from "../authContext/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRouteComponent = ({ children }) => {
  const auth = useAuth();
  const storedToken = localStorage.getItem('token');

  // Check if the user is authenticated (either through context or localStorage)
  const isAuthenticated = auth.user || storedToken;

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to='/login' />;
  }

  // If the user is authenticated or token exists, render the children (dashboard)
  return children;
};

export default PrivateRouteComponent;
