import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const DailyIO = () => {
  return (
    <div className="home-page">
      <div className="home-wrapper">
        <div className="home-container">
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
        </div>
      </div>
    </div>
  );
};

export default DailyIO;