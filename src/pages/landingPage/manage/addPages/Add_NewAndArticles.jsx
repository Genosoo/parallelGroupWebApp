import { useState, useCallback } from 'react';
import axios from 'axios';
import ImageDropzone from './ImageDropzone';
import { useCsrfToken } from '../../../../context/CsrfTokenContext';

export default function Add_NewAndArticles() {
  const baseUrl = import.meta.env.VITE_URL;
  const BlogApi = `${baseUrl}/api/blogs/`;

  const { csrfToken } = useCsrfToken();
  const [formData, setFormData] = useState({
    title: '',
    author:'',
    content:'',
    header_image:'',
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
      await axios.post(BlogApi, formData, {
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
        header_image: '',
      });

      setLoading(false);

      setSuccessMessage('News created successfully!');
      setErrorMessage('');

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
        <input 
          type="text" 
          className='p-3 rounded-[10px]'
          placeholder='Enter News Title...'
          required name="title"
          value={formData.title} 
          onChange={handleChange}
        />

        <input 
          type="text"
          className='p-3 rounded-[10px]'
          name="author"
          placeholder='Enter News Author...'
          value={formData.author}
          onChange={handleChange}
        />

        <textarea  
          placeholder='Enter News Description...'
          name="content"
          className='h-[200px] p-3 rounded-[10px]'
          value={formData.content}
          onChange={handleChange} 
        />
        
       <ImageDropzone onDropCallback={onDrop} selectedImage={selectedImage} />
             

        <button type="submit" className='btn_add_news'  >
         {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
}
