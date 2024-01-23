/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from 'axios';
import {Dialog} from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import noImage from '../../../assets/landing/no-image.png';
import { AiFillCloseCircle } from "react-icons/ai";
import { useCsrfToken } from '../../../context/CsrfTokenContext';
import { apiBlog, baseUrl } from "../../../api/api";

export default function About() {
  const { csrfToken } = useCsrfToken();


  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [showActions, setShowActions] = useState(null);

  const handleToggleActions = (item) => {
    setSelectedNews(item);
    setShowActions((prevShowActions) => !prevShowActions);

  };
 

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

const handleOpenDialogDelete = (item) => {
  setSelectedNews(item);
  console.log('item', item)
  setOpenDialogDelete(true);
}

const handleCloseDialogDelete = () => {
  setOpenDialogDelete(false);
  setShowActions(false);
};


const handleDeleteNews = async (newsId) => {
  try {
    // Make a DELETE request to the API to delete the news
    await axios.delete(apiBlog, {
      data: { id: newsId },
      headers: {
        'X-CSRFToken': csrfToken, // Add CSRF token to the headers
      },
    });

    // Update the state to remove the deleted news
     setBlogData((prevData) => prevData.filter((news) => news.id !== newsId));
     setOpenDialogDelete(false)
     setShowActions(false)
    // Close the dialog if the deleted news is currently open
    if (selectedNews && selectedNews.id === newsId) {
      handleCloseDialogDelete();
    }
  } catch (error) {
    console.error('Error deleting news:', error);
  }
};



  return (
    <div className="news_container">
      <div className="news_wrapper">
        <h2 className="news_title">News & Articles</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="news_card_container">
            {blogData.map((item, index) => (
              <div className="news_card" key={index}>
                <div>
                  <img
                    className="news_image"
                    src={item.header_image ? `${baseUrl}${item.header_image}` : noImage}
                    alt={item.title || 'No image available'}
                  />
                  <h3 className="news_card_title">{item.title}</h3>
                  <p className="news_card_desc">{truncateContent(item.content, 50)}</p>
                </div>
               <div className="news_card_bottom">
                  <div>
                    <p className="news_card_author">Author: {item.author}</p>
                    <p className="news_card_date_created">Date Created: {formatDate(item.created_at)} {formatTime(item.created_at)}</p>
                  </div>

                  <div className="flex items-center gap-2 relative">
                    <button className="news_card_btn_readmore" onClick={() => handleOpenDialog(item)}>Read More</button>
                    <button className="news_card_btn_actionToggle" onClick={() => handleToggleActions(item)}>
                      <HiDotsVertical/>
                    </button>
                   
                    {showActions && selectedNews && selectedNews.id === item.id && (
                      <div className="news_card_action">
                        <button className="news_card_btn_delete" onClick={() => handleOpenDialogDelete(item)}>
                          Delete
                        </button>
                        <button className="news_card_btn_readmore" onClick={() => handleOpenDialog(item)}>
                          Update
                        </button>
                      </div>
                    )}
                    
                  </div>

                  <Dialog  
                      maxWidth="sm"
                      open={openDialogDelete} 
                      onClose={handleCloseDialogDelete}
                    >
                      <div className="selected_news_delete">
                        <p>Are you sure you want to delete?</p>
                        <button className="yes"  onClick={() => handleDeleteNews(item.id)}>Yes</button>
                        <button className="cancel" onClick={handleCloseDialogDelete}>Cancel</button>
                      </div>
                    </Dialog>
               </div>
              </div>
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
      </div>



      {selectedNews && (
      <Dialog  
        maxWidth="lg"
        // fullScreen
        open={openDialog} 
        onClose={handleCloseDialog}
      >
          <div className="selected_news_container">
            <AiFillCloseCircle className="selected_btn_close" onClick={handleCloseDialog}/>
              <img 
                className="selected_news_image"
                src={`${baseUrl}${selectedNews.header_image}`} 
                alt=""
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = noImage;
                }} 
              />
             <div>
             <h3 className="selected_news_title">{selectedNews.title}</h3>
               <div className="selected_news_desc">
               <p>{selectedNews.content}</p>
               </div>
             </div>
          </div>
      </Dialog>
    )}

    


    </div>
  );
}
