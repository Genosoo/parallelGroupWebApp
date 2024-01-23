import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonLogout from './ButtonLogout';
import { apiAccount,baseUrl } from '../../../api/api';

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
            padding:"05px 10px",
            boxShadow:"0px 0px 5px #00000039"
        }}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon sx={{color:"#000"}} />}
      >
          <div className="flex gap-5 items-center   font-montserrat ">
          <Avatar alt={data.individual?.first_name}   sx={{ width: 35, height: 35 }}  src={`${baseUrl}${data.individual?.photo}`} />
                <div className="flex flex-col items-start   text-black">
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

     <div className='p-2 flex flex-col gap-1'>
          
      {/* Conditionally render Dashboard link based on role */}
      {roles === 'Administrator' || roles === 'Parallel Group Administrator' ? (
          <Link to={'/parallel-groups/home'}>
             <div className="flex flex-col w-full gap-1">
             <span className='flex  items-center  font-montserrat  
               bg-[#298ad915] w-full p-3 text-[#298BD9] rounded-[15px]
                hover:bg-gray-800 hover:text-white duration-200'>Home</span>
            <div className='h-[1px] bg-[#298ad949] w-full'></div>
             </div>
          </Link >
        ) : null}
       
        {/* <Link to={'/parallel-groups/command-center'}>
        <div className="flex flex-col w-full gap-1 " onClick={handleClose}>
             <span className='flex  items-center  font-montserrat  
               bg-[#298ad915] w-full p-3 text-[#298BD9] rounded-[15px]
                duration-200 hover:bg-gray-800 hover:text-white'>Command Center</span>
            <div className='h-[1px] bg-[#298ad949] w-full'></div>
             </div>
        </Link> 

        <Link to={'/parallel-groups/new-report'}>
        <div className="flex flex-col w-full gap-1 " onClick={handleClose}>
             <span className='flex  items-center  font-montserrat  
               bg-[#298ad915] w-full p-3 text-[#298BD9] rounded-[15px]
                e duration-200 hover:bg-gray-800 hover:text-white'>New Report</span>
            <div className='h-[1px] bg-[#298ad949] w-full'></div>
             </div>
        </Link> 

        <Link to={'/parallel-groups/report-tracker'}>
        <div className="flex flex-col w-full gap-1 " onClick={handleClose}>
             <span className='flex  items-center  font-montserrat  
               bg-[#298ad915] w-full p-3 text-[#298BD9] rounded-[15px]
                duration-200 hover:bg-gray-800 hover:text-white'>Report Tracker</span>
            <div className='h-[1px] bg-[#298ad949] w-full'></div>
             </div>
        </Link> 

     

        <Link to={'/parallel-groups/watch/'}>
        <div className="flex flex-col w-full gap-1 " onClick={handleClose}>
             <span className='flex  items-center  font-montserrat  
               bg-[#298ad915] w-full p-3 text-[#298BD9] rounded-[15px]
                 duration-200 hover:bg-gray-800 hover:text-white'>Watch Now</span>
            <div className='h-[1px] bg-[#298ad949] w-full'></div>
             </div>
        </Link>  */}

        <Link to={'/main/account/'}>
        <div className="flex flex-col w-full gap-1" onClick={handleClose}>
             <span className='flex  items-center  font-montserrat  
               bg-[#298ad915] w-full p-3 text-[#298BD9] rounded-[15px] hover:bg-gray-800 hover:text-white duration-200'>My Profile</span>
            <div className='h-[1px] bg-[#298ad949] w-full'></div>
             </div>
        </Link> 

          <ButtonLogout />
     </div>
      </StyledMenu>
    </div>
  );
}
