import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import FilterDrawer from './drawer/FilterDrawer';
import { CiFilter } from "react-icons/ci";

export default function Map() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className='map_container'>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}  style={{ height: '100%', width: '100%' }}>
  {/* <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=en"
    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
  /> */}
     <TileLayer
       url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en"
       subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
     />

      <button className='filter_btn' onClick={toggleDrawer}>
        <CiFilter />
      </button>

     <FilterDrawer 
       isDrawerOpen={isDrawerOpen}
       toggleDrawer={toggleDrawer}
     />


  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </div>
  )
}
