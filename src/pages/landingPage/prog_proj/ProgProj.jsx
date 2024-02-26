/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProStyle.css'
import backgroundShade from '../../../assets/landing/pro/background.png'
import image1 from '../../../assets/landing/pro/image1.png';
import image2 from '../../../assets/landing/pro/image2.png';
import image3 from '../../../assets/landing/pro/image3.png';
import image4 from '../../../assets/landing/pro/image4.png';
import image5 from '../../../assets/landing/pro/image5.png';
import image6 from '../../../assets/landing/pro/image6.png';
import image7 from '../../../assets/landing/pro/image7.png';
import image8 from '../../../assets/landing/pro/image8.png';

export default function Page() {
    // Extracts pathname property(key) from an object
 const { pathname } = useLocation();

 // Automatically scrolls to top whenever pathname changes
 useEffect(() => {
   window.scrollTo(0, 0);
 }, [pathname]);
 
  return (
    <div className="proContainer">
      <div className="proWrapper">
         <h2 className="title">Programs & Projects</h2>

         <div className="proImageWrapper">
             <div className="proImageBox">
                 <a href="#link1" className='proImageCard proImageCard1'>
                      <img src={backgroundShade} alt="" />
                      <h3>Training and Livelihood</h3>
                  </a>

                 <a href='#link2' className="proImageCard proImageCard2">
                 <img src={backgroundShade} alt="" />
                    <h3>Nation Building Workshops: 
                        Embracing the Vision 
                        of Bagong Pilipinas</h3>
                 </a>
                 <a href='#link3' className="proImageCard proImageCard3">
                 <img src={backgroundShade} alt="" />
                   <h3>Blessed Movement Kapihan 
                          Forum: Promoting Dialogue
                          on Current Issues</h3>
                 </a>
                 <a href='#link4' className="proImageCard proImageCard4">
                 <img src={backgroundShade} alt="" />
                  <h3>
                  Empowering Blessed
                  Movement Members as 
                  Community Patrollers
                  </h3>
                 </a>

                 <a href='#link5' className="proImageCard proImageCard5">
                 <img src={backgroundShade} alt="" />
                  <h3>Parallel Groups for
                    Community Development</h3>
                 </a>

                 <a href='#link6' className="proImageCard proImageCard6">
                 <img src={backgroundShade} alt="" />
                  <h3>
                    Community Outreach to
                      Indigenous Peoples and
                      Mission Areas
                  </h3>
                 </a>
                 <a href='#link7' className="proImageCard proImageCard7">
                 <img src={backgroundShade} alt="" />
                  <h3>Member Advocacy
                  Action Team</h3>
                 </a>
                 <a href='#link8' className="proImageCard proImageCard8">
                  <img src={backgroundShade} alt="" />
                  <h3>Train the Trainers Workshop: 
                      Enhancing Leadership Skills 
                      for Seminars and Recognition</h3>
                 </a>
             </div>
         </div>


        

      </div>

      <div className="proContent1" id='link1'>
             <div className="proContentWrapper1">
                <div className="proContentImage1">
                   <img src={image1} alt="image" className='image1 ' />
                  <div className="gradientShade1"></div>

               </div>

               <div className="proDetailBox1">
                    <h3>Training and Livelihood</h3>
                      <p>In collaboration with various government agencies, Blessed members haveaccess to a 
                        wide range of training, upskilling, retooling,
                        and livelihoodassistance programs to support their personal and professional growth.

                        <br />
                        <br />
                        By facilitating access to government training and livelihood assistanceprograms,
                          Blessed empowers members to pursue their personal and 
                        professionalaspirations, enhance their skills and knowledge, and improve theirsocio-economic well-being.
                       </p>
               </div>
             </div>
         </div>


         <div className="proContent2" id='link2'>
             <div className="proContentWrapper2">
               <div className="proDetailBox2">
                    <h3>Nation Building Workshops: <br />
                  Embracing theVision of Bagong Pilipinas</h3>
                      <p>As part of our commitment to fostering a sense of national identity and unity among our members, the Blessed Movement is 
                        proud to introduce nation-building workshops focused on promoting the core values and vision of
                          <b> President Ferdinand "Bongbong" R. Marcos Jr.</b> 's administration, particularly the vision of Bagong Pilipinas.
                        <br />
                        <br />
                        The nation-building workshops will be conducted regularly,
                         either virtually or through physical gatherings, to accommodate the diverse needs and preferences of our members.
                         <br />
                         <br />

                         Experienced facilitators and subject matter experts will lead the workshops, ensuring that 
                         sessions are informative, engaging, and impactful.
                         <br />
                         <br />
                         Feedback mechanisms will be in place to solicit input from participants and continuously
                          improve the content and delivery of the workshops.
                          <br />
                          <br />
                          Through these nation-building workshops, the Blessed Movement seeks to inspire and empower
                           its members to contribute meaningfully to
                           the realization of Bagong Pilipinas, a vision of progress, prosperity, and dignity for all Filipinos. 
                          Together, we can build a brighter future for our beloved nation.
                       </p>
               </div>

               <div className="proContentImage2">
                   <img src={image2} alt="image" className='image2 ' />
                  <div className="gradientShade2"></div>
               </div>
             </div>
         </div>


         <div className="proContent1" id='link3'>
             <div className="proContentWrapper1">
                <div className="proContentImage1">
                   <img src={image3} alt="image" className='image1 ' />
                  <div className="gradientShade1"></div>

               </div>

               <div className="proDetailBox1">
                    <h3>Blessed Movement Kapihan Forum:<br/>
                  Promoting Dialogue on Current Issues</h3>
                      <p>
                      In line with our commitment to fostering informed discussions and promoting civic engagement, 
                      the Blessed Movement is proud to organize a series of Kapihan forums dedicated to addressing 
                      current issues facing our nation. These forums serve as platforms for dialogue, collaboration, 
                      and learning, bringing together members, resource speakers from national and local agencies,
                       and experts to delve into pressing issues and explore potential solutions.
                        <br />
                        <br />
                        The Kapihan forums will be organized regularly, with topics and schedules announced
                         in advance to allow for maximum participation and engagement.
                         <br />
                         <br />
                         By organizing Kapihan forums, the Blessed Movement seeks to foster a culture of dialogue,
                          critical thinking, and civic participation, ultimately contributing to the collective 
                          effort to address current issues and build a better, more resilient society for all Filipinos.
                       </p>
               </div>
             </div>
         </div>

         <div className="proContent2" id='link4'>
             <div className="proContentWrapper2">
               <div className="proDetailBox2">
                    <h3>Empowering Blessed Movement <br/>
                        Members as Community Patrollers</h3>
                      <p>
                      In recognition of the crucial role that community members play in ensuring the safety and well-being of their neighborhoods,
                       the Blessed Movement is launching a community patrolling initiative to empower members to safeguard their communities from various threats, including syndicates,
                       illegal drugs, suspicious activities, and accidents.
                        <br />
                        <br />
                        Members will receive training on patrolling techniques, recognizing signs of criminal activity,
                         and reporting procedures. 
                        They will also be educated on their rights and responsibilities as community patrollers.
                         <br />
                         <br />

                         By empowering Blessed Movement members as community patrollers, we aim to create safer, more resilient communities w
                         here residents can thrive and live free from fear. Together
                         , we can make a meaningful difference in safeguarding our neighborhoods and promoting the well-being of all.
                       </p>
               </div>

               <div className="proContentImage2">
                   <img src={image4} alt="image" className='image2 ' />
                  <div className="gradientShade2"></div>
               </div>
             </div>
         </div>

         <div className="proContent1" id='link5'>
             <div className="proContentWrapper1">
                <div className="proContentImage1">
                   <img src={image5} alt="image" className='image1 ' />
                  <div className="gradientShade1"></div>

               </div>

               <div className="proDetailBox1">
                    <h3>Parallel Groups for Community <br />
                    Development</h3>
                      <p>
                      In addition to our community initiatives, the Blessed Movement is proud to facilitate parallel groups dedicated to various aspects
                       of community development, including medical missions, financial literacy workshops, and value formation seminars.
                        <br />
                        <br />
                        The Blessed Movement collaborates with healthcare professionals, financial experts, and community leaders to organize and facilitate
                         medical missions, financial literacy workshops, and value formation seminars.
                         <br />
                         <br />
                         Through the collective efforts of parallel groups dedicated to medical missions, financial literacy workshops, and value formation seminars, the Blessed Movement seeks to empower individuals, 
                         strengthen communities, and foster holistic development for the betterment of society as a whole.
                       </p>
               </div>
             </div>
         </div>

         <div className="proContent2" id='link6'>
             <div className="proContentWrapper2">
               <div className="proDetailBox2">
                    <h3>Community Outreach to <br />
                  Indigenous Peoples and Mission Areas</h3>
                      <p>
                      In line with our commitment to inclusivity and social responsibility, the Blessed Movement is 
                      dedicated to conducting community outreach programs targeted towards Indigenous Peoples (IPs) and mission areas, 
                      ensuring that no community is left behind in our pursuit of holistic development and empowerment.
                        <br />
                        <br />
                        We will actively engage with community members to solicit their input, participation,
                         and feedback throughout the planning and implementation process.
                         <br />
                         <br />

                         Through our community outreach programs, the Blessed Movement is committed to empowering Indigenous Peoples 
                         and communities in mission areas, promoting social inclusion, and fostering sustainable development for the
                          benefit of all.
                       </p>
               </div>

               <div className="proContentImage2">
                   <img src={image6} alt="image" className='image2 ' />
                  <div className="gradientShade2"></div>
               </div>
             </div>
         </div>

         <div className="proContent1" id='link7'>
             <div className="proContentWrapper1">
                <div className="proContentImage1">
                   <img src={image7} alt="image" className='image1 ' />
                  <div className="gradientShade1"></div>

               </div>

               <div className="proDetailBox1">
                    <h3>Member Advocacy Action Team</h3>
                      <p>
                      To ensure that the concerns and complaints of our members are effectively addressed and resolved, the Blessed 
                      Movement is establishing a Member Advocacy Action Team. This dedicated team will serve as advocates for members,
                       facilitating communication
                       and collaboration between individuals and national or local agencies to address issues promptly and efficiently.
                        <br />
                        <br />
                        The Blessed Movement will select and train a dedicated team of individuals with expertise in advocacy,
                         communication, and conflict resolution to serve on the Member Advocacy Action Team.
                         <br />
                         <br />
                         By establishing a Member Advocacy Action Team, the Blessed Movement aims to ensure that members have access to 
                         the support and assistance they need to address their concerns effectively and advocate for their rights.
                       </p>
               </div>
             </div>
         </div>

         <div className="proContent2" id='link8'>
             <div className="proContentWrapper2">
               <div className="proDetailBox2">
                    <h3>Train the Trainers Workshop:  <br />
                    Enhancing Leadership Skills for <br />
                    Seminars and Recognition</h3>
                      <p>
                      In recognition of the pivotal role that leaders play in guiding and empowering our community, 
                      the Blessed Movement is introducing a Train the Trainers workshop. This initiative aims to equip leaders with the necessary skills and knowledge to effectively conduct seminars, workshops, and training sessions, 
                      ultimately leading to enhanced recognition and rewards within the movement.
                        <br />
                        <br />
                        The Blessed Movement will develop a comprehensive curriculum for the Train the Trainers workshop, 
                        covering topics such as leadership development, seminar design, presentation skills, and feedback mechanisms.
                         <br />
                         <br />
                         Through the Train the Trainers workshop, the Blessed Movement aims to empower leaders with the skills and confidence they need to conduct impactful seminars,
                          inspire others, and drive positive change within the community.
                       </p>
               </div>

                <div className="proContentImage2">
                    <img src={image8} alt="image" className='image2 ' />
                    <div className="gradientShade2"></div>
                </div>
              </div>
         </div>
    </div>
  )
}
