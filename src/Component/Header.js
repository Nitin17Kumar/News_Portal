
import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import './header.css';
import Cards from './Cards';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

      const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
      const url=` https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=popularity&apiKey=${REACT_APP_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles); // Update the state with the fetched articles
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <div className='header'>
        <div className='logo'>
          <h4>NEWS PORTAL</h4>
        </div>

        <div className='search_fill'>
          <form onSubmit={handleFormSubmit}>
            <input
              type='text'
              placeholder='SEARCH'
              className='search'
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button className='search_view' type='submit'>
              <IoSearchOutline />
            </button>
          </form>
        </div>

        <div>
          <button className='home_view'>Home</button>
        </div>

        <div>
          <button className='cat_view'>Category</button>
        </div>

        <div className='login_botton'>
          <button className='login'>
            <CiLogin /> Login
          </button>
        </div>
      </div>

      <div>
        {articles.length > 0 && <Cards articles={articles} />}
      </div>
    </div>
  );
}

export default Header;