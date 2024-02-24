/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import { baseUrl, apiAds } from '../../../../api/api';
import axios from 'axios';
import './CarouselStyle.css'

const Carousel = () => {
  const [adsData, setAdsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       const adsResponse = await axios.get(apiAds);
       setAdsData(adsResponse.data.success);
       console.log(adsResponse.data.success);
      } catch (error) {
        console.error('Failed to fetch data', error)
      }
    }

    fetchData();
  },[])


  const filteredCarouselAds = adsData.filter((item) => item.type === "carousel_ads")

  const images = filteredCarouselAds


  const [activeIndex, setActiveIndex] = useState(0);

  const goToPreviousSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000); // Change the interval duration (in milliseconds) as needed

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);




  return (
    <div className="carouselContainer">
      <div className="carouselSlides">
        {images.map((item, index) => (
         <a
         key={index}
         href={item.url}  // Replace with the desired link
         target="_blank"  // Open the link in a new tab/window
         rel="noopener noreferrer"
         className={`slide${index === activeIndex ? ' active' : ''}`}
         style={{ backgroundImage: `url(${baseUrl}${item.image})` }}
       ></a>
        ))}
      </div>
      <div className="carouselIndicatorBox">
        {images.map((_, index) => (
          <div
            key={index}
            className={`carouselIndicator${index === activeIndex ? ' active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>

      <div className="carouselButton">
        <button className="prev-button " onClick={goToPreviousSlide}>
          <SlArrowLeft />
        </button>
        <button className="next-button" onClick={goToNextSlide}>
          <SlArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
