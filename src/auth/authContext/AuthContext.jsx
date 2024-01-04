/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token')
  const initialState = {
    user: null,
    token: token || null,
  };

  const authReducer = (state, action) => {
    switch(action.type){
      case 'LOGIN':
        console.log('User logged in:', action.payload.user);
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', action.payload.user);
        return{
          ...state,
          user: action.payload.user,
          token: action.payload.token,
        };
      case 'LOGOUT':
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return{
          ...state,
          user:null,
          token:null,
        };
      default:
        return state;
    }
  }

  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
