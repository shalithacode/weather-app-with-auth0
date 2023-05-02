import Card from "../Card/Card";
import AddCity from "../AddCity/AddCity";
import "./CityList.css";
import React, { useState, useEffect } from "react";
import { BACKGROUND_COLORS } from "../../constants/constants";
import { fetchCities, fetchWeatherData } from "../../Helpers/APIHelper";

function CityList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cityCodes = await fetchCities();
        const weatherData = await fetchWeatherData(cityCodes);
        setData(weatherData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "WeatherData",
      JSON.stringify({ data, time: new Date().getTime() })
    );
  }, [data]);

  function getWeatherData() {
    const now = new Date().getTime();
    const weatherData = localStorage.getItem("WeatherData");
    if (weatherData) {
      const { data: cachedData, time } = JSON.parse(weatherData);
      if (now - time < 1000 * 60 * 5) {
        return cachedData;
      }
    }
    return data;
  }

  const cardColseHanlder = (cardId) => {
    const filteredCities = data.filter((city) => city.id !== cardId);
    setData(filteredCities);
  };
  return (
    <>
      <AddCity></AddCity>
      <div className="city-grid">
        {getWeatherData().map((citiData, i) => {
          return (
            <Card
              key={citiData.id}
              citiData={citiData}
              BACKGROUND_COLORS={BACKGROUND_COLORS[i]}
              onCloseHandler={cardColseHanlder}
            />
          );
        })}
      </div>
    </>
  );
}

export default CityList;
