import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_KEY;

const url = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (capital) => {
  const request = axios.get(url, {
    params: {
      q: capital,
      units: "metric",
      appid: api_key,
    },
  });
  return request.then((response) => response.data);
};

export default {
  getWeather,
};
