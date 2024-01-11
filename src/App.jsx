import { Routes, Route } from 'react-router-dom'
import ContentRoutes from './components/content_routes/ContentRoutes'
import Layout from './layouts/Layouts'
import LandingPageLayout from './layouts/LandingPageLayout'
import Login from './auth/login/Login'
import PrivateRoute from './auth/privateRoute/PrivateRoute'
import Home from './pages/landingPage/home/Home'
import About from './pages/landingPage/about/About'
import LandingPageRoutes from './components/content_routes/LandingPageRoutes'


export default function App() {
  return (
    <Routes>
      <Route path='' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />

      <Route element={<LandingPageLayout />}>
        <Route path={"/parallel-groups/*"} element={<LandingPageRoutes />} />
      </Route>
      
      <Route element={<Layout />}>
          <Route path={"/main/*"} element={
             <PrivateRoute>
              <ContentRoutes />
             </PrivateRoute>
          } />
        </Route>
    </Routes>
  )
}
