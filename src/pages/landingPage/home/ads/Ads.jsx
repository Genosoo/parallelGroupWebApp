import image1  from '../../../../assets/ads/image1.jpg'
import image2  from '../../../../assets/ads/image2.jpg'
import image3  from '../../../../assets/ads/image3.jpg'
import image4  from '../../../../assets/ads/image4.jpg'
import image5  from '../../../../assets/ads/image5.jpg'

export default function Ads() {
  return (
    <div className="h-[30vh] bg-white flex items-center justify-center gap-2 p-2">
        <img className='h-full w-[50%]' src={image1} alt="" />
        <img className='h-full w-[50%]' src={image2} alt="" />
        <img className='h-full w-[50%]' src={image3} alt="" />
        <img className='h-full w-[50%]' src={image4} alt="" />
        <img className='h-full w-[50%]' src={image5} alt="" />
    </div>
  )
}
