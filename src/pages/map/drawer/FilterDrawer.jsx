/* eslint-disable react/prop-types */
import { Drawer } from '@mui/material';
import { IoClose } from "react-icons/io5";

export default function FilterDrawer({
    isDrawerOpen,
    toggleDrawer,
  }) {


    
  return (
    <div className="drawer_wrapper">
      <Drawer
        anchor="right"
        variant="persistent"
        open={isDrawerOpen}
        hideBackdrop={true}
  >
    <div className='drawer_header'>
        <h2>Filters</h2>
        <button className='btn_close_drawer' onClick={toggleDrawer}>
            <IoClose />
        </button>
    </div>
      
  </Drawer>
    </div>
  )
}
