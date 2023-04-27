async function fetchCities() {
  const response = await fetch("cities.json");
  const data = await response.json();
  const cityCodes = data.List.map((city) => city.CityCode).join(",");
  return cityCodes;
}

async function fetchWeatherData(cityCodes) {
  const weatherAPI = `${process.env.REACT_APP_BASE_URL}/group?id=${cityCodes}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const response = await fetch(weatherAPI);
  const data = await response.json();
  const transformedData = data.list.map((item) => ({
    description: item.weather[0].description,
    temp: item.main.temp,
    dt: item.dt,
    id: item.id,
    name: item.name,
  }));
  return transformedData;
}
const fetchFullWeatherData = {
  getWeatherAPIUrl: (cityId) => {
    return `${process.env.REACT_APP_BASE_URL}/group?id=${cityId}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  },
};

export { fetchCities, fetchWeatherData, fetchFullWeatherData };
