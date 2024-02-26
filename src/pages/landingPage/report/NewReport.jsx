/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { apiIncident,  apiIncidentType ,getCsrfTokenUrl } from '../../../api/api';
// import { apiIncident, apiIncidentSeverity, apiIncidentType ,getCsrfTokenUrl } from '../../../api/api';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function MapSelection({ onChange }) {
 useMapEvents({
    click(e) {
      onChange({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    }
  });

  return null; // Return null to avoid rendering anything, as we only need the map events
}



export default function NewReport() {
  const [csrfToken, setCsrfToken] = useState('');
  // const [incidentSeverity, setIncidentSeverity] = useState([])
  const [incidentType, setIncidentType] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [formData, setFormData] = useState({
    type: '',
    incident_details: '',
    glongitude_incident: '',
    glatitude_incident: '',
    address_incident: '',
    glongitude_reported: '',
    glatitude_reported: '',
    incident_image: null,
    address_reported: ''
  });

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  
  

  useEffect(() => {
    const getTheCsrfToken = async () => {
      try {
        const response = await axios.get(getCsrfTokenUrl);
        setCsrfToken(response.data['csrf-token']);
      } catch (error) {
        console.log(error);
      }
    };
  
    getTheCsrfToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCsrfTokenUrl]);




  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setFormData({
              ...formData,
              glatitude_reported: latitude,
              glongitude_reported: longitude,
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    fetchUserLocation();
  }, []);
  

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${formData.glatitude_reported}&lon=${formData.glongitude_reported}&format=json`);
        const { address } = response.data;
        const { road, city, county, state, postcode, country, building } = address;
        const formattedAddress = `${building ? building + ', ' : ''}${road ? road + ', ' : ''}${city ? city + ', ' : ''}${county ? county + ', ' : ''}${state ? state + ', ' : ''}${postcode ? postcode + ', ' : ''}${country ? country : ''}`;
        setFormData((prevFormData) => ({
          ...prevFormData,
          address_reported: formattedAddress,
        }));

        console.log('Address response:', response);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };
  
    if (formData.glatitude_reported && formData.glongitude_reported) {
      fetchAddress();
    }
  }, [formData.glatitude_reported, formData.glongitude_reported]);
  


  useEffect(() => {
    const fetchIncident = async () => {
      try {
        // const serverityResponse = await axios.get(apiIncidentSeverity);
        // setIncidentSeverity(serverityResponse.data.success);

        const typeResponse = await axios.get(apiIncidentType);
        setIncidentType(typeResponse.data.success);

        const incidentResponse = await axios.get(apiIncident);
        console.log("Incident", incidentResponse.data)
        // console.log("Incident Serverity", serverityResponse.data)
        console.log("Incident Type", typeResponse.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchIncident();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      let base64String = reader.result.split(',')[1]; // Extract base64 string without the prefix
      const filename = file.name;
      const photo = {
        data: base64String,
        filename: filename
      };
      setFormData({
        ...formData,
        incident_image: photo
      });
    };
    reader.readAsDataURL(file);
  };
  
  const handleMapChange = async (location) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`);
      const { address } = response.data;
      const { road, city, county, state, postcode, country } = address;
      const formattedAddress = `${road ? road + ', ' : ''}${city ? city + ', ' : ''}${county ? county + ', ' : ''}${state ? state + ', ' : ''}${postcode ? postcode + ', ' : ''}${country ? country : ''}`;
      setFormData({
        ...formData,
        glatitude_incident: location.lat,
        glongitude_incident: location.lng,
        address_incident: formattedAddress
      });
      console.log('address map', response)
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiIncident, formData, {
        headers: {
          'X-CSRFToken': csrfToken // Add CSRF token to request headers
        }
      });
      console.log('Report submitted:', response.data);
      handleOpenSnackbar('Report submitted successfully!');
      // Reset formData state
      setFormData({
        type: '',
        incident_details: '',
        glongitude_incident: '',
        glatitude_incident: '',
        address_incident: '',
        glongitude_reported: '',
        glatitude_reported: '',
        incident_image: null,
        address_reported: ''
      });
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center font-montserrat bg-[#EBF4FD] pt-10">
     
      <div className="w-[80%] px-5">
     

      <Snackbar
          open={openSnackbar}
          autoHideDuration={3000} // Set auto hide duration to 3 seconds
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position Snackbar at the top center
        >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
    {snackbarMessage}
  </MuiAlert>
</Snackbar>



        <h2 className="text-[#298BD9] text-[2rem] font-extrabold">New Report</h2>
        <form onSubmit={handleSubmit } className='flex flex-col gap-3 mt-10'>
          
          {/* <select name="severity" value={formData.severity} onChange={handleChange}>
             <option value="">Select Severity</option>
                {incidentSeverity.map((item, index) => (
                  <option key={index} value={item.id}>{item.severity_name}</option>
                ))}
           </select> */}

        
          <label htmlFor="" className='flex flex-col'>
            <span>Incident Type</span>
          <select className='p-3' name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select Incident Type</option>
                {incidentType.map((item, index) => (
                  <option key={index} value={item.id}>{item.type_name}</option>
                ))}
           </select>
          </label>

          <label className='flex flex-col'>
          <span>Incident Details</span>
          <textarea className='h-[100px]'  name="incident_details" value={formData.incident_details} onChange={handleChange} placeholder="Incident details" />
          </label>

          {/* Incident name */}
          {/* <input type="text" name="incident_name" value={formData.incident_name} onChange={handleChange} placeholder="Incident name" /> */}
          {/* Incident details */}
           <label htmlFor=""  className='flex flex-col'>
            <span>Click the map to select incident  location/address.</span>
          <input type="text" className='p-3' name="address_incident" value={formData.address_incident} onChange={handleChange} placeholder="Address incident" />
          <MapContainer center={[12.8797, 121.774]} zoom={6} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapSelection onChange={handleMapChange} />
            {formData.glatitude_incident && formData.glongitude_incident && (
                <Marker position={[formData.glatitude_incident, formData.glongitude_incident]} />
            )}
        </MapContainer>
           </label>


          <input  hidden type="text" name="glongitude_incident" value={formData.glongitude_incident} onChange={handleChange} placeholder="Glongitude incident" />
          <input  hidden type="text" name="glatitude_incident" value={formData.glatitude_incident} onChange={handleChange} placeholder="Glatitude incident" />
          {/* Glongitude reported */}
          <input hidden type="text" name="glongitude_reported" value={formData.glongitude_reported} onChange={handleChange} placeholder="Glongitude reported" />
          <input hidden  type="text" name="glatitude_reported" value={formData.glatitude_reported} onChange={handleChange} placeholder="Glatitude reported" />
        
           <label htmlFor="" className='flex flex-col'>
            <span>Incident Image</span>
              <input type="file" name="incident_image" onChange={handleFileChange} />
           </label>

           <label htmlFor="" className='flex flex-col'>
            <span>Reported Addresss</span>
          <input type="text" name="address_reported" value={formData.address_reported} onChange={handleChange} placeholder="Address reported" />
           </label>
  
          <button type="submit" className='bg-[#298BD9] text-white p-3'>Submit</button>
        </form>
      </div>
    </div>
  );
}

