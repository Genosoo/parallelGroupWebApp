import blog1 from '../../assets/login/blog1.jpg'
import blog2 from '../../assets/login/blog2.jpg'
import blog3 from '../../assets/login/blog3.jpg'
import blog4 from '../../assets/login/blog4.jpg'
import blog5 from '../../assets/login/blog5.jpg'
import blog6 from '../../assets/login/blog6.jpg'

export default function Blogs() {
  return (
    <div className="blog_container">
        <div className="blog_card_wrapper">
        <h1 className="title">News/Articles</h1>
           <div className="blog_card_box">
           <div className="blog_card">
              <img src={blog1} alt="" />
              <h3 className='blog_title'>Title Here</h3>
              <p className='blog_desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vestibulum magna enim, volutpat a pellentesque quis, molestie  
                ut dui. Nam accumsan lobortis augue.</p>
              <span className='blog_readmore'>Read More</span>
            </div>

            <div className="blog_card">
              <img src={blog2} alt="" />
              <h3 className='blog_title'>Title Here</h3>
              <p className='blog_desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vestibulum magna enim, volutpat a pellentesque quis, molestie  
                ut dui. Nam accumsan lobortis augue.</p>
              <span className='blog_readmore'>Read More</span>
            </div>

            <div className="blog_card">
              <img src={blog3} alt="" />
              <h3 className='blog_title'>Title Here</h3>
              <p className='blog_desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vestibulum magna enim, volutpat a pellentesque quis, molestie  
                ut dui. Nam accumsan lobortis augue.</p>
              <span className='blog_readmore'>Read More</span>
            </div>

            <div className="blog_card">
              <img src={blog4} alt="" />
              <h3 className='blog_title'>Title Here</h3>
              <p className='blog_desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vestibulum magna enim, volutpat a pellentesque quis, molestie  
                ut dui. Nam accumsan lobortis augue.</p>
              <span className='blog_readmore'>Read More</span>
            </div>

            <div className="blog_card">
              <img src={blog5} alt="" />
              <h3 className='blog_title'>Title Here</h3>
              <p className='blog_desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vestibulum magna enim, volutpat a pellentesque quis, molestie  
                ut dui. Nam accumsan lobortis augue.</p>
              <span className='blog_readmore'>Read More</span>
            </div>

            <div className="blog_card">
              <img src={blog6} alt="" />
              <h3 className='blog_title'>Title Here</h3>
              <p className='blog_desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vestibulum magna enim, volutpat a pellentesque quis, molestie  
                ut dui. Nam accumsan lobortis augue.</p>
              <span className='blog_readmore'>Read More</span>
            </div>

           </div>
        </div>
    </div>
  )
}
