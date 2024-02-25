import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AboutStyle.css'
import Logo from '../../../assets/landing/about/logo.png'
import HerbertImage from '../../../assets/landing/about/herbert.png'
import icon1 from '../../../assets/landing/about/icons/icon1.png';
import icon2 from '../../../assets/landing/about/icons/icon2.png';

export default function About() {
  // Extracts pathname property(key) from an object
 const { pathname } = useLocation();

 // Automatically scrolls to top whenever pathname changes
 useEffect(() => {
   window.scrollTo(0, 0);
 }, [pathname]);
 
  return (
    <div className="aboutContainer">
      <div className="aboutWrapper">
      <h2 className="title">About</h2>

      <div className="aboutContent1">
        <div className='aboutLogoBox'>
            <img src={Logo} alt="logo" />
        </div>
           <p>
           The <b>BLESSED Movement</b>, formerly known as the <b>Team BBM 2022 Coalition</b>, isa socio-economic-cultural movement 
           that originated from various BBM (Bongbong Marcos) groups and supporters. It represents a collective effort
            aimed at fostering unity and
            positive change in the Philippines by promoting patriotism, nationalism, and spirituality among Filipinos.
           </p>
      </div>

      <div className="aboutContent2">
         <div className="aboutProfileImage">
           <img src={HerbertImage} alt="Chairman Herbert Antonio Martinez" />
         </div>
         <p>
         The <b>BLESSED Movement</b> is led by <b>Chairman Herbert Antonio S. Martinez</b>,
          who serves as the Lead Convenor. Chairman Herbet Martinez played a pivotal
          role in bringing together diverse alliances nationwide, boasting an impressive 
          membership exceeding 2 million individuals.
         </p>
      </div>

      <div className="aboutContent3">
         <p>
         The over-arching goal of the <b>BLESSED Movement</b> is to become a civil society organization dedicated to advocating good governance, ethical leadership, and social transformation in the Philippines. 
         It seeks to foster unity, eliminate corruption, and achieve national development through integrity and collective action.
         </p>

         <div className="aboutBoxWrapper">
            <h3 className="aboutBoxTitle">Mission and Vision</h3>
            <div className="aboutBox">
                <div className="aboutCard">
                  <img src={icon1} alt="" />
                  <span>
                     <h3>Mission</h3>
                     <p>
                     The mission of the <b>BLESSED Movement</b> is to promote patriotism, nationalism, and spirituality among Filipinos.
                      It strives to foster a society that upholds ethical values, good governance, and social transformation. Through advocacy,
                       community engagement, and strategic partnerships,
                      the movement aims to empower individuals and communities to actively participate in nation-building and combat graft and corruption.
                     </p>
                  </span>
                </div>
                <div className="aboutCard">
                  <img src={icon2} alt="" />
                  <span>
                      <h3>Vision</h3>
                      <p>
                      The vision of the <b>BLESSED Movement</b> is to build a just, prosperous, andmorally upright Philippines where citizens are empowered,
                       corruption iseliminated, and national development is achieved through unity and integrity.
                      </p>
                  </span>
                </div>
            </div>
         </div>
      </div>
      
  </div>
    </div>
  )
}
