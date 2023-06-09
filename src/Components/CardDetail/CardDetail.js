import React, { useState, useEffect } from "react";
import {
  INITIAL_WEATHER_DATA,
  MONTH_ABBREVIATIONS,
} from "../../constants/constants";
import "./CardDetail.css";
import { useLocation } from "react-router-dom";
import { fetchFullWeatherData } from "../../Helpers/APIHelper";

const CardDetail = () => {
  const [data, setData] = useState(INITIAL_WEATHER_DATA);
  const [formattedDateTime, setFormattedDateTime] = useState("");
  const location = useLocation();

  useEffect(() => {
    const CITY_CODE = location.state.id;
    const weatherAPI = fetchFullWeatherData.getWeatherAPIUrl(CITY_CODE);

    fetch(weatherAPI)
      .then((response) => response.json())
      .then((data) => {
        setData(data.list[0]);
      })
      .catch((error) => console.error(error));

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    const ampm = hour < 12 ? "am" : "pm";

    const monthAbbreviation = MONTH_ABBREVIATIONS[now.getMonth()];

    const dayOfMonth = now.getDate();

    setFormattedDateTime(
      `${formattedHour}.${formattedMinute}${ampm}, ${monthAbbreviation} ${dayOfMonth}`
    );
  }, [location.state.id]);

  return (
    <div className="cardView">
      <div className="cView">
        <div className={`top background--${location.state.backgroundColorId}`}>
          <h1 className="heading">
            {data.name}, {data.sys.country}
          </h1>
          <p className="time">{formattedDateTime}</p>
          <button className="back-btn"></button>
          <label htmlFor="btn">
            <img
              src="./back.png"
              alt="back-icon"
              className="goBack"
              onClick={() => {
                window.location.assign("/");
              }}
            />
          </label>
          <div className="sect1">
            <div className="left">
              <img
                src="./cloud-computing.png"
                alt="cloud-icon"
                className="cloud"
              />
              <p className="cloudText"> {data.weather[0].description}</p>
            </div>
            <div className="right">
              <h1 className="centi">{data.main.temp}°C</h1>
              <p className="min">Temp Min: {data.main.temp_min}°C</p>
              <p className="max">Temp Max: {data.main.temp_max}°C</p>
            </div>
          </div>
        </div>

        <div className="bcard">
          <div className="bleft">
            <p>
              Pressure: <span>{data.main.pressure}hpa</span>{" "}
            </p>
            <p>
              Humidity: <span>{data.main.humidity}%</span>{" "}
            </p>
            <p>
              Visibility: <span>{data.visibility}km</span>{" "}
            </p>
          </div>
          <div className="bcenter">
            <img src="./send.png" alt="send-icon" className="Send" />
            <p className="bcent">
              {data.wind.speed} m/s {data.wind.deg} Degree
            </p>
          </div>
          <div className="bright">
            <p>
              Sunrise:{" "}
              <span>
                {new Date(data.sys.sunrise * 1000).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>{" "}
            </p>
            <p>
              Sunset:{" "}
              <span>
                {new Date(data.sys.sunset * 1000).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
