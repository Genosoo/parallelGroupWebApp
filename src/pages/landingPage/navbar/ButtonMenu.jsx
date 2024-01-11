import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import ChangePassword from './ChangePassword'
import { BsPersonVideo2 } from "react-icons/bs";
import ButtonLogout from './ButtonLogout';
import { IoHomeOutline } from "react-icons/io5";


const baseUrl = import.meta.env.VITE_URL;
const getAccount = `${baseUrl}/api/my_account/`;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([])
  const [roles, setRoles] = useState([])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleHome = () => {
  //   // Remove the token from localStorage
  //   localStorage.removeItem('token');
  //   window.location.reload()
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await axios.get(getAccount);
        setData(dataResponse.data.success);
        setRoles(dataResponse.data.success.roles[0]);
        console.log("my account nav", dataResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
            bgcolor:"#fff", 
            borderRadius:"30px",
            padding:"05px 10px",
            boxShadow:"0px 0px 5px #00000039"
        }}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon sx={{color:"#000"}} />}
      >
          <div className="flex gap-5 items-center  justify-center">
          <Avatar alt={data.individual?.first_name}   sx={{ width: 35, height: 35 }}  src={`${baseUrl}${data.individual?.photo}`} />
                <div className="flex flex-col items-start justify-center text-black font-manrope">
                    <p className='font-bold text-[12px] leading-3'>
                    {data.individual?.first_name} {data.individual?.last_name}
                    </p>
                    <span className='text-[10px]'>{data?.roles}</span>
                </div>
          </div>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >

        
      {/* Conditionally render Dashboard link based on role */}
      {roles === 'Administrator' || roles === 'Parallel Group Administrator' ? (
          <Link to={'/main/dashboard'}>
            <MenuItem disableRipple>
              <span className='flex items-center gap-3'><IoHomeOutline/>Dashboard</span>
            </MenuItem>
          </Link>
        ) : null}
       
        <Link to={'/parallel-groups/account/'}>
        <MenuItem onClick={handleClose} disableRipple>
        <span className='flex items-center gap-3'> <BsPersonVideo2 />
         Account </span>
        </MenuItem>
        </Link> 
        <MenuItem disableRipple>
          <ChangePassword />
        </MenuItem>
        <MenuItem disableRipple>
          <ButtonLogout />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
