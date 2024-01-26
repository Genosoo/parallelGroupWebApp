import { useState, useCallback } from 'react';
import axios from 'axios';
import ImageDropzone from './ImageDropzone';
import { useCsrfToken } from '../../../../context/CsrfTokenContext';
import { apiAds } from '../../../../api/api';
import AdsList from '../ads/AdsList';

export default function Add_NewAndArticles() {


  const { csrfToken } = useCsrfToken();
  const [formData, setFormData] = useState({
    type:'',
    name: '',
    url:'',
    image: {
      data: '', // Base64 string will be stored here
    },
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
      await axios.post(apiAds, formData, {
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
        type:'',
        name: '',
        url: '',
        image: {
          data: '', // Base64 string will be stored here
        },
      });

      setLoading(false);

      setSuccessMessage('News created successfully!');
      setErrorMessage('');
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
  
      const header_image = {
        data: base64String,
      };
  
      setSelectedImage(URL.createObjectURL(image));
  
      // Set the 'header_image' property in registerFormData
      setFormData((prevData) => ({
        ...prevData,
          image: header_image,
      }));
  
      // Now, you can do something with the 'header_image' object, like sending it to the server.
      console.log(header_image);
    };
  
    reader.readAsDataURL(image);
  }, [setFormData]);
  


  return (
    <div className='flex gap-10 justify-center'>
      <AdsList />
      <div className='flex font-manropep-10 w-[500px]   rounded-[10px] p-10 flex-col'>
      <h2 className='text-[2rem] font-bold text-gray-800'>Create News and Articles</h2>
       {successMessage && <p className='text-green-500'>{successMessage}</p>}
       {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <form action="" onSubmit={handleAdd} className='flex flex-col  gap-3'>
   
      <div className='flex flex-col'>
        <label>Type:</label>
       <select 
          required
          className='p-3 rounded-[10px]'
          name="type"
          value={formData.type} 
          onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="carousel_ads">Carousel Ads</option>
            <option value="slider_ads">Slider Ads</option>
          </select>
       </div>


      <div className="flex flex-col">
        <label>Name:</label>
        <input 
          type="text" 
          className='p-3 rounded-[10px]'
          placeholder='Enter News name...'
          required name="name"
          value={formData.name} 
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label>Url:</label>
        <input 
          type="text"
          className='p-3 rounded-[10px]'
          name="url"
          placeholder='Enter News url...'
          value={formData.url}
          onChange={handleChange}
        />
        </div>
     
    
        
       <ImageDropzone onDropCallback={onDrop} selectedImage={selectedImage} />
             

        <button type="submit" className='btn_add_news'  >
         {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
    </div>
  );
}
