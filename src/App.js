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
    async function fetchData() {
      try {
        const api = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`; 
        let response = await fetch(api);
        let data = await response.json();
        setNews(data.articles);
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    }
    fetchData();
  }, [API_KEY]); 
  return (
    <div>
      <Header />
      <Cards articles={ news } ></Cards>
      <ToastContainer />
    </div>
  );
}

export default App;
