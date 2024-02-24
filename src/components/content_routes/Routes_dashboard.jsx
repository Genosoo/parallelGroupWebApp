import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/Dashboard';
import Users from '../../pages/users/Users';
import ParallelGroups from '../../pages/parallel_groups/ParallelGroup';
import Map from '../../pages/map/Map';
import Account from '../../pages/account/Account';
import Prefix from '../../pages/prefix/Prefix';
import Member from '../../pages/member/Member';
import Roles from '../../pages/roles/Roles';
import Admin from '../../pages/admin/Admin';

const routeConfig = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'users', element: <Users /> },
  { path: 'members', element: <Member /> },
  { path: 'parallel-groups', element: <ParallelGroups /> },
  { path: 'map', element: <Map /> },
  { path: 'account', element: <Account /> },
  { path: 'prefix', element: <Prefix /> },
  { path: 'roles', element: <Roles /> },
  { path: 'administrators', element: <Admin /> },
];

export default function RoutesDashboard() {
  return (
    <Routes>
      {routeConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
