import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function useNewsApi(category = 'general', search = '') {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use CORS proxy for production
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        
        const newsUrl = search
          ? `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
          : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

        // Use proxy in production, direct API in development
        const finalUrl = window.location.hostname.includes('vercel.app') 
          ? `${proxyUrl}${encodeURIComponent(newsUrl)}`
          : newsUrl;

        console.log('Fetching from:', finalUrl);
        
        const response = await axios.get(finalUrl);
        
        if (response.data.articles && response.data.articles.length > 0) {
          setArticles(response.data.articles);
        } else {
          setError('No articles found');
          setArticles([]);
        }
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to fetch news. Please try again later.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, search]);

  return { articles, loading, error };
}

export default useNewsApi;