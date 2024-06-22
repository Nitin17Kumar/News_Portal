import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Card.css'; // Import the CSS file

function Cards({ articles }) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6; // Number of articles per page
  const [currentArticles, setCurrentArticles] = useState([]);

  // Effect to update currentArticles when articles prop changes
  useEffect(() => {
    if (articles) {
      const indexOfLastArticle = currentPage * articlesPerPage;
      const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
      setCurrentArticles(articles.slice(indexOfFirstArticle, indexOfLastArticle));
    }
  }, [articles, currentPage]);

  // Calculate the total number of pages
  const totalPages = articles ? Math.ceil(articles.length / articlesPerPage) : 0;

  // Handler for changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!articles) {
    return <p>Loading...</p>;
  }


  return (
    <div className="cards-container">
      {currentArticles.map((article, index) => (
        <Card key={index} article={article} ></Card>
      ))}
      <div className="pagination">
        <button
          className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Cards;
