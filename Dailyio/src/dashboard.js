import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css"; 

const dashboardStyle = {
    background: 'linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96C93D)',
    backgroundSize: '400% 400%',
    minHeight: '100vh',
    padding: '20px 20px',
    animation: 'dashboardGradientBG 15s ease infinite'
  };
const Dashboard = () => {
    return (
        <div className="dashboard-page" style={dashboardStyle}>
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>Daily<span>IO</span></h1>
                    <h2>What you wanna do?</h2>
                </header>

                {/* Dashboard Features */}
                <div className="dashboard-grid">
                    <br></br>
                    <div className="dashboard-main-content">
                        <div className="dashboard-card">
                            <div className="dashboard-feature-grid">
                                <div className="dashboard-feature">
                                    <Link to="/games">
                                        <h3>Mini Games</h3>
                                        <p>Play & Relax</p>
                                    </Link>
                                </div>
                                <div className="dashboard-feature">
                                    <Link to="/weather">
                                        <h3>Weather</h3>
                                        <p>Current: 72°F Sunny</p>
                                    </Link>
                                </div>
                                <div className="dashboard-feature">
                                    <Link to="/news">
                                        <h3>News Updates</h3>
                                        <p>Latest Headlines</p>
                                    </Link>
                                </div>
                                <div className="dashboard-feature">
                                    <Link to="/stock">
                                        <h3>Stock Market</h3>
                                        <p>Market Trends</p>
                                    </Link>
                                </div>
                                <div className="dashboard-feature">
                                    <Link to="/unitconverter">
                                        <h3>Unit Converter</h3>
                                        <p>Quick Convert</p>
                                    </Link>
                                </div>
                                <div className="dashboard-feature">
                                    <Link to="/currency">
                                        <h3>Currency</h3>
                                        <p>Exchange Rates</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;