import React, { useState, useEffect } from "react";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherbit.io/v2.0/current?city=${city}&key=416114a344024621847bf15d1ccb0ca6`
        );
        const data = await res.json();
        if (!isCancelled && data.data && data.data.length > 0) {
          setWeather(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();

    return () => {
      isCancelled = true;
    };
  }, [city]);

  return (
    <div className="weather-body">
      <div className="weather-container">
        <h2>🌦 Weather Dashboard</h2>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />

        {weather ? (
          <div className="weather-info">
            <h3>{weather.city_name}</h3>
            <p>🌡 Temperature: {weather.temp}°C</p>
            <p>☁️ Weather: {weather.weather.description}</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </div>
  );
}

export default Weather;
