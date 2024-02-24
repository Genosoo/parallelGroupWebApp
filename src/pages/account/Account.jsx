import { useState, useEffect} from "react";
import axios from "axios";
import DialogContent from '@mui/material/DialogContent';
import ChangePassword from './ChangePassword'
import { apiAccount, baseUrl } from "../../api/api";
import './AccountStyle.css'
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import qrCode from '../../assets/qrcode.png'
import Activity from "./activity/Activity";
import UpdateForm from "./form/UpdateForm";
import { StyledUpdateDialog } from "./StyledComponent";

export default function Account() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    // Calculate birthDate and age
    const today = new Date();
    const birthYear = today.getFullYear() - age;
    const birthMonth = today.getMonth() + 1; // Months are 0-indexed
    const birthDay = today.getDate();
    const formattedBirthDate = `${birthYear}-${birthMonth < 10 ? '0' + birthMonth : birthMonth}-${birthDay < 10 ? '0' + birthDay : birthDay}`;
    setBirthDate(formattedBirthDate);
  }, [age]);

  useEffect(() => {
    // Calculate age from birthDate
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let ageDiff = today.getFullYear() - birth.getFullYear();
      if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        ageDiff--;
      }
      setAge(ageDiff);
    }
  }, [birthDate]);



  
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




  


  const [formUpdate, setFormUpdate] = useState(false);

  
  const handleFormUpdateOpen = () => {
    setFormUpdate(true);
  };

  const handleFormUpdateClose = () => {
    setFormUpdate(false);
  };



  return (
    <div className="accountContainer">
      <div className="headerBox">
          <h2 className="accountTitle">User Profile</h2>
          <div className="headerBtn">
              <button className="" onClick={handleFormUpdateOpen}>
                Edit Profile
              </button>
                <ChangePassword />
          </div>
      </div>

      <div className="profileWrapper">
         <div className="profileContent1">

             <div className="profileBox1 profileBox">
              <span className="profileTitle">Profile</span>
               <div className="profileBox">
                   <div className="flexBox">
                      <img className="profileImage" src={`${baseUrl}${data.individual?.photo}`} alt="profile image" />
                      <span className="profileDetail">
                        <h3 className="name">{firstName} {lastName}</h3>
                        <p className="username">{username} </p>
                        <span className="socMedBox">
                            <p className="socMedTitle">Socials:</p>
                            <div className="icon">
                              <FaFacebookF/>
                            </div>
                            <div className="icon">
                              <FaYoutube/>
                            </div>
                        </span>
                        <div className="pointBox">
                           <span>points:</span>
                           <p>314</p>
                        </div>
                      </span>
                   </div>
                 <div className="parallelGroupBox">
                     <img  src={`${baseUrl}${data.individual?.photo}`} alt="parallel group image" />
                     <span>BBM Youth</span>
                 </div>
               </div>
             </div>

             <div className="profileBox2 profileBox">
               <span className="profileTitle">
                   QR Code
               </span>
               <img src={qrCode} alt="qr code" className="qrcodeImage" />
             </div>

         </div>

         <div className="profileContent2">
             <div className="profileBox3 profileBox">
                <span className="profileTitle">User Information</span>
                  <div className="userInfoBox">
                    <p className="userInfoTitle">Email Address</p>
                    <span>{email}</span>
                  </div>
                  <div className="userInfoBox">
                    <p className="userInfoTitle">Mobile Number</p>
                    <span>{mobileNumber}</span>
                  </div>

                  <div className="userInfoFlex">
                    <div className="userInfoBox1">
                      <p className="userInfoTitle1">Date Of Birth</p>
                      <span>{birthDate}</span>
                    </div>
                    <div className="userInfoBox2">
                      <p className="userInfoTitle2">Age</p>
                      <span>{age } year old</span>
                    </div>
                  </div>

                  <div className="userInfoBox">
                    <p className="userInfoTitle">Gender</p>
                    <span>{gender}</span>
                  </div>

             </div>
         </div>

      </div>


        <StyledUpdateDialog
           open={formUpdate} >
                <DialogContent>
                   <UpdateForm handleFormUpdateClose={handleFormUpdateClose} />
                </DialogContent>
              </StyledUpdateDialog>

       <Activity />
    

    </div>
  );
}
