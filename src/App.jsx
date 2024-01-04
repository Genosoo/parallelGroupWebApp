import { Routes, Route } from 'react-router-dom'
import ContentRoutes from './components/content_routes/ContentRoutes'
import Layout from './layouts/Layouts'
import Login from './auth/login/Login'
import PrivateRoute from './auth/privateRoute/PrivateRoute'

export default function App() {
  return (
    <Routes>
      <Route path='' element={<Login />} />
      <Route path='/login' element={<Login />} />
      
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
