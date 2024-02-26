import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./ContactStyle.css"
import image from '../../../assets/landing/contact/image.svg'
import icon1 from '../../../assets/landing/contact/icon1.svg'
import icon2 from '../../../assets/landing/contact/icon2.svg'


export default function About() {
// Extracts pathname property(key) from an object
const { pathname } = useLocation();

// Automatically scrolls to top whenever pathname changes
useEffect(() => {
  window.scrollTo(0, 0);
}, [pathname]);

  return (
    <div className="contactContainer">
      <div className="contactWrapper">
      <h2 className="title">Contact Us</h2>
        <div className="contactImageBox">
           <img src={image} alt="" />
        </div>
        <div className='contactDetail'>
             <div className="contactCard">
                 <img src={icon1} alt="icon" />
                 <p>Bagong PilipinasHeadquarters, Mandaluyong City  <br />
                (Formerly BBM Campaign HQ)</p>
             </div>
             <div className="contactCard">
                 <img src={icon2} alt="icon" />
                 <p>blessedmovement777@yahoo.com</p>
             </div>
        </div>
      </div>
    </div>
  )
}
