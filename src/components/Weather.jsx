import React, { useState } from "react";
import axios from "axios";
import "./wheather.css";


const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);



  //Getting Weather data from Public hosted API - Starts
  const getWeather = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/getWeatherAPI", {
        params: {
          city: { city }

        },

      }

      );
      if (response.data.cod === 200) {
        setWeather(response.data);
        console.log(response.data)
        setError("");
        setIsError(false);
      }

      else if (response.data.cod === 400 || 404) {
        setError(response.data.message);
        setIsError(true);
        setWeather(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.response.data.message);
      setIsError(true);
      setWeather(null);
      console.log('Hi')
    }
  };
  //Getting Weather data from Public hosted API - End

  return (
    <div className="weather-container">
      <h2>Weather App </h2>
      <label>
        <span style={{ fontWeight: "bold" }}>Enter City:</span>
        {/* passing the input value to node service call which will be send to public hosted API - Start */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {/* passing the input value to node service call which will be send to public hosted API - End */}
      </label>
      <button style={{ backgroundColor: "lightBlue" }} onClick={getWeather}>
        Get Weather
      </button>

      {weather && !isError && (
        <div className="weather-info">
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <p>Temperature: {weather.main.temp - 273.15} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
      {/* handling error message  */}
      {error && (
        <div>
          <h2 className="error-message">{error}</h2>
        </div>
      )}
    </div>
  );
};

export default Weather;
