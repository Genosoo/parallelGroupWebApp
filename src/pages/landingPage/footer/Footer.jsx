import Logo from '../../../assets/logo2.png'
import './FooterStyle.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="footerContainer">
        <img src={Logo} alt="logo" />
        <div className="linkWrapper">
           <ul className='linkBox'>
               <li><Link to='/parallel-groups'>Home</Link></li>
               <li><Link to='/parallel-groups/about'>About</Link></li>
               <li><Link to='/parallel-groups/programs-and-projects'>Programs & Projects</Link></li>
               <li><Link to='/parallel-groups/news-and-articles'>News & Articles</Link></li>
               <li><Link to='/parallel-groups/contact-us'>Contact Us</Link></li>
           </ul>
        </div>
        <h2>Powered by Tambuli Labs</h2>
    </div>
  )
}
