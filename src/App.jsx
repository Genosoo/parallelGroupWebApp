import { Routes, Route } from 'react-router-dom'

import RoutesDashboard from './components/content_routes/Routes_dashboard'
import RoutesLandingPage from './components/content_routes/Routes_landing_page'

import LayoutDashboard from './layouts/Layout_dashboard'
import LayoutLandingPage from './layouts/Layout_landing_page'

import PrivateRoute from './auth/privateRoute/PrivateRoute'



export default function App() {
  return (
    <Routes>
      <Route element={<LayoutLandingPage />}>
        <Route path={"/*"} element={
            <RoutesLandingPage />
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
