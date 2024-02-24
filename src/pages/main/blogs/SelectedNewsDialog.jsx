/* eslint-disable react/prop-types */
import { Dialog } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';
import noImage from '../../../assets/landing/no-image.png';
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

  const { header_image, title, content } = selectedNews;

  return (
    <StyledDialog maxWidth="md" open={open} onClose={onClose}>
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
        <div>
          <h3 className="selected_news_title">{title}</h3>
          <div className="selected_news_desc">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </StyledDialog>
  );
};

export default SelectedNewsDialog;
