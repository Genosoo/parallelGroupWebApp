/* eslint-disable react/prop-types */
import { Dialog } from '@mui/material';
import { useState, useCallback } from 'react';
import axios from 'axios';
import ImageDropzone from './ImageDropzone';
import { useCsrfToken } from '../../../../context/csrftoken/CsrfTokenContext';
import { apiBlog } from '../../../../api/api';

const AddNewsDialog = ({ open, onClose }) => {
    

  const { csrfToken } = useCsrfToken();
  const [formData, setFormData] = useState({
    title: '',
    author:'',
    content:'',
  
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  



  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set the form data directly without nesting for the 'title' field
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    
    try {
  
      setLoading(true);
      await axios.post(apiBlog, formData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      

      setTimeout(() => {
          setSuccessMessage('');
          setErrorMessage('');
      },3000)

       // Clear form data after successful creation
       setFormData({
        title: '',
        author: '',
        content: '',
        type:'',
      
      });

      setLoading(false);

      setSuccessMessage('News created successfully!');
      setErrorMessage('');
      setTimeout(() => {
       window.location.reload()
        
      }, 3000);
    } catch (error) {
      console.error('Add news error:', error);
      setErrorMessage('Failed to create news. Please try again.');
      setSuccessMessage('');
      setLoading(false);
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
  
      // Set the 'header_image' property in registerFormData
      setFormData((prevData) => ({
        ...prevData,
          header_image: header_image,
      }));
  
      // Now, you can do something with the 'header_image' object, like sending it to the server.
      console.log(header_image);
    };
  
    reader.readAsDataURL(image);
  }, [setFormData]);
  

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
         <div className='add_news_container'>
      <h2 className='add_news_title'>Create News and Articles</h2>
        <div className="add_news_notif">
            {successMessage && <p className='text-green-500'>{successMessage}</p>}
          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </div>
      <form action="" onSubmit={handleAdd} className='add_news_form'>
     
       <div className='add_news_input_box'>
        <span>Type:</span>
       <select 
          className='input'
          name="type"
          value={formData.type} 
          onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="home">Home</option>
            <option value="about">About</option>
            <option value="news">News & Articles</option>
          </select>
       </div>

      <div className="add_news_input_box">
        <span>Title:</span>
        <input 
          type="text" 
          className='input'
          placeholder='Enter News Title...'
          required name="title"
          value={formData.title} 
          onChange={handleChange}
        />
      </div>

      <div className="add_news_input_box">
        <span>Author:</span>
        <input 
          type="text"
          className='input'
          name="author"
          placeholder='Enter News Author...'
          value={formData.author}
          onChange={handleChange}
        />
        </div>
     
        <div className="add_news_input_box">
          <span>Description:</span>
          <textarea  
            placeholder='Enter News Description...'
            name="content"
            className='h-[200px] input'
            value={formData.content}
            onChange={handleChange} 
          />
        </div>
        
       <ImageDropzone onDropCallback={onDrop} selectedImage={selectedImage} />
             

        <button type="submit" className='btn_add_news'  >
         {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
    </Dialog>
  );
};

export default AddNewsDialog;
