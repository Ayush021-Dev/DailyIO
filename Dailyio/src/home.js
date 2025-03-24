import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const DailyIO = () => {
  return (
    <div className="home-page">
      <div className="home-wrapper">
        <div className="home-container">
          {/* Quote Section */}
          <div className="home-quote-section">
            <div className="home-card">
              <h2>Daily Inspiration</h2>
              <div className="home-quote">
                "The only way to do great work is to love what you do." - Steve Jobs
              </div>
            </div>
          </div>

          {/* Landing Section */}
          <div className="home-landing-container">
            <div className="home-logo"></div>
            <div className="home-title">Your Daily Dose of Fun, Facts & Fresh Updates!</div>

            {/* Authentication Buttons */}
            <div className="home-auth-container">
              <div className="home-button-row">
                <Link to="/login" className="home-guest-btn">Log In</Link>
                <Link to="/signup" className="home-guest-btn">Sign In</Link>
              </div>
              <Link to="/dashboard" className="home-guest-btn">Log In as Guest</Link>
            </div>
          </div>

          {/* Fun Facts Section */}
          <div className="home-fun-facts">
            <div className="home-card">
              <h2>Fun Facts</h2>
              <div className="home-fun-fact">
                Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyIO;