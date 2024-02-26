/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect,} from "react";
import axios from 'axios';
import { apiBlog, baseUrl,  } from "../../../../api/api";
import SelectedNewsDialog from "./dialogs/SelectedNewsDialog";
import Loader from "../../../../loader/Loader";
import "./NewStyle.css"
import NoImage from '../../../../assets/landing/no-image.png'

export default function About() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);




  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const BlogResponse = await axios.get(apiBlog);
        setBlogData(BlogResponse.data.success);
        setLoading(false);
        console.log('Blog Data List', BlogResponse.data.success);
      } catch (error) {
        setLoading(false);
        setError('Error fetching data. Please try again later.');
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


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};

const formatTime = (dateString) => {
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedTime = new Date(dateString).toLocaleTimeString(undefined, options);
  return formattedTime;
};

const handleOpenDialog = (item) => {
  setSelectedNews(item);
  console.log('item', item)
  setOpenDialog(true);
}

const handleCloseDialog = () => {
  setOpenDialog(false);
};


const filteredBlogData = blogData.filter((item) => item.type === 'home');




  return (
    <div className="news_container">
      <div className="news_wrapper">
        <h2 className="news_title">News & Articles</h2>
      
        {loading ? (
          <Loader />
        ) : (
          <div className="news_card_container">
            {filteredBlogData.map((item, index) => (
              <div className="news_card" key={index}>
                <div>
                  <img
                    className="news_image"
                    src={item.header_image ? `${baseUrl}${item.header_image}` : NoImage}
                    alt={item.title || 'No image available'}
                  />
                    <div>
                    <p className="news_card_author">Author: {item.author}</p>
                    <p className="news_card_date_created">Date Created: {formatDate(item.created_at)} {formatTime(item.created_at)}</p>
                  </div>
                  {/* <h3 className="news_card_title">{item.title}</h3> */}
                  <p className="news_card_desc">{truncateContent(item.content, 50)}</p>
                </div>
               <div className="news_card_bottom">
                
                  <div className="flex items-center gap-2 relative">
                    <button className="news_card_btn_readmore" onClick={() => handleOpenDialog(item)}>Read More</button>
                  </div>
               </div>
              </div>
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
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
