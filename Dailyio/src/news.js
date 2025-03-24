import React from "react";
import "./news.css"; // Import the CSS file

const News = () => {
  const newsArticles = [
    {
      title: "Global Climate Summit Concludes with New Environmental Agreements",
      excerpt:
        "World leaders reached consensus on new climate action targets during the final day of the International Climate Summit in Geneva.",
      date: "Feb 4, 2025",
      category: "World",
    },
    {
      title: "Breakthrough in Quantum Computing Achieves New Milestone",
      excerpt:
        "Scientists announce successful demonstration of a 1000-qubit quantum computer, marking a significant advancement in quantum technology.",
      date: "Feb 4, 2025",
      category: "Technology",
    },
    {
      title: "Major Sports League Expands to New International Markets",
      excerpt:
        "The Global Basketball Association announces plans to establish new teams in Asia and Europe, marking historic expansion.",
      date: "Feb 4, 2025",
      category: "Sports",
    },
    {
      title: "Renewable Energy Investment Reaches Record High",
      excerpt:
        "Global investment in renewable energy projects surpassed $500 billion in 2024, setting new records for sustainable development.",
      date: "Feb 4, 2025",
      category: "Business",
    },
    {
      title: "New Space Telescope Reveals Unprecedented Views of Distant Galaxies",
      excerpt:
        "Astronomers share first images from the next-generation space telescope, showing previously unseen details of galaxy formation.",
      date: "Feb 4, 2025",
      category: "Science",
    },
    {
      title: "Artificial Intelligence Makes Breakthrough in Medical Diagnosis",
      excerpt:
        "New AI system demonstrates unprecedented accuracy in early disease detection, promising to transform healthcare.",
      date: "Feb 4, 2025",
      category: "Technology",
    },
  ];

  return (
    <div className="news-container">
      <div className="header">
        <h1>Global News Dashboard</h1>
        <p>Your daily source for world news and updates</p>
      </div>

      <div className="category-tabs">
        {["World", "Technology", "Sports", "Business", "Science"].map(
          (category) => (
            <div key={category} className="category-tab">
              {category}
            </div>
          )
        )}
      </div>

      <div className="news-grid">
        {newsArticles.map((news, index) => (
          <div className="news-card" key={index}>
            <div className="news-title">{news.title}</div>
            <div className="news-excerpt">{news.excerpt}</div>
            <div className="news-meta">
              <span className="news-date">{news.date}</span>
              <span className="category-label">{news.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
