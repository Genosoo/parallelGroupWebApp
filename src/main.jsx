import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext/AuthContext.jsx'
import { CsrfTokenProvider } from './context/csrftoken/CsrfTokenContext.jsx';

import './styles/index.css';
import './styles/navbar.css';
import './styles/users.css';
import './styles/map.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CsrfTokenProvider>
   <AuthProvider>
     <BrowserRouter>
        <App />
      </BrowserRouter>
   </AuthProvider>
   </CsrfTokenProvider>
  ,
)
