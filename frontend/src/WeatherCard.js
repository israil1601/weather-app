import React from "react";

const WeatherCard = (props) => {
  const { temp, weather } = props.weather;
  const weatherDescription = weather ? weather[0].description : "";
  const date = new Date();
  const hours = date.getHours() + props.hour;
  const minutes = date.getMinutes();
  const time = `${hours}:${minutes}`;

  return (
    <div className="weather-card">
      <div className="temp">{Math.round(temp)} °C</div>
      <div className="weather">
        {weatherDescription.charAt(0).toUpperCase() +
          weatherDescription.slice(1)}
      </div>
      <div className="time-place">
        <div>{props.location}</div>
        <div>{time}</div>
      </div>
    </div>
  );
};

export default WeatherCard;
