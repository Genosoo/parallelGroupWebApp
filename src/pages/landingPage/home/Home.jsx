import Carousel from './carousel/Carousel';
import Ads from './ads/Ads';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import News from './news_articles/NewsArticles'

export default function Home() {
 // Extracts pathname property(key) from an object
 const { pathname } = useLocation();

 // Automatically scrolls to top whenever pathname changes
 useEffect(() => {
   window.scrollTo(0, 0);
 }, [pathname]);

  return (
    <div className='landingPage_container'>
      <Carousel/>
      <Ads />
      <News />
    </div>
  )
}
