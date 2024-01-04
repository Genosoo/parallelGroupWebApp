/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Carousel from './Carousel';
import Blogs from './Blogs';
import image1 from '../../assets/login/image1.png'
import image2 from '../../assets/login/image2.png'
import image3 from '../../assets/login/image3.png'


export default function Login() {

  const images = [
    { src:image1, alt: 'Image 1' },
    { src:image2, alt: 'Image 2' },
    { src:image3, alt: 'Image 3' },
  ];

  return (
    <div className="">
        <Carousel  images={images}/>
        <Blogs />
      </div>
  );
}
