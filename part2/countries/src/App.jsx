import { useEffect, useState } from "react";
import countryData from "./services/countries";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  // https://studies.cs.helsinki.fi/restcountries/

  useEffect(() => {
    countryData.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleCountryChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const country = countriesToShow[0];
  return (
    <div>
      <div>
        find countries
        <input value={searchTerm} onChange={handleCountryChange} />
      </div>
      <div>
        {searchTerm && (
          <div>
            {countriesToShow.length === 1 && (
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
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                />
              </div>
            )}
            {countriesToShow.length === 0 && <div>Country not found</div>}
            {countriesToShow.length > 10 && (
              <div>Too many matches, specify another filter</div>
            )}
            {countriesToShow.length <= 10 &&
              countriesToShow.length > 1 &&
              countriesToShow.map((country) => (
                <div key={country.name.common}>{country.name.common}</div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
