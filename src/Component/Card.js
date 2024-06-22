import React from 'react';
import './Card.css';

function Card({ article }) {
  const{url,urlToImage,title,author,description,content}=article;
  
    return (
    <div className="card">
      {urlToImage && <img src={urlToImage} alt={title} className='Image_art'/>}
      <div className="card-content">
        <h2 className='title'>{title}a</h2>
        <p className='desc'>{description}</p>
        <p className='author'><small>By {author}</small></p>
        <a href={url} className="readmore">Read More</a>
      </div>
    </div>
  );
}

export default Card;
