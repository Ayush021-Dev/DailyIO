import React, { useState } from 'react';
import './weather.css';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '9216f058ead5840f20e16d510bb1ce7b'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('City not found or weather data unavailable');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Function to determine weather-based class
  const getWeatherClass = () => {
    if (!weather) return '';
    const mainWeather = weather.weather[0].main.toLowerCase();
    const weatherClasses = {
      clear: 'clear',
      clouds: 'clouds',
      rain: 'rain',
      snow: 'snow',
      thunderstorm: 'thunderstorm',
      mist: 'mist',
      fog: 'fog'
    };
    return weatherClasses[mainWeather] || 'default-weather';
  };

  return (
    <div className="weather-widget-wrapper">
      <div className={`weather-widget-container ${getWeatherClass()}`}>
       
          <h2 className="weather-widget-title">Weather Updates</h2>
          
          <form onSubmit={handleSubmit} className="weather-widget-form">
            <input
              type="text"
              className="weather-widget-input"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="weather-widget-button">
              Get Weather
            </button>
          </form>

          {loading && (
            <div className="weather-widget-loading">
              <p>Loading weather data...</p>
            </div>
          )}

          {error && (
            <div className="weather-widget-error">
              <p>{error}</p>
            </div>
          )}

          {weather && (
            <div className="weather-widget-data">
              <div className="weather-widget-location">
                <h3>{weather.name}, {weather.sys.country}</h3>
              </div>
              
              <div className="weather-widget-main">
                <img 
                  src={getWeatherIcon(weather.weather[0].icon)} 
                  alt={weather.weather[0].description}
                  className="weather-widget-icon"
                />
                <div className="weather-widget-temp">
                  <h2>{Math.round(weather.main.temp)}°C</h2>
                  <p>{weather.weather[0].description}</p>
                </div>
              </div>
              
              <div className="weather-widget-details">
                <div className="weather-widget-detail-item">
                  <span>Feels like</span>
                  <span>{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div className="weather-widget-detail-item">
                  <span>Humidity</span>
                  <span>{weather.main.humidity}%</span>
                </div>
                <div className="weather-widget-detail-item">
                  <span>Wind</span>
                  <span>{weather.wind.speed} m/s</span>
                </div>
                <div className="weather-widget-detail-item">
                  <span>Pressure</span>
                  <span>{weather.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

  );
};

export default WeatherWidget;
