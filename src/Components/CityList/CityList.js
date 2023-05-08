import Card from "../Card/Card";
import AddCity from "../AddCity/AddCity";
import "./CityList.css";
import React, { useState, useEffect } from "react";
import { fetchCities, fetchWeatherData } from "../../Helpers/APIHelper";
import { VALIDITY_PERIOD } from "../../constants/constants";

function CityList() {
  const [data, setData] = useState([]);
  async function fetchData() {
    try {
      const cityCodes = await fetchCities();
      const weatherData = await fetchWeatherData(cityCodes);
      localStorage.setItem(
        "WeatherData",
        JSON.stringify({ weatherData, time: new Date().getTime() })
      );
      setData(weatherData);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const now = new Date().getTime();
    const weatherData = localStorage.getItem("WeatherData");
    if (weatherData) {
      const { weatherData: cachedData, time } = JSON.parse(weatherData);

      if (now - time < VALIDITY_PERIOD) {
        setData(cachedData);
      } else {
        fetchData();
      }
    } else {
      fetchData();
    }
  }, []);

  const cardColseHanlder = (cardId) => {
    const filteredCities = data.filter((city) => city.id !== cardId);
    setData(filteredCities);
  };
  return (
    <>
      <AddCity></AddCity>
      <div className="city-grid">
        {data.map((citiData, i) => {
          return (
            <Card
              key={citiData.id}
              citiData={citiData}
              onCloseHandler={cardColseHanlder}
              id={i}
            />
          );
        })}
      </div>
    </>
  );
}

export default CityList;
