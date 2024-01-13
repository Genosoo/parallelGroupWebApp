/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

const Carousel = ({ images }) => {
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
    <div className="h-[60vh]">
      <div className="carousel-slides">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide${index === activeIndex ? ' active' : ''}`}
            style={{ backgroundImage: `url(${image.src})` }}
          ></div>
        ))}
      </div>
      <div className="carousel-indicators-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator${index === activeIndex ? ' active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>

      <div className="carousel_button">
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
