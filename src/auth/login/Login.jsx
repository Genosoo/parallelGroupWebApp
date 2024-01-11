/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Carousel from './carousel/Carousel';
import Blogs from './blogs/Blogs';
import image1 from '../../assets/login/image4.png'
import image2 from '../../assets/login/image2.png'
import image3 from '../../assets/login/image3.png'
import image4 from '../../assets/login/image4.png'
import Navbar from './header/Nav';


export default function Login() {

  const images = [
    { src:image1, alt: 'Image 1' },
    { src:image2, alt: 'Image 2' },
    { src:image3, alt: 'Image 3' },
    { src:image4, alt: 'Image 4' },
  ];

  return (

<div className="login_container">
<Navbar />

    <Carousel  images={images}/>
    <Blogs />
  </div>

  );
}
