import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonLogout from './ButtonLogout';
import { apiAccount, baseUrl } from '../../../api/api';


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
        const dataResponse = await axios.get(apiAccount);
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
            padding:"5px 10px",
            boxShadow:"0px 0px 5px #00000039",
        }}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon sx={{color:"#000"}} />}
      >
          <div className="avatarBox">
          <Avatar alt={data.individual?.first_name}   sx={{ width: 35, height: 35 }}  src={`${baseUrl}${data.individual?.photo}`} />
                <div className=" flex flex-col items-start   text-black">
                    <p className='font-bold xl:flex lg:hidden text-[12px] leading-3'>
                    {data.individual?.first_name} {data.individual?.last_name}
                    </p>
                    <span className='hidden md:block text-[10px] text-start'>{data?.roles}</span>
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

     <div className='menuBox'>
      {/* Conditionally render Dashboard link based on role */}
      {roles === 'Administrator' || roles === 'Parallel Group Administrator' ? (
          <Link to={'/main/dashboard'}>
             <div className="linkBoxSpan  border-b pb-2 border-[#298ad949]">
             <span className='linkText'>Dashboard</span>
             </div>
          </Link >
        ) : null}
       
        <Link to={'/command-center'}>
        <div className="linkBoxSpan" onClick={handleClose}>
             <span className='linkText'>Command Center</span>
        </div>
        </Link> 

         <div className='flex flex-col gap-2 py-4 border-y mb-2 border-[#298ad949]'>
         <Link to={'/new-report'}>
        <div className="linkBoxSpan" onClick={handleClose}>
             <span className='linkText'>New Report</span>
             </div>
        </Link> 

        <Link to={'/report-tracker'}>
        <div className="linkBoxSpan" onClick={handleClose}>
             <span className='linkText'>Report Tracker</span>
             </div>
        </Link> 

          <Link to={'/report-history'}>
          <div className="linkBoxSpan" onClick={handleClose}>
              <span className='linkText'>Report History</span>
              </div>
          </Link> 
         </div>


         <Link to={'/watch-now'}>
        <div className="linkBoxSpan border-b py-2 border-[#298ad949]" onClick={handleClose}>
             <span className='linkText'>Activity</span>
             </div>
        </Link> 

        <Link to={'/watch-now'}>
        <div className="linkBoxSpan  border-b py-3 border-[#298ad949]" onClick={handleClose}>
             <span className='linkText'>Watch Now</span>
             </div>
        </Link> 

        <Link to={'/account'}>
        <div className="linkBoxSpan " onClick={handleClose}>
             <span className='linkText'>My Profile</span>
             </div>
        </Link> 

        <Link to={'/account'}>
        <div className="linkBoxSpan " onClick={handleClose}>
             <span className='linkText'>QR code</span>
             </div>
        </Link> 

        {roles === 'Administrator'  ? (
        <Link to={'/manage'}>
        <div className="linkBoxSpan border-b pb-2 border-[#298ad949]" onClick={handleClose}>
             <span className='linkText'>Manage</span>
             </div>
        </Link> 
        ) : null }
          <ButtonLogout />
     </div>
      </StyledMenu>
    </div>
  );
}
