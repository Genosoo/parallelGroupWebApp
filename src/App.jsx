import { Routes, Route } from 'react-router-dom'

import RoutesDashboard from './components/content_routes/Routes_dashboard'
import RoutesLandingPage from './components/content_routes/Routes_landing_page'

import LayoutDashboard from './layouts/Layout_dashboard'
import LayoutLandingPage from './layouts/Layout_landing_page'

import PrivateRoute from './auth/privateRoute/PrivateRoute'


import Main from './pages/main/Main'
import Home from './pages/landingPage/home/Home'
import About from './pages/landingPage/about/About'


export default function App() {
  return (
    <Routes>
      <Route path='' element={<Main />} />
      <Route path='/main' element={<Main />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />

      <Route element={<LayoutLandingPage />}>
        <Route path={"/parallel-groups/*"} element={
          <PrivateRoute>
            <RoutesLandingPage />
          </PrivateRoute>
        } />
      </Route>
      
      <Route element={<LayoutDashboard />}>
          <Route path={"/main/*"} element={
             <PrivateRoute>
                 <RoutesDashboard />
             </PrivateRoute>
          } />
        </Route>
    </Routes>
  )
}
