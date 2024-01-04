import { Routes, Route } from 'react-router-dom'
import Dashboard from '../../pages/dashboard/Dashboard'
import Users from '../../pages/users/Users'
import Individual from '../../pages/individual/Individual'
import ParallelGroups from '../../pages/parallel_groups/ParallelGroup'
import Map from '../../pages/map/Map'

export default function ContentRoutes() {
  return (
    <Routes>
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="users" element={<Users />}/>
        <Route path="individual" element={<Individual />}/>
        <Route path="parallel-groups" element={<ParallelGroups />}/>
        <Route path="map" element={<Map />}/>
    </Routes>
  )
}
