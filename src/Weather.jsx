import React, { useState } from "react";
import axios from "axios";
import "./wheather.css";


const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  {
   var REACT_APP_API_KEY  = '7d693d5bbb0e5bf0b0be87a98513892e';
  }
  
 

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_API_KEY}`
      );
      setWeather(response.data);
      setError("");
      setIsError(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.response.data.message);
      setIsError(true);
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather App </h2>
      <label>
        <span style={{ fontWeight: "bold" }}>Enter City:</span>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <button style={{ backgroundColor: "lightBlue" }} onClick={getWeather}>
        Get Weather
      </button>

      {weather && !isError && (
        <div className="weather-info">
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
      {error && (
        <div>
          <h2 className="error-message">{error}</h2>
        </div>
      )}
    </div>
  );
};

export default Weather;
