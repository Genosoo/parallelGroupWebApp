import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from "react-icons/bi";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ChangePassword from './ChangePassword'

const baseUrl = import.meta.env.VITE_URL;
const myAccount = `${baseUrl}/api/my_account/`;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;

export default function Account() {
  const [data, setData] = useState([]);
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
        setPhoto(photo);
  
        console.log(photo);
      };
  
      reader.readAsDataURL(image);
    } else {
      // No image selected, set photo to null or an empty object
      setPhoto(null); // or setPhoto({}) depending on your API requirements
    }
  }, [setPhoto, setSelectedImage]);
  
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
        setData(dataResponse.data.success);
        setFirstName(dataResponse.data.success.individual.first_name);
        setLastName(dataResponse.data.success.individual.last_name);
        setEmail(dataResponse.data.success.individual.email);
        setMobileNumber(dataResponse.data.success.individual.mobile_number);
        setBirthDate(dataResponse.data.success.individual.birth_date);
        setGender(dataResponse.data.success.individual.gender);
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
        username:email,
        individual: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          mobile_number: mobileNumber,
          birth_date: birthDate,
          gender: gender,
      }}

           // Add the 'photo' property to 'updateData' only if 'photo' state is truty
        if (photo) {
          updateData.individual.photo = photo;
        }
      
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
      ),2000)
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to update account. Please try again.");
      setSuccessMessage(""); // Reset success message if any
    }
  };

  const handleUpdatePhoto = async () => {
    try {
 
      const updateData = {
        individual: {
          photo: photo,
        },
      };
  
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
      setSuccessMessage("Account photo updated successfully");
  
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to update account photo. Please try again.");
      setSuccessMessage(""); // Reset success message if any
    }
  };
  

  


  setTimeout(() => {
    setErrorMessage("");
  }, 3000);


  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [formUpdate, setFormUpdate] = useState(false);

  const handleImageDialogOpen = () => {
    setOpenImageDialog(true);
  };

  const handleImageDialogClose = () => {
    setOpenImageDialog(false);
  };

  
  const handleFormUpdateOpen = () => {
    setFormUpdate(true);
  };

  const handleFormUpdateClose = () => {
    setFormUpdate(false);
  };



  return (
    <div className="flex items-start bg-[#EBF4FD] p-10 hg flex-col h-[100vh]  gap-3 font-manrope">
      <h2 className="font-bold text-[1.5rem] text-gray-700">Account</h2>
     <div className="flex items-center gap-3 bg-white p-5  rounded-[10px] shadow">
     <div className="shadow-md rounded-full p-1 bg-white" >
         <img className="w-[100px] h-[100px] rounded-full border-2 object-cover" src={`${baseUrl}${data.individual?.photo}`} alt="" />
       </div>
      <div className="flex flex-col">
      <p className="text-[2rem] font-bold text-gray-600">{firstName} {lastName}</p>
       <p className="text-sm font-medium text-gray-600">{email} </p>
       <div className="flex flex-col pt-5 gap-2">
       <span className="cursor-pointer text-xs text-blue-500 hover:font-bold duration-200" onClick={handleImageDialogOpen}>Change Profile Picture</span>
        <ChangePassword />
       <span className="cursor-pointer text-xs text-blue-500  hover:font-bold duration-200" onClick={handleFormUpdateOpen}>Edit Profile</span>
    
       </div>
      </div>
     </div>
        <Dialog open={formUpdate} onClose={handleFormUpdateClose}>
                <DialogContent>
                  <div className="flex flex-col gap-5 ">
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <div className="flex flex-col">
                      <span>First Name:</span>
                      <input type="text" className="p-3 bg-gray-200 rounded-lg w-[250px]" value={firstName || ""} onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div className="flex flex-col">
                      <span>Last Name:</span>
                      <input type="text" className="p-3 bg-gray-200 rounded-lg w-[250px]" value={lastName || ""} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                      <span>Email Address:</span>
                      <input type="text" className="p-3 bg-gray-200 rounded-lg w-[250px]" value={email || ""} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    

                    <div className="flex flex-col">
                      <span>Mobile Number:</span>
                      <input type="number" className="p-3 bg-gray-200 rounded-lg w-[250px]" value={mobileNumber || ""} onChange={(e) => setMobileNumber(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                      <span>Birth of Date:</span>
                      <input type="date" className="p-3 bg-gray-200 rounded-lg w-[250px]" value={birthDate || ""} onChange={(e) => setBirthDate(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                      <span>Gender:</span>
                      <select className="p-3 bg-gray-200 rounded-lg w-[250px]" value={gender || ""} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div >
                </div>
                  <Button variant="contained" onClick={handleUpdate}>
                    Update
                  </Button>
                </div>
                </DialogContent>
              </Dialog>


              <Dialog open={openImageDialog} onClose={handleImageDialogClose}>
                <DialogContent>
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                 <div className="flex flex-col gap-5">
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
                      <p className='text-xl text-gray-700 font-light'>Drop your Profile Image here...</p>
                    ) : (
                      <p className='text-xl text-gray-400 font-light'>Drag and drop your Profile Image here or</p>
                    )}
                    <div className="choose-image-button">
                      Choose Profile Image
                    </div>
                  </div>
                 <Button  variant="contained" onClick={handleUpdatePhoto}>Save</Button>
                 </div>
                </DialogContent>
              </Dialog>

       
    <div>
      
                 <div className="flex flex-col gap-2">
                      <span className="flex gap-3  p-3 rounded-[10px] bg-white text-gray-400">First name:
                       <p className="capitalize font-bold text-gray-600">{firstName}</p>
                       </span>

                       <span className="flex gap-3  p-3 rounded-[10px] bg-white text-gray-400">Last name:
                       <p className="capitalize font-bold text-gray-600">{lastName}</p>
                       </span>

                       <span className="flex gap-3  p-3 rounded-[10px] bg-white text-gray-400">Email Address:
                       <p className="font-bold text-gray-600">{email}</p>
                       </span>

                       <span className="flex gap-3  p-3 rounded-[10px] bg-white text-gray-400">Mobile Number:
                       <p className="font-bold text-gray-600">{mobileNumber}</p>
                       </span>

                       
                       <span className="flex gap-3  p-3 rounded-[10px] bg-white text-gray-400">Birth of Date:
                       <p className="font-bold text-gray-600">{birthDate}</p>
                       </span>

                       <span className="flex gap-3  p-3 rounded-[10px] bg-white text-gray-400">Gender:
                       <p className="font-bold text-gray-600">{gender}</p>
                       </span>
                    </div>

                
    </div>

    </div>
  );
}
