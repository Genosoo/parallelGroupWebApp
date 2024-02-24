import { GrGroup } from "react-icons/gr";
import { TbUsersGroup } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { PiPerson } from "react-icons/pi";
import { CiSettings } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { BsGrid} from 'react-icons/bs';
import { IoMapOutline } from 'react-icons/io5';

export const links1 = [
    {
        path: '/main/dashboard',
        name: 'Dashboard',
        icon: <BsGrid />,
    },
    {
        path: '/main/roles',
        name: 'Roles',
        icon: <PiPerson />,
    },
    {
        path: '/main/users',
        name: 'Users',
        icon: <CgProfile />,
    },
    
    {
        path: '/main/administrators',
        name: 'Administrators',
        icon: <RiAdminLine />,
    },
    {
        path: '/main/members',
        name: 'Members',
        icon: <GrGroup />,
    },
    {
        path: '/main/parallel-groups',
        name: 'Parallel Groups',
        icon: <TbUsersGroup />,
        subItems: [
            {
                path: '/main/parallel-groups/group1',
                name: 'Group 1',
            },
            {
                path: '/main/parallel-groups/group2',
                name: 'Group 2',
            },
        ],
    },
    {
        path: '/main/map',
        name: 'Map',
        icon: <IoMapOutline />,
    },
];

export const links2 = [
    {
        path: '/main/settings',
        name: 'Settings',
        icon: <CiSettings />,
    },
];
