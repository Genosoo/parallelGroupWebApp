/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Cookies from 'js-cookie'; // Import Cookies for handling cookies
import Carousel from './carousel/Carousel';
import Blogs from './blogs/Blogs';
import image1 from '../../assets/login/image4.png';
import image2 from '../../assets/login/image2.png';
import image3 from '../../assets/login/image3.png';
import image4 from '../../assets/login/image4.png';
import Navbar from './navbar/Navbar';

export default function Login() {
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    // Check if "user" exists in cookies
    const getSessionId = Cookies.get('sessionid');
    console.log("cookie", getSessionId )
    if (getSessionId) {
      // Redirect to dashboard if "user" exists
      navigate('/main/dashboard'); // Adjust the route according to your setup
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const images = [
    { src: image1, alt: 'Image 1' },
    { src: image2, alt: 'Image 2' },
    { src: image3, alt: 'Image 3' },
    { src: image4, alt: 'Image 4' },
  ];

  return (
    <div className="mainContainer">
      <Navbar />
      <Carousel images={images} />
      <Blogs />
    </div>
  );
}
