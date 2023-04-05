import React from 'react';
import './Pagination.css';

function Pagination({totalPosts, postsPerPage, setCurrentPage, currentPage}) {

    const pages = [];

    for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
      pages.push(i);
    }

  return (
    <>
      {
        pages.map((page, index) => {
            return (
                <button 
                    key={index} 
                    onClick={(e) => setCurrentPage(page)}
                    className={page === currentPage ? "active" : ""}>
                  {page}
                </button>
            )
        })
      }
    </>
  )
}

export default Pagination