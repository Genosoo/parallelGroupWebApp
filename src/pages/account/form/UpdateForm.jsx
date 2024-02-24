/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { apiAccount, baseUrl } from "../../../api/api";
import { useCsrfToken} from '../../../context/csrftoken/CsrfTokenContext';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import { LuImagePlus } from "react-icons/lu";
import './UpdateFormStyle.css'

export default function UpdateForm({handleFormUpdateClose }) {
    const {csrfToken} = useCsrfToken();
    const [data, setData] = useState([]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [photo, setPhoto] = useState(data.individual?.photo);
    const [gender, setGender] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

  
     
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await axios.get(apiAccount);
        setData(dataResponse.data.success);
        setUsername(dataResponse.data.success.username);
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
        username:username,
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
        apiAccount,
        updateData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        } 
      );
      console.log("update response", updateResponse.data);
      setSuccessMessage("Account updated successfully");
      handleUpdatePhoto()
     
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
        apiAccount,
        updateData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
  
      console.log("update response", updateResponse.data);
    //   setSuccessMessage("Account photo updated successfully");
      
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to update account photo. Please try again.");
      setSuccessMessage(""); // Reset success message if any
    }
  };


  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        const filename = image.name;
  
        const newPhoto = {
          data: base64String,
          filename: filename,
        };
  
        setSelectedImage(URL.createObjectURL(image));
        setPhoto(newPhoto);
  
        console.log(newPhoto);
      };
  
      reader.readAsDataURL(image);
    } else {
      // No image selected, set selectedImage to the URL of the old photo, and leave photo unchanged
      setSelectedImage(`${baseUrl}${data.individual?.photo}`);
    }
  }, [data.individual?.photo, setSelectedImage, setPhoto]);
  
  const { getRootProps, getInputProps} = useDropzone({ onDrop });


  return (
    <div className="updateFormContainer">
    {successMessage && <p className="messageSuccess">{successMessage}</p>}
    {errorMessage && <p className="messageFailed">{errorMessage}</p>}


                {/* <StyledImageDialog open={openImageDialog} onClose={handleImageDialogClose} >    
                <DialogContent>
                 <div className="updateInputBox gap-5">
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
                    
                 </div>
                 <div className="imageBtn">
                        <button className="imageBtnSave" onClick={handleUpdatePhoto}>Save</button>
                        <button className="imageBtnCancel" onClick={handleImageDialogClose}>Cancel</button>
                    </div>
                </DialogContent>
              </StyledImageDialog> */}

              <div className="updateTitle">Edit Profile</div>

             <div className="updateImageBox">
             <div >
                    <input {...getInputProps()} id="file-input" />
                    {selectedImage ? (
                      <div>
                        <img src={selectedImage} alt="Selected" className="profileImage" />
                      </div>
                    ) : (
                      <div className="text-[30px] text-gray-500">
                        <img 
                        className="profileImage" 
                        src={`${baseUrl}${data.individual?.photo}`}
                        alt="profile image"
                        />
                      </div>
                    )}
                  </div>

                  <button  {...getRootProps()} className="updateImageBtn" >
                        <LuImagePlus/>
                    </button>
                 

                   
             </div>

    <div className="updateInputBox">
      <span>First Name:</span>
      <input type="text" className="updateInput" value={firstName || ""} onChange={(e) => setFirstName(e.target.value)} />
    </div>

    <div className="updateInputBox">
      <span>Last Name:</span>
      <input type="text" className="updateInput" value={lastName || ""} onChange={(e) => setLastName(e.target.value)} />
    </div>
    <div className="updateInputBox">
      <span>Username</span>
      <input type="text" className="updateInput" value={username || ""} onChange={(e) => setUsername(e.target.value)} />
    </div>
    <div className="updateInputBox">
      <span>Email Address:</span>
      <input type="text" className="updateInput" value={email || ""} onChange={(e) => setEmail(e.target.value)} />
    </div>
    

    <div className="updateInputBox">
      <span>Mobile Number:</span>
      <input type="number" className="updateInput" value={mobileNumber || ""} onChange={(e) => setMobileNumber(e.target.value)} />
    </div>
    <div className="updateInputBox">
      <span>Birth of Date:</span>
      <input type="date" className="updateInput" value={birthDate || ""} onChange={(e) => setBirthDate(e.target.value)} />
    </div>
    <div className="updateInputBox">
      <span>Gender:</span>
      <select className="updateInput" value={gender || ""} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div >
</div>
  
        <div className="updateBtn">
          <button className="updateBtnSave" onClick={handleUpdate}>Save</button>
          <button className="updateBtnCancel" onClick={handleFormUpdateClose}>Cancel</button>
                    </div>
</div>
  )
}
