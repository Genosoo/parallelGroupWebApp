import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from "react-icons/bi";


const baseUrl = import.meta.env.VITE_URL;
const myAccount = `${baseUrl}/api/my_account/`;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;

export default function Account() {
  const [, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
  
    if (image) {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        const filename = image.name;
  
        const photo = {
          data: base64String,
          filename: filename,
        };
  
        setSelectedImage(URL.createObjectURL(image));
  
        setData((prevData) => ({
          ...prevData,
          photo: photo,
        }));
  
  
        console.log(photo);
      };
  
      reader.readAsDataURL(image);
    } else {
      // No image selected, set logo to null or an empty object
      setData((prevData) => ({
        ...prevData,
        photo: '', // or logo: {} depending on your API requirements
      }));
  
    }
  }, [setData]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });



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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await axios.get(myAccount);
        setData(dataResponse.data.success.individual);
        setFirstName(dataResponse.data.success.individual.first_name);
        setLastName(dataResponse.data.success.individual.last_name);
        setEmail(dataResponse.data.success.individual.email);
        setMobileNumber(dataResponse.data.success.individual.mobile_number);
        setBirthDate(dataResponse.data.success.individual.birth_date);
        setGender(dataResponse.data.success.individual.gender);
        setPhoto(dataResponse.data.success.individual.photo);
        console.log("my account", dataResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const handleUpdate = async () => {
    try {
      // Calculate age based on the birth date
      const today = new Date();
      const birthDateObj = new Date(birthDate);
      const age = today.getFullYear() - birthDateObj.getFullYear();

      // Check if the user is at least 18 years old
      if (age < 18) {
        setErrorMessage("You must be at least 18 years old to update your account.");
        return;
      }
  
      // Include the photo and filename in the update data
      const updateData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        birth_date: birthDate,
        mobile_number: mobileNumber,
        gender: gender,
        individual: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          mobile_number: mobileNumber,
          birth_date: birthDate,
          gender: gender,
          photo:photo,
        
      }}
  
      // Send the update request
      const updateResponse = await axios.put(
        myAccount,
        updateData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
  
      console.log("update response", updateResponse.data);
      setSuccessMessage("Account updated successfully");
      setTimeout(() => (
        window.location.reload()
      ),1000)
      setErrorMessage(""); // Reset error message if any
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      // Handle success or update UI accordingly
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to update account. Please try again.");
      setSuccessMessage(""); // Reset success message if any
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
  
      // Handle error or update UI accordingly
    }
  };

 



  return (
    <div className="account_container">
      <h2 className="title">Account</h2>
      <div className="form">
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="flex gap-3 ">
        <div className="input_box">
          <span>First Name:</span>
          <input type="text" value={firstName || ""} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="input_box">
          <span>Last Name:</span>
          <input type="text" value={lastName || ""} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="input_box">
          <span>Email Address:</span>
          <input type="text" value={email || ""} onChange={(e) => setEmail(e.target.value)} />
        </div>
        </div>
        
        <div className="flex gap-3">
      

        <div className="input_box">
          <span>Mobile Number:</span>
          <input type="number" value={mobileNumber || ""} onChange={(e) => setMobileNumber(e.target.value)} />
        </div>
        <div className="input_box">
          <span>Birth of Date:</span>
          <input type="date" value={birthDate || ""} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <div className="input_box">
          <span>Gender:</span>
          <select value={gender || ""} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        </div>
       
        <div >

     

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
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    
    </div>
  );
}
