import React from "react";

const WeatherCard = (props) => {
  const { temp, weather } = props.weather;
  const weatherDescription = weather ? weather[0].description : "";
  const date = new Date();
  date.setHours(date.getHours() + props.hour);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
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
