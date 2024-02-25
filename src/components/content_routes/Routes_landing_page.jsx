import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, } from 'react';

import Home from '../../pages/landingPage/home/Home';
import About from '../../pages/landingPage/about/About';
import ProgProj from '../../pages/landingPage/prog_proj/ProgProj';
import NewsArticles from '../../pages/landingPage/news_articles/NewsArticles';
import Contact from '../../pages/landingPage/contact/Contact';
import Account from '../../pages/landingPage/navbar/account/Account';
import CommandCenter from '../../pages/landingPage/command_center/CommandCenter';
import NewReport from '../../pages/landingPage/report/NewReport';
import ReportTracker from '../../pages/landingPage/report/ReportTracker';
import ReportHistory from '../../pages/landingPage/report/ReportHistory';
import WatchNow from '../../pages/landingPage/watch/Watch';
import Manage from '../../pages/landingPage/manage/Manage';
import { apiAccount } from '../../api/api';
import axios from 'axios';

export default function Routes_landing_page() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(apiAccount);
        setUserData(userResponse.data.success.roles[0]);
        console.log( userResponse.data.success.roles[0])
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

// Conditionally include the "manage" route if the user is an Administrator
const isAdmin = userData === 'Administrator';

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="programs-and-projects" element={<ProgProj />} />
      <Route path="news-and-articles" element={<NewsArticles />} />
      <Route path="contact-us" element={<Contact />} />
   
      <Route path="account" element={<Account />} />
      <Route path="command-center" element={<CommandCenter />} />
      <Route path="new-report" element={<NewReport />} />
      <Route path="report-tracker" element={<ReportTracker />} />
      <Route path="report-history" element={<ReportHistory />} />
      <Route path="watch-now" element={<WatchNow />} />

      {isAdmin ? (
        <Route path="manage" element={<Manage />} />
      ) : (
        <Route
          path="manage"
          element={<Navigate to="/parallel-groups/no-permission" replace />}
        />
      )}

      <Route path="no-permission" element={<NoPermission />} />
    </Routes>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function NoPermission() {
  return <div className='py-20 flex flex-col items-center  font-manrope'>
     <h1 className='text-center font-bold text-[2rem] '>You do not have permission to access this page.</h1>
     <p className=' text-[1rem]'>Only Administrator</p>
  </div>;
}