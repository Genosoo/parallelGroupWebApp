
import { apiAds, baseUrl } from '../../../../api/api';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdsStyle.css'

export default function Ads() {
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


  const filteredAds = adsData.filter((item) => item.type === 'slider_ads')
  

  return (
    <div className="h-[30vh] bg-white overflow-hidden flex items-center justify-center gap-2 p-2">
        {/* {adsData.map((item,index) => (
          <a  className='h-full w-full border'  key={index} href={item.url}>
            <img className='h-full w-full' src={`${baseUrl}${item.image}`} alt="" />
          </a>
        ))} */}

<div className="ads">
       {filteredAds.map((item,index) => (
      <div key={index} className="ads-slide">
        
        <a  className='h-full w-full border' target='blank'   key={index} href={item.url}>
         <img className='h-[280px] w-[400px] p-1' src={`${baseUrl}${item.image}`} alt="" />
        </a>

      </div>
       ))} 
      {filteredAds.map((item,index) => (
      <div key={index} className="ads-slide">
        <a  className='h-full w-full border'  target='blank'  key={index} href={item.url}>
          <img className='h-[280px] w-[400px] p-1' src={`${baseUrl}${item.image}`} alt="" />
        </a>
      </div>
       ))} 

{filteredAds.map((item,index) => (
      <div key={index} className="ads-slide">
        <a  className='h-full w-full border'  target='blank'  key={index} href={item.url}>
          <img className='h-[280px] w-[400px] p-1' src={`${baseUrl}${item.image}`} alt="" />
        </a>
      </div>
       ))} 
    </div>
    </div>
  )
}
