import { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddAbout from '../addPages/Add_About';
import AddNewsAricles from '../addPages/Add_NewAndArticles';
import AddAdvertisement from '../addPages/Add_Advertisement'

const baseUrl = import.meta.env.VITE_URL;
const BlogApi = `${baseUrl}/api/blogs/`;
const AdsApi = `${baseUrl}/api/ads/`;


// const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;

export default function LabTabs() {
  const [tabValue, setTabValue] = useState('1');
  const [blogData, setBlogData] = useState([]);
  const [adsData, setAdsData] = useState([]);


  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
  };


  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
        try {
            const BlogReponse = await axios.get(BlogApi);
            setBlogData(BlogReponse.data.success);
            console.log('Blog Data List', BlogReponse.data.success);

            const AdsReponse = await axios.get(AdsApi);
            setAdsData(AdsReponse.data.success);
            console.log('Ads Data List', AdsReponse.data.success);

        } catch (error){
            console.error('Error fetching data:', error)
        }
    };

    fetchData();
  }, [])



  return (
    <Box sx={{ width: '100%'}}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
            <Tab label="Add About" value="1" />
            <Tab label="Add News & Articles" value="2" />
            <Tab label="Add Advertisement" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <AddAbout blogData={blogData}/>
        </TabPanel>
        <TabPanel value="2">
            <AddNewsAricles/>
        </TabPanel>
        <TabPanel value="3">
            <AddAdvertisement adsData={adsData}  />
        </TabPanel>
      </TabContext>
    </Box>
  );
}