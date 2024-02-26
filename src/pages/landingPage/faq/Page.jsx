import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataList } from './Data';
import {
     StyledAccordion,
     StyledAccordionSummary,
     StyledTypo,
     StyleCircleNumber,
     StyledAccordionDetails,
} from './Styled';

import './Styles.css';
import { CiSearch } from "react-icons/ci";
import { useLocation } from 'react-router-dom';



export default function AccordionExpandDefault() {
    const [showMore, setShowMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const filteredData = DataList.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='faqContainer'>
            <div className="faqWrapper">
                <h1 className="faqTitle">FAQs</h1>
                <h2>FREQUENTLY ASKED QUESTIONS about the BLESSED Movement</h2>
                <div className="faqContent">
                   <div className="faqSearch">
                   <input
                        type="text"
                        placeholder="How can we help you?"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowMore(false); // Hide 'Show More' when searching
                        }}
                    />
                    <div className="faqIcon">
                        <CiSearch />
                    </div>
                   </div>
                    {filteredData.length === 0 ? (
                        <p>No questions match your search.</p>
                    ) : (
                        filteredData.slice(0, showMore ? filteredData.length : 10).map((item, index) => (
                            <StyledAccordion key={index} elevation={0} disableGutters>
                                <StyledAccordionSummary
                                    expandIcon={<ExpandMoreIcon className='text-[#298BD9]' />}
                                    aria-controls={`panel${index + 1}-content`}
                                    id={`panel${index + 1}-header`}
                                >
                                    <StyledTypo> 
                                        <StyleCircleNumber>{item.number}</StyleCircleNumber>
                                        <h3 className='font-bold font-manrope'>{item.question}</h3>
                                    </StyledTypo>
                                </StyledAccordionSummary>
                                <StyledAccordionDetails>
                                    <p className='faqDesc'>
                                        {item.answer}
                                    </p>
                                </StyledAccordionDetails>
                            </StyledAccordion>
                        ))
                    )}
                    {!searchTerm && (
                        <button className='faqShowmore' onClick={toggleShowMore}>
                            {showMore ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
