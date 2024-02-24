/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { HiDotsVertical } from "react-icons/hi";
import noImage from '../../../assets/landing/no-image.png';
import { apiBlog, baseUrl, apiAccount, getCsrfTokenUrl } from "../../../api/api";
import DeleteDialog from "./dialogs/DeleteDialog";
import SelectedNewsDialog from "./dialogs/SelectedNewsDialog";
import UpdateNewsDialog from "./dialogs/UpdateNewsDialog";
import AddNewsDialog from "./dialogs/AddNewsDialog";
import { BiEdit } from "react-icons/bi";
import Loader from "../../../loader/Loader";
import "./NewStyle.css"

export default function About() {
  
  const [rolesData, setRolesData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updatedNews, setUpdatedNews] = useState({
    type:'',
    title: '',
    author:'',
    content: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const getTheCsrfToken = async () => {
      try {
        const response = await axios.get(getCsrfTokenUrl);
        setCsrfToken(response.data['csrf-token']);
      } catch (error) {
        console.log(error);
      }
    };

    getTheCsrfToken();
  }, [getCsrfTokenUrl]);


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

        const accountResponse = await axios.get(apiAccount);
        setRolesData(accountResponse.data.success.roles[0]);

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


const handleOpenDialogAdd = () => {
  setOpenDialogAdd(true);
}

const handleCloseDialogAdd = () => {
  setOpenDialogAdd(false);
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

const handleOpenUpdateDialog = (item) => {
  setSelectedNews(item);
  setUpdatedNews({
    type: item.type,
    title: item.title,
    author: item.author,
    content: item.content,
  });
  setOpenUpdateDialog(true);
};

const handleCloseUpdateDialog = () => {
  setOpenUpdateDialog(false);
};

const handleUpdateNews = async () => {
  try {
    // Make a PUT request to the API to update the news
    await axios.put(
      apiBlog,
      {
        id: selectedNews.id,
        type: updatedNews.type,
        author: updatedNews.author,
        title: updatedNews.title,
        content: updatedNews.content,
        header_image: updatedNews.header_image,
      },
      {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      }
    );

    // Update the state with the updated news
    setBlogData((prevData) =>
      prevData.map((news) =>
        news.id === selectedNews.id ? { ...news, ...updatedNews } : news
      )
    );

    setSuccessMessage('Update successfully!');
    setErrorMessage('');
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  } catch (error) {
    console.error('Error updating news:', error);
    setErrorMessage('Failed to update. Please try again.');
    setSuccessMessage('');
  }
};



const onDrop = useCallback((acceptedFiles) => {
  const image = acceptedFiles[0];
  const reader = new FileReader();

  reader.onload = () => {
    const base64String = reader.result.split(',')[1]; // Extracting the base64 string
    const filename = image.name;

    const header_image = {
      data: base64String,
      filename: filename,
    };

    setSelectedImage(URL.createObjectURL(image));

    // Set the 'header_image' property in updatedNews
    setUpdatedNews((prevData) => ({
      ...prevData,
      header_image: header_image,
    }));

    // Now, you can do something with the 'header_image' object, like sending it to the server.
    console.log(header_image);
  };

  reader.readAsDataURL(image);
}, [setUpdatedNews, setSelectedImage]);



  // Check if the user has the "Administrator" role
  const isAdmin = rolesData === "Administrator";


  return (
    <div className="news_container">
      <div className="news_wrapper">
        <h2 className="news_title">News & Articles</h2>
       {isAdmin && (
         <button className="news_create_btn_navigate" onClick={handleOpenDialogAdd}>
         <BiEdit /> 
       </button>
       )}

        {loading ? (
          <Loader />
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
                    
                    {isAdmin && (
                    <button className="news_card_btn_actionToggle" onClick={() => handleToggleActions(item)}>
                      <HiDotsVertical />
                    </button>
                  )}
                   
                   {showActions && selectedNews && selectedNews.id === item.id && (
                    <div className="news_card_action">
                      <button className="news_card_btn_delete" onClick={() => handleOpenDialogDelete(item)}>
                        Delete
                      </button>
                        <button className="news_card_btn_update" onClick={() => handleOpenUpdateDialog(item)}>
                          Update
                        </button>
                    </div>
                  )}
                    
                  </div>

                    <DeleteDialog 
                      open={openDialogDelete} 
                      onClose={handleCloseDialogDelete}
                      onConfirmDelete={() => handleDeleteNews(selectedNews.id)}
                    />
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

      <UpdateNewsDialog
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
        onDropCallback={onDrop}
        selectedImage={selectedImage}
        updatedNews={updatedNews}
        setUpdatedNews={setUpdatedNews}
        handleUpdateNews={handleUpdateNews}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <AddNewsDialog open={openDialogAdd} onClose={handleCloseDialogAdd}/>

    


    </div>
  );
}
