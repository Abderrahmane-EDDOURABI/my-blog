import React from 'react';
import { useState } from 'react';
import './ReadMore.css';

function ReadMore({children, limit}) {

  const text = children;

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p>
      {isReadMore ? text.slice(0, limit) : text} 
      <span 
        onClick={toggleReadMore} 
        className="read__hide">
        {
          isReadMore 
          ?
          "...read more" 
          : 
          "...show less"
        } 
      </span>
    </p>
  )
  
}

export default ReadMore