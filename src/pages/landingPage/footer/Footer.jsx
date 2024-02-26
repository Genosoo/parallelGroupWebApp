import Logo from '../../../assets/logo2.png'
import './FooterStyle.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="footerContainer">
        <img src={Logo} alt="logo" />
        <div className="linkWrapper">
           <ul className='linkBox'>
               <li><Link to='/home'>Home</Link></li>
               <li><Link to='/about'>About</Link></li>
               <li><Link to='/programs-and-projects'>Programs & Projects</Link></li>
               <li><Link to='/news-and-articles'>News & Articles</Link></li>
               <li><Link to='/contact-us'>Contact Us</Link></li>
               <li><Link to='/faq'>FAQs</Link></li>
           </ul>
        </div>
        <h2>Powered by Tambuli Labs</h2>
    </div>
  )
}
