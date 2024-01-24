/* eslint-disable react/prop-types */
import ImageDropzone from '../../manage/addPages/ImageDropzone';
import { Dialog } from '@mui/material';

const UpdateNewsDialog = ({
  open,
  onClose,
  onDropCallback,
  selectedImage,
  updatedNews,
  setUpdatedNews,
  handleUpdateNews,
  successMessage,
  errorMessage,
}) => {
  return (
    <Dialog maxWidth="lg" open={open} onClose={onClose}>
      <div className="update_news_form">
        <div className="update_notif">
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <h3>Update News</h3>
        <div className="update_input_wrapper">
            <span>Type:</span>
            <select 
                className='p-3 rounded-[10px]'
                name="type"
                value={updatedNews.type} 
                onChange={(e) => setUpdatedNews({ ...updatedNews, type: e.target.value })}
                
                >
            <option value="">Select Type</option>
            <option value="home">Home</option>
            <option value="about">About</option>
            <option value="news">News & Articles</option>
          </select>

          </div>
          <div className="update_input_wrapper">
            <span>Title:</span>
            <input
              type="text"
              value={updatedNews.title}
              onChange={(e) => setUpdatedNews({ ...updatedNews, title: e.target.value })}
            />
          </div>

          <div className="update_input_wrapper">
            <span>Author:</span>
            <input
              type="text"
              value={updatedNews.author}
              onChange={(e) => setUpdatedNews({ ...updatedNews, author: e.target.value })}
            />
          </div>
          <div  className="update_input_wrapper">
            <span>Content:</span>
            <textarea
              value={updatedNews.content}
              onChange={(e) => setUpdatedNews({ ...updatedNews, content: e.target.value })}
            />
          </div>
        <ImageDropzone onDropCallback={onDropCallback} selectedImage={selectedImage} />
        <div className="update_btn_wrapper">
          <button className="update" onClick={handleUpdateNews}>
            Update
          </button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateNewsDialog;
