import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/landingPage/home/Home';
import About from '../../pages/landingPage/about/About';
import ProgProj from '../../pages/landingPage/prog_proj/ProgProj';
import NewsArticles from '../../pages/landingPage/news_articles/NewsArticles';
import Contact from '../../pages/landingPage/contact/Contact';
import Account from '../../pages/landingPage/navbar/Account';
import CommandCenter from '../../pages/landingPage/command_center/CommandCenter';
import NewReport from '../../pages/landingPage/report/NewReport';
import ReportTracker from '../../pages/landingPage/report/ReportTracker';
import ReportHistory from '../../pages/landingPage/report/ReportHistory';
import WatchNow from '../../pages/landingPage/watch/Watch';
import Manage from '../../pages/landingPage/manage/Manage';

export default function LandingPageRoutes() {
  return (
    <Routes>
        <Route index element={<Home/>} />
        <Route path='home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='programs-and-projects' element={<ProgProj />} />
        <Route path='news-and-articles' element={<NewsArticles />} />
        <Route path='contact-us' element={<Contact />} />
        <Route path='account' element={<Account/>} />
        <Route path='command-center' element={<CommandCenter/>} />
        <Route path='new-report' element={<NewReport/>} />
        <Route path='report-tracker' element={<ReportTracker/>} />
        <Route path='report-history' element={<ReportHistory/>} />
        <Route path='watch-now' element={<WatchNow/>} />
        <Route path='manage' element={<Manage/>} />

    </Routes>
  )
}
