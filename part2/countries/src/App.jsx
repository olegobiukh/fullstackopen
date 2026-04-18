import { useEffect, useState } from "react";
import countryData from "./services/countries";
import "./App.css";
import Country from "./components/Country";
import CountryList from "./components/CountryList";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    countryData.getAll().then((data) => {
      setCountries(data);
    });
  }, []);
  useEffect(() => {
    countryData.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleCountryChange = (event) => {
    setCountry(null);
    const sTerms = event.target.value;
    setSearchTerm(sTerms);

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(sTerms.toLowerCase()),
    );
    setCountriesToShow(filteredCountries);

    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0]);
    } else {
      setCountry(0);
    }
  };

  const handleCCA = (cca3) => {
    const country = countries.find((c) => c.cca3 === cca3);

    setCountry(country);
    setSearchTerm(country.name.common);
  };

  return (
    <div>
      <div>
        find countries
        <input value={searchTerm} onChange={handleCountryChange} />
      </div>
      <div>
        {searchTerm && (
          <div>
            {!!country && <Country country={country} />}
            {countriesToShow.length > 10 && (
              <div>Too many matches, specify another filter</div>
            )}
            {countriesToShow.length <= 10 &&
              countriesToShow.length > 1 &&
              !country && (
                <CountryList
                  countriesToShow={countriesToShow}
                  handleCCA={handleCCA}
                />
              )}
            {countriesToShow.length === 0 && <div>Country not found</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
