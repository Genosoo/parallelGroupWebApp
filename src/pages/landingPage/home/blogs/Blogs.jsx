import { useEffect, useState } from 'react'

import { apiBlog, baseUrl } from '../../../../api/api'
import axios from 'axios';
import SelectedNewsDialog from './SelectedNewsDialog';
import noImage from '../../../../assets/landing/no-image.png';

export default function Blogs() {

  const [blogData, setBlogData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (item) => {
    setSelectedNews(item);
    console.log('item', item)
    setOpenDialog(true);
  }
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const BlogResponse = await axios.get(apiBlog);
        setBlogData(BlogResponse.data.success);
        console.log('Blog Data List', BlogResponse.data.success);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])


  // Helper function to truncate content to a specified word limit
const truncateContent = (content, limit) => {
  const words = content.split(' ');
  const truncatedWords = words.slice(0, limit);
  return truncatedWords.join(' ');
};


// const formatDate = (dateString) => {
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
//   return formattedDate;
// };

// const formatTime = (dateString) => {
//   const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
//   const formattedTime = new Date(dateString).toLocaleTimeString(undefined, options);
//   return formattedTime;
// };
const filteredBlogData = blogData.filter(item => item.type === "home");
  return (
    <div className="blog_container">
        <div className="blog_card_wrapper">
        <h1 className="title">News/Articles</h1>
        <div  className="blog_card_box">

           {filteredBlogData.map((item,index) => (
             <div key={index} className="blog_card">
               <img
          className="selected_news_image"
          src={`${baseUrl}${item.header_image || noImage}`}
          alt=""
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImage;
          }}
        />
                 <h3 className='blog_title'>{item.title}</h3>
                 <p className='blog_desc'>{truncateContent(item.content, 50)}</p>
                 <span className='blog_readmore' onClick={() => handleOpenDialog(item)}>Read More</span>
               </div>
            ))}
            </div>
        </div>

        <SelectedNewsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        selectedNews={selectedNews}
        baseUrl={baseUrl}
      />
    </div>
  )
}
