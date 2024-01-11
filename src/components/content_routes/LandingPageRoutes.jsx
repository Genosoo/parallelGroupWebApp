import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/landingPage/home/Home'
import About from '../../pages/landingPage/about/About'
import ProgProj from '../../pages/landingPage/prog_proj/ProgProj'
import NewsArticles from '../../pages/landingPage/news_articles/NewsArticles'
import Contact from '../../pages/landingPage/contact/Contact'
import Account from '../../pages/landingPage/navbar/Account'

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

    </Routes>
  )
}
