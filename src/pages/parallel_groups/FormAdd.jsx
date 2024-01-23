import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, Select, MenuItem,  Snackbar,  SnackbarContent } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from "react-icons/bi";
import { random } from 'lodash';
import { useCsrfToken } from '../../context/CsrfTokenContext';
import { 
  getParallelGroup, 
  getMembershipType,
  getMembershipStatus,
  getparallerGroupType,
  getRegions,
  getProvince,
  getMunicipality,
  getBrgy,
  getRegType

 } from '../../api/api';


const MyFormComponent = () => {
  const {csrfToken} = useCsrfToken();
  const [formData, setFormData] = useState({
    number: null,
    name: '',
    reg_date: null,
    reg_number: null,
    application_date: null,
    approved_date: null,
    closed_date: null,
    memship_type: '',
    memship_status: '',
    grp_type: '',
    logo: '',
    region:'',
    province:'',
    municipality:'',
    barangay:'',
     bldg_number:'',
      bldg_name:'',
      street_number:'',
      street_name:'',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const [regionsOptions, setRegionsOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [memTypeOptions, setMemTypeOptions] = useState([]);
  const [memStatusOptions, setMemStatusOptions] = useState([]);
  const [regTypeOptions, setRegTypeOptions] = useState([]);


  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');

  const [parallelGroupTypeOptions, setParallerGroupTypeOptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
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

      console.log(logo);
    };

    reader.readAsDataURL(image);
  }, [setFormData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const memTypeResponse = await axios.get(getMembershipType);
        setMemTypeOptions(memTypeResponse.data.success);
        console.log('Test MemType', memTypeResponse.data.success);

        const memStatusResponse = await axios.get(getMembershipStatus);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  

  const generateRegistrationNumber = () => {
    const regNumber = random(100000, 999999).toString();
    const number = random(100000, 999999).toString();
    setFormData((prevData) => ({
      ...prevData,
      reg_number: regNumber,
      number: number,
    }));
  };

  const clearForm = () => {
    setFormData({
      number: null,
      name: '',
      reg_date: null,
      reg_number: null,
      application_date: null,
      approved_date: null,
      closed_date: null,
      memship_type: '',
      memship_status: '',
      grp_type: '',
      logo: '',
      region:'',
      province:'',
      municipality:'',
      barangay:'',
      reg_type:'',
      bldg_number:'',
      bldg_name:'',
      street_number:'',
      street_name:'',
    });
    setSelectedImage(null);
  };

  useEffect(() => {
    generateRegistrationNumber();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setTimeout(() => {
      setError(null);
      setSuccessSnackbarOpen(false);
      clearForm(); // Clear the form fields
    }, 3000);
  };

  const handleSuccessSnackbar = () => {
    setSuccessSnackbarOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(getParallelGroup, formData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.status === 200) {
        console.log('Data submitted successfully!');
        handleSuccessSnackbar();
      } else {
        console.error('Failed to submit data to the API');
        setError('Failed to submit data to the API');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create parallel group');
    } finally {
      setLoading(false);

      // Clear error and successSnackbarOpen states after 3 seconds
      setTimeout(() => {
        setError(null);
        setSuccessSnackbarOpen(false);
        clearForm(); // Clear the form fields
      }, 3000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 font-manrope'>
       <Snackbar
          open={successSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Set anchorOrigin to top center
        >
          <SnackbarContent
            style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}
            message="Parallel Group Created successfully!"
          />
        </Snackbar>

        <Snackbar
          open={error !== null}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <SnackbarContent
            style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
            message={error || "Failed to create parallel group"}
          />
        </Snackbar>
      <div className="flex flex-col">
      <span>Parallel Group Name:</span>
      <TextField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder='Parallel Group Name'
      />
      </div>

      
   

      <div className="flex flex-col">
      <span>Registration Date:</span>
      <TextField
        type="date"
        name="reg_date"
        value={formData.reg_date || ''}
        onChange={handleInputChange}
        
      />
      </div>


      <div className="flex flex-col">
      <span>Application Date:</span>
      <TextField
        type="date"
        name="application_date"
        value={formData.application_date || ''}
        onChange={handleInputChange}
        
      />
      </div>

      <div className="flex flex-col ">
      <span>Approved Date:</span>
      <TextField
        type="date"
        name="approved_date"
        value={formData.approved_date || ''}
        onChange={handleInputChange}
      />
      </div>

      <div className="flex flex-col">
      <span>Closed Date:</span>
      <TextField
        type="date"
        name="closed_date"
        value={formData.closed_date || ''}
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
             <span>City/Municiplality:</span>
               <FormControl>
              <Select
                name="municipality"
                value={formData.municipality}
                onChange={(e) => {
                  handleInputChange(e);
                  setSelectedMunicipality(e.target.value);
              
                  // Find the selected municipality based on its ID
                  const selectedMunicipalityObject = municipalityOptions.find(
                    (municipality) => municipality.id === parseInt(e.target.value)
                  );
              
                  // Update legist_dist in the state
                  setFormData((prevData) => ({
                    ...prevData,
                      legist_dist: selectedMunicipalityObject ? selectedMunicipalityObject.legist_dist : '',
                  }));
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
             <span>Barangay</span>
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
          {selectedImage ? (
            <div>
              <img src={selectedImage} alt="Selected" className="selected-image" />
            </div>
            ) : (
              <div className="text-[30px] text-gray-500">
                <BiImageAdd />
              </div>
            )}
            {
              isDragActive ?
                <p className='text-xl text-gray-700 font-light'>Drop the logo here...</p> :
                <p className='text-xl text-gray-400 font-light'>Drag and drop an logo here or</p>
            }
            
            <div  className="choose-image-button">
              Choose Logo
            </div>
          </div>
        </div>


        <Button type="submit" variant="contained" disabled={loading || successSnackbarOpen}>
  {loading ? 'Submitting...' : 'Submit'}
</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default MyFormComponent;
