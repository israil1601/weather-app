import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (lat, lon) => {
  // Get weather for browser location if possible
  const query = lat && lon ? `?lat=${lat}&lon=${lon}` : "";
  const response = await fetch(`${baseURL}/weather${query}`);

  return response ? response.json() : {};
};

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentBackground, setCurrentBackground] = useState("01");

  const fetchData = async (lat, lon) => {
    const weather = await getWeatherFromApi(lat, lon);
    const background = weather.current?.weather[0].icon.slice(0, 2) || "01";
    setCurrentWeather(weather);
    setCurrentBackground(background);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        fetchData(coords.latitude, coords.longitude)
      );
    } else {
      fetchData(0, 0);
    }
  }, []);

  const backgroundStyle = {
    backgroundImage: `url('./backgrounds/${currentBackground}.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  return (
    <div style={backgroundStyle}>
      <div className="current-weather-container">
        {currentWeather ? (
          <div className="current-weather">
            <WeatherCard
              weather={currentWeather.current}
              location={currentWeather.location}
              hour={0}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="hourly-weather-container">
        {currentWeather
          ? currentWeather.hourly.map((elem, id) => (
              <div className="hourly-weather" key={id}>
                <WeatherCard
                  weather={elem}
                  hour={id + 1}
                  location={currentWeather.location}
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default App;
