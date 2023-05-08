export const VALIDITY_PERIOD = 1000 * 60 * 5;

export const INITIAL_WEATHER_DATA = {
  coord: { lon: "", lat: "" },
  sys: {
    type: "",
    id: "",
    message: "",
    country: "",
    sunrise: "",
    sunset: "",
  },
  weather: [
    {
      id: "",
      main: "",
      description: "",
      icon: "",
    },
  ],
  main: {
    temp: "",
    pressure: "",
    humidity: "",
    temp_min: "",
    temp_max: "",
  },
  visibility: "",
  wind: {
    speed: "",
    deg: "",
  },
  clouds: {
    all: 0,
  },
  dt: "",
  id: "",
  name: "",
};

export const MONTH_ABBREVIATIONS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
