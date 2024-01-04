// StyledBreadcrumbs.js

import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';

function CustomBreadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb ">
      {paths.slice(1).map((path, index) => (
        <Link className='breadcrumbs' to={`/${paths.slice(1, index + 2).join('/')}`} key={path}>
          {path}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default CustomBreadcrumbs;
