import { Grid } from "@mui/material";
import Card from "./Card/Card";
import React, { useState, useEffect } from "react";
import { backgroundColor, API_KEY } from "./util/util";

function CityList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("cities.json")
      .then((response) => response.json())
      .then((jsonData) => {
        const CITY_CODE = jsonData.List.map((city) => city.CityCode).join(",");
        const weatherAPI = `https://api.openweathermap.org/data/2.5/group?id=${CITY_CODE}&units=metric&appid=${API_KEY}`;

        fetch(weatherAPI)
          .then((response) => response.json())
          .then((data) => {
            setData(
              data.list.map((i) => {
                return {
                  description: i.weather[0].description,
                  temp: i.main.temp,
                  dt: i.dt,
                  id: i.id,
                  name: i.name,
                };
              })
            );
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  const cache = new Map();

  function getWeatherData() {
    const now = new Date().getTime();

    if (cache.has("WeatherData")) {
      const cachedData = cache.get("WeatherData");
      if (now - cachedData.time < 1000 * 60 * 5) {
        return cachedData.data;
      } else {
        cache.delete("WeatherData");
      }
    }

    cache.set("WeatherData", { data: data, time: now });
    return data;
  }

  return (
    <>
      <Grid container rowSpacing={1}>
        {getWeatherData().map((citiData, i) => {
          return (
            <Grid key={i} item xs={12} md={6}>
              <Card citiData={citiData} backgroundColor={backgroundColor[i]} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default CityList;
