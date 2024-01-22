/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from 'axios';

import noImage from '../../../assets/landing/no-image.png';

export default function About() {
  const baseUrl = import.meta.env.VITE_URL;
  const BlogApi = `${baseUrl}/api/blogs`;

  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const BlogResponse = await axios.get(BlogApi);
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

  return (
    <div className="h-full flex flex-col items-center font-montserrat bg-[#EBF4FD] pt-10">
      <div className="w-full xl:w-[80%] px-5">
        <h2 className="text-[#298BD9] text-[2rem] font-extrabold">News & Articles</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 pt-10">
            {blogData.map((item, index) => (
              <div className="w-full lg:w-[48%] gap-5 shadow-lg font-montserrat bg-white p-5 rounded-[20px] " key={index}>
                <img
                  className="h-[300px] object-fill w-full rounded-[20px]"
                  src={item.header_image ? `${baseUrl}${item.header_image}` : noImage}
                  alt={item.title || 'No image available'}
                />
                <h3 className="text-[2rem] font-manrope font-bold">{item.title}</h3>
                <p className="text-justify font-manrope tex-sm font-semibold">{truncateContent(item.content, 200)}</p>
                 <p className="pt-8 font-semibold text-gray-800 text-xs">Author: {item.author}</p>
                 <p  className="font-semibold text-gray-800 text-xs">Date Created: {formatDate(item.created_at)} {formatTime(item.created_at)}</p>
                 <p>Read More</p>
              </div>
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
