import Carousel from './carousel/Carousel';
import Blogs from './blogs/Blogs';
import Ads from './ads/Ads';

export default function Home() {


  return (
    <div className='landingPage_container'>
      <Carousel/>
      <Ads />
      <Blogs />
    </div>
  )
}
