/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import ImageDropzone from './ImageDropzone';
import { apiBlog, getCsrfTokenUrl } from '../../../../api/api';

export default function Add_NewAndArticles() {
  const [formData, setFormData] = useState({
    title: '',
    author:'',
    content:'',
    header_image: {
      data: '', // Base64 string will be stored here
      filename: '', // Filename will be stored here
    },
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  
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
        header_image: {
          data: '', // Base64 string will be stored here
          filename: '', // Filename will be stored here
        },
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
    <div className='flex items-center font-manrope flex-col justify-center'>
      <h2 className='text-[2rem] font-bold py-5 text-gray-800'>Create News and Articles</h2>
       {successMessage && <p className='text-green-500'>{successMessage}</p>}
       {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <form action="" onSubmit={handleAdd} className='flex flex-col w-[50%] gap-3'>
     
       <div className='flex flex-col'>
        <label>Type:</label>
       <select 
          className='p-3 rounded-[10px]'
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

      <div className="flex flex-col">
        <label>Title:</label>
        <input 
          type="text" 
          className='p-3 rounded-[10px]'
          placeholder='Enter News Title...'
          required name="title"
          value={formData.title} 
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label>Author:</label>
        <input 
          type="text"
          className='p-3 rounded-[10px]'
          name="author"
          placeholder='Enter News Author...'
          value={formData.author}
          onChange={handleChange}
        />
        </div>
     
        <div className="flex flex-col">
          <label>Description:</label>
          <textarea  
            placeholder='Enter News Description...'
            name="content"
            className='h-[200px] p-3 rounded-[10px]'
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
  );
}
