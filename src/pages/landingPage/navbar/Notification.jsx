import { useState, useEffect } from "react";
import { getNotification } from '../../../api/api';
import axios from 'axios';

import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export default function Notification() {
  const [notificationData, setNotificationData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const notificationResponse = await axios.get(getNotification);
        setNotificationData(notificationResponse.data.success);
        console.log("Notification", notificationResponse.data)
        
   
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotification();
  }, []);



  const handleBadgeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
        <div className="w-[50px] h-[50px] rounded-full shadow-md flex items-center justify-center">
      <Badge  badgeContent={notificationData.filter(notification => !notification.is_read).length} color="primary" onClick={handleBadgeClick}>
        <NotificationsNoneOutlinedIcon color="action" />
      </Badge>
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
     <ul className=" p-2 flex flex-col gap-2 font-manrope h-[300px] overflow-y-auto">
  {notificationData.some(notification => !notification.is_read) ? (
    notificationData.map((notification, index) => (
      // Only render if is_read is false
      !notification.is_read && (
        <li className="p-3 text-xs font-medium bg-slate-100 rounded-lg" key={index}>
          <p>{notification.desc}</p>
        </li>
      )
    ))
  ) : (
    <li className="bg-white p-3 text-xs font-medium">No message to read.</li>
  )}
</ul>

      </Popover>
    
    </>
  );
}
