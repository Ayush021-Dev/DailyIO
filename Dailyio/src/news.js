import React, { useState, useEffect } from 'react';
import './news.css';

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const categories = ['general', 'technology', 'business', 'science', 'sports'];

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${activeCategory}&language=en&apiKey=7617166f1be449859f343ccf574d70a9`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNewsArticles(data.articles.slice(0, 6)); // Limit to 6 articles
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchNews();
  }, [activeCategory]);

  if (error) {
    return <div className="news-error-message">Error: {error}</div>;
  }

  return (
    <div className="news-dashboard-page">
     <br></br><br></br> <div className="news-container">
        <div className="news-header">
          <h2>Global News Dashboard</h2>
          <p>Real-time news from around the world</p>
        </div>
        
        <div className="news-category-tabs">
          {categories.map((category) => (
            <div 
              key={category} 
              className={`news-category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>
        
        <div className="news-grid">
          {isLoading ? (
            <div className="news-loading">Loading news...</div>
          ) : (
            newsArticles.map((news, index) => (
              <div className="news-card" key={index}>
                <div className="news-title">{news.title}</div>
                <div className="news-excerpt">{news.description || 'No description available'}</div>
                
                <div className="news-meta">
                  <span className="news-date">
                    {new Date(news.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="news-category-label">{activeCategory.toUpperCase()}</span>
                </div>
                
                {news.url && (
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="news-read-more"
                  >
                    Read More
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default News;