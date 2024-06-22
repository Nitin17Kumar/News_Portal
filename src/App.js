import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cards from './Component/Cards';
import Header from './Component/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [news, setNews] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const api = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    console.log('API URL:', api); // Log the URL to check if the API key is appended correctly

    async function fetchData() {
      try {
        let response = await fetch(api);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        let data = await response.json();
        setNews(data.articles);
        console.log('Fetched data:', data); // Log fetched data for debugging
      } catch (error) {
        toast.error('Failed to fetch data');
        console.error('Error fetching data:', error); // Log the error
      }
    }

    fetchData();
  }, [API_KEY]); // Only run if API_KEY changes

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Cards articles={news} />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
