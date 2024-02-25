/* eslint-disable react/prop-types */
import { Dialog } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';
import noImage from '../../../../assets/landing/no-image.png';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
   .MuiDialog-paper {
    border-radius:30px;
  }
`

const SelectedNewsDialog = ({ open, onClose, selectedNews, baseUrl }) => {
  if (!selectedNews) {
    // If selectedNews is null or undefined, you can handle it here
    // For example, you can return null or display a message
    return null;
  }

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

  const { header_image, author, content } = selectedNews;

  return (
    <StyledDialog maxWidth="lg" open={open} onClose={onClose}>
        <AiFillCloseCircle className="selected_btn_close" onClick={onClose} />

      <div className="selected_news_container">
        <img
          className="selected_news_image"
          src={`${baseUrl}${header_image || noImage}`}
          alt=""
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImage;
          }}
        />
        <div className='selected_news_box'>
          <span>Author:{author}</span>
         <span className="">Date Created: {formatDate(selectedNews.created_at)} {formatTime(selectedNews.created_at)}</span>
          <div className="selected_news_desc">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </StyledDialog>
  );
};

export default SelectedNewsDialog;
