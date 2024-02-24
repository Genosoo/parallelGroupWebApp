import { useEffect, useState } from 'react';
import axios from 'axios';
import SelectedNewsDialog from './SelectedNewsDialog';
import { apiBlog, baseUrl } from '../../../../api/api';
import noImage from '../../../../assets/landing/no-image.png';

export default function Blogs() {
  const [blogData, setBlogData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (item) => {
    setSelectedNews(item);
    setOpenDialog(true);
  };

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
  }, []);

  // Helper function to truncate content to a specified word limit
  const truncateContent = (content, limit) => {
    const words = content.split(' ');
    const truncatedWords = words.slice(0, limit);
    return truncatedWords.join(' ');
  };

  const filteredBlogData = blogData.filter((item) => item.type === 'home');

  return (
    <div className="blogContainer">
      <div className="blogCardWrapper">
        <h1 className="title">News/Articles</h1>
        <div className="blogCardBox">
          {filteredBlogData.length > 0 ? (
            filteredBlogData.map((item, index) => (
              <div key={index} className="blogCard">
                <img
                  className="selected_news_image"
                  src={`${baseUrl}${item.header_image || noImage}`}
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noImage;
                  }}
                />
                <h3 className="blogTitle">{item.title}</h3>
                <p className="blogDesc">{truncateContent(item.content, 50)}</p>
                <span className="blogReadmore" onClick={() => handleOpenDialog(item)}>
                  Read More
                </span>
              </div>
            ))
          ) : (
            <p className='text-[1.5rem] pl-32 text-gray-500'>No available news or articles.</p>
          )}
        </div>
      </div>

      <SelectedNewsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        selectedNews={selectedNews}
        baseUrl={baseUrl}
      />
    </div>
  );
}
