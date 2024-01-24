import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './css/index.css';
import './css/dashboard.css';
import './css/login.css';
import './css/navbar.css';
import './css/users.css';
import './css/blog.css';
import './css/map.css';
import './css/landing.css';
import './css/news.css';
import './css/loader.css';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/authContext/AuthContext.jsx'
import { CsrfTokenProvider } from './context/CsrfTokenContext.jsx';

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
