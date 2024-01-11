import { Routes, Route } from 'react-router-dom'
import Dashboard from '../../pages/dashboard/Dashboard'
import Users from '../../pages/users/Users'
import ParallelGroups from '../../pages/parallel_groups/ParallelGroup'
import Map from '../../pages/map/Map'
import Account from '../../pages/account/Account'
import Prefix from '../../pages/prefix/Prefix'
import Member from '../../pages/member/Member'
import Roles from '../../pages/roles/Roles'
import Admin from '../../pages/admin/Admin'

export default function ContentRoutes() {
  return (
    <Routes>
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="users" element={<Users />}/>
        <Route path="members" element={<Member />}/>
        <Route path="parallel-groups" element={<ParallelGroups />}/>
        <Route path="map" element={<Map />}/>
        <Route path="account" element={<Account/>}/>
        <Route path="prefix" element={<Prefix />}/>
        <Route path="roles" element={<Roles />}/>
        <Route path="administrators" element={<Admin />}/>
    </Routes>
  )
}
