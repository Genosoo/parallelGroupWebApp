/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { TextField,  FormControl, Select, MenuItem,  Snackbar  } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from "react-icons/bi";


const baseUrl = import.meta.env.VITE_URL;
const getMemType = `${baseUrl}/api/user_membership_type/`;
const getMemStatus = `${baseUrl}/api/user_membership_status/`;
const getparallerGroupType = `${baseUrl}/api/parallel_group_type/`;
const getRegions = `${baseUrl}/api/region/`
const getProvince = `${baseUrl}/api/province/`
const getMunicipality = `${baseUrl}/api/municipality/`
const getBrgy = `${baseUrl}/api/barangay/`
const getRegType =`${baseUrl}/api/parallel_group_registration_type/`

// eslint-disable-next-line no-unused-vars
export default function FormUpdate({ data, apiEndpoint, csrfToken, onClose  }) {
    const [loading, setLoading] = useState(false);
  
    const [formData, setFormData] = useState({
        id: data.id,
        name: data.name || "",
        reg_date: data.reg_date || "",
        reg_type: data.reg_type || "",
        application_date: data.application_date || "",
        approved_date: data.approved_date || "",
        closed_date: data.closed_date || "",
        memship_type: data.memship_type || "",
        memship_status: data.memship_status || "",
        grp_type: data.grp_type || "",
        logo: data.logo || "",
        region: data.region || "",
        province: data.province || "",
        municipality: data.municipality || "",
        barangay: data.barangay || "",
        bldg_number: data.bldg_number || "",
        bldg_name: data.bldg_name || "",
        street_number: data.street_number || "",
        street_name: data.street_name || "",
    });
  
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [memTypeOptions, setMemTypeOptions] = useState([]);
    const [memStatusOptions, setMemStatusOptions] = useState([]);
    const [parallelGroupTypeOptions, setParallerGroupTypeOptions] = useState([]);
    const [regionsOptions, setRegionsOptions] = useState([]);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [municipalityOptions, setMunicipalityOptions] = useState([]);
    const [brgyOptions, setBrgyOptions] = useState([]);
    const [regTypeOptions, setRegTypeOptions] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [OldImage, setOldImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);


  
  

  useEffect(() => {
    if (formData.logo) {
      console.log("logo",formData.logo)
      setOldImage(formData.logo)
    }
  }, [formData.logo]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
          [name]: value,
      }));
    };




  
    const handleUpdate = async () => {
      try {
        setLoading(true);
    
        const dataToSend = { ...formData };
    
        // Only include the logo data if it has changed
        if (!isImageChanged) {
          delete dataToSend.logo;
        }
    
        const response = await axios.put(apiEndpoint, dataToSend, {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
    
        console.log("Update success:", response.data);
    
        setSnackbarOpen(true);

        setTimeout(() => (
          window.location.reload()
        ),1000)
      } catch (error) {
        console.error("Error updating data:", error);
      } finally {
        setLoading(false);
      }
    };


    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };


    const onDrop = useCallback((acceptedFiles) => {
      const image = acceptedFiles[0];
    
      if (image) {
        const reader = new FileReader();
    
        reader.onload = () => {
          const base64String = reader.result.split(',')[1];
          const filename = image.name;
    
          const logo = {
            data: base64String,
            filename: filename,
          };
    
          setSelectedImage(URL.createObjectURL(image));
    
          setFormData((prevData) => ({
            ...prevData,
            logo: logo,
          }));
    
          // Set the flag indicating that the image has changed
          setIsImageChanged(true);
    
          console.log(logo);
        };
    
        reader.readAsDataURL(image);
      } else {
        // No image selected, set logo to null or an empty object
        setFormData((prevData) => ({
          ...prevData,
          logo: '', // or logo: {} depending on your API requirements
        }));
    
        // Set the flag indicating that the image has not changed
        setIsImageChanged(false);
      }
    }, [setFormData, setIsImageChanged]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  



    useEffect(() => {
      const fetchData = async () => {
        try {
          const memTypeResponse = await axios.get(getMemType);
          setMemTypeOptions(memTypeResponse.data.success);
          console.log('Test MemType', memTypeResponse.data.success);

          const memStatusResponse = await axios.get(getMemStatus);
          setMemStatusOptions(memStatusResponse.data.success);
          console.log('Test MemStatus', memStatusResponse.data.success);
  
          const parallelGroupTypeResponse = await axios.get(getparallerGroupType);
          setParallerGroupTypeOptions(parallelGroupTypeResponse.data.success);
          console.log('Test Parallel Group Type', parallelGroupTypeResponse.data.success);
  
          const regionsResponse = await axios.get(getRegions);
          setRegionsOptions(regionsResponse.data.success);
          console.log('Test Regions', regionsResponse.data.success)
  
          const provinceResponse = await axios.get(getProvince);
          setProvinceOptions(provinceResponse.data.success);
          console.log('Test Province', provinceResponse.data.success)
  
          const municipalityResponse = await axios.get(getMunicipality);
          setMunicipalityOptions(municipalityResponse.data.success);
          console.log('Test Municipality', municipalityResponse.data.success)
  
            const brgyResponse = await axios.get(getBrgy);
          setBrgyOptions(brgyResponse.data.success);
          console.log('Test Brgy', brgyResponse.data.success)
  
          const regTypeResponse = await axios.get(getRegType);
          setRegTypeOptions(regTypeResponse.data.success);
          console.log('Test Reg type', regTypeResponse.data.success)
     
        } catch (error) {
          console.error('Error fetching options:', error);
        }
      };
  
      fetchData();
    }, []);
  
   

  return (
    <div className="flex flex-col items-center pt-10 font-manrope">
     
        <h2 className="text-lg font-bold">Update Parallel Group</h2>
<div className="flex flex-col gap-5 p-10 w-full">
<Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Adjust as needed
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
            Update successful!
          </MuiAlert>
        </Snackbar>
  <div className="flex flex-col">
    <span>Name:</span>
     <TextField
    type="text"
    name="name"
    value={formData.name || ""}
    onChange={handleInputChange}
  />
  </div>

  <div className="flex flex-col">
    <span>Registration Date:</span>
     <TextField
    type="date"
    name="reg_date"
    value={formData.reg_date || ""}
    onChange={handleInputChange}
  />
  </div>

  <div className="flex flex-col">
    <span>Application Date:</span>
     <TextField
    type="date"
    name="application_date"
    value={formData.application_date || ""}
    onChange={handleInputChange}
  />
  </div>

  <div className="flex flex-col">
    <span>Approved Date:</span>
     <TextField
    type="date"
    name="approved_date"
    value={formData.approved_date || ""}
    onChange={handleInputChange}
  />
  </div>

  
  <div className="flex flex-col">
    <span>Closed Date:</span>
     <TextField
    type="date"
    name="closed_date"
    value={formData.closed_date || ""}
    onChange={handleInputChange}
  />
  </div>

  <div className="flex flex-col">
      <span>Registration Type:</span>
     <FormControl>
              <Select
                name="reg_type"
                value={formData.reg_type}
                onChange={handleInputChange}
              >
                <MenuItem value="" disabled>
                Registration Type 
                </MenuItem>
                {regTypeOptions.map((regType) => (
                  <MenuItem key={regType.id} value={regType.id}>
                    {regType.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
     </div>


  
  <div className="flex flex-col">
      <span>Membership Type:</span>
     <FormControl>
              <Select
                name="memship_type"
                value={formData.memship_type}
                onChange={handleInputChange}
              >
                <MenuItem value="" disabled>
                Membership Type 
                </MenuItem>
                {memTypeOptions.map((memshipType) => (
                  <MenuItem key={memshipType.id} value={memshipType.id}>
                    {memshipType.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
     </div>

  <div className="flex flex-col">
  <span>Membership Status:</span>
  <FormControl>
    <Select
      name="memship_status" 
      value={formData.memship_status}
      onChange={handleInputChange}
    >
      <MenuItem value="" disabled>
        Membership Status
      </MenuItem>
      {memStatusOptions.map((memshipStatus) => (
        <MenuItem key={memshipStatus.id} value={memshipStatus.id}>
          {memshipStatus.desc}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</div>


<div className="flex flex-col">
      <span>Parallel Group Type:</span>
     <FormControl>
              <Select
                name="grp_type"
                value={formData.grp_type}
                onChange={handleInputChange}
              >
                <MenuItem value="" disabled>
                Parallel Group Type:
                </MenuItem>
                {parallelGroupTypeOptions.map((groupType) => (
                  <MenuItem key={groupType.id} value={groupType.id}>
                    {groupType.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
     </div>

     

     <div className="flex flex-col">
      <span>Region:</span>
            <FormControl>
              <Select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
              >
                <MenuItem value="" disabled>
                  Region
                </MenuItem>
                {regionsOptions.map((region) => (
                  <MenuItem key={region.id} value={region.id}>
                    {region.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>

            <div className="flex flex-col">
             <span>Province:</span>
              <FormControl>
                <Select
                  name="province"
                  value={formData.province}
                  onChange={(e) => {
                    handleInputChange(e);
                    setSelectedProvince(e.target.value);
                  }}
                >
                  <MenuItem value="" disabled>
                    Province
                  </MenuItem>
                  {provinceOptions
                  .slice() // Create a shallow copy of the array
                  .sort((a, b) => a.desc.localeCompare(b.desc)) // Sort alphabetically
                  .map((province) => (
                    <MenuItem key={province.id} value={province.id}>
                      {province.desc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> 
            </div>
            


           <div className="flex flex-col">
  <span>City/Municipality:</span>
  <FormControl>
    <Select
      name="municipality"
      value={formData.municipality}
      onChange={(e) => {
        handleInputChange(e);
        setSelectedMunicipality(e.target.value);
      }}
      disabled={!selectedProvince}
    >
      <MenuItem value="" disabled={!selectedProvince}>
        {selectedProvince ? 'City/Municipality' : 'City/Municipality'}
      </MenuItem>
      {municipalityOptions
        .filter((municipality) => municipality.province === parseInt(selectedProvince))
        .slice()
        .sort((a, b) => a.desc.localeCompare(b.desc))
        .map((municipality) => (
          <MenuItem key={municipality.id} value={municipality.id}>
            {municipality.desc}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
</div>

<div className="flex flex-col">
  <span>Barangay:</span>
  <FormControl>
    <Select
      name="barangay"
      value={formData.barangay}
      onChange={handleInputChange}
      disabled={!selectedMunicipality}
    >
      <MenuItem value="" disabled>
        Barangay
      </MenuItem>
      {brgyOptions
        .filter((brgy) => brgy.municipality === parseInt(selectedMunicipality))
        .slice() // Create a shallow copy of the array
        .sort((a, b) => a.desc.localeCompare(b.desc)) // Sort alphabetically
        .map((brgy) => (
          <MenuItem key={brgy.id} value={brgy.id}>
            {brgy.desc}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
</div>

<div className="flex flex-col">
             <span>Bldg Number</span>
              <TextField
                  type="text"
                  name="bldg_number"
                  value={formData.bldg_number}
                  placeholder="Bldg. Number"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
             <span>Bldg Name</span>
              <TextField
                  type="text"
                  name="bldg_name"
                  value={formData.bldg_name}
                  placeholder="Bldg. Name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
             <span>Street Number</span>
          <TextField
            type="text"
            name="street_number"
            value={formData.street_number}
            placeholder="Street. Number"
            onChange={handleInputChange}
          />
          </div>

          <div className="flex flex-col">
             <span>Street Name</span>
        <TextField
            type="text"
            name="street_name"
            value={formData.street_name}
            placeholder="Street. Name"
            onChange={handleInputChange}
          />
          </div>

        <div>
      <div {...getRootProps()} className={isDragActive ? 'dropzone-active' : 'dropzone'}>
        <input {...getInputProps()} id="file-input" />
          <img src={`${baseUrl}${OldImage}`} alt="" className="selected-image" />

        {selectedImage ? (
          <div>
            <img src={selectedImage} alt="Selected" className="selected-image" />
          </div>
        ) : (
          <div className="text-[30px] text-gray-500">
            <BiImageAdd />
          </div>
        )}
        {isDragActive ? (
          <p className='text-xl text-gray-700 font-light'>Drop the logo here...</p>
        ) : (
          <p className='text-xl text-gray-400 font-light'>Drag and drop a logo here or</p>
        )}
        <div className="choose-image-button">
          Choose Logo
        </div>
      </div>
    </div>




  <button
            className={`button_register`}
            type="submit"
            onClick={handleUpdate}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
</div>
    </div>
  );
}
