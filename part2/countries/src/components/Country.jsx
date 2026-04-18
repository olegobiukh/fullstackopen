import { useState, useEffect } from "react";
import weatherData from "../services/waether";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country) {
      weatherData.getWeather(country.capital[0]).then((data) => {
        setWeather(data);
      });
    }
  }, [country]);

  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>
        <b>Capital:</b> {country.capital}
      </p>
      <p>
        <b>Area:</b> {country.area}
      </p>
      <h1>Languages</h1>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      {weather && (
        <>
          <h1>Weather in {country.capital}</h1>
          <p>Temperature {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default Country;
