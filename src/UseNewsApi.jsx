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
        

        const url = search
          ? `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
          : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, search]);

  return { articles, loading, error };
}
export default useNewsApi;