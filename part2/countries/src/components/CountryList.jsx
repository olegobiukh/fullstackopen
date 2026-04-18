const CountryList = ({ countriesToShow, handleCCA }) => {
  return countriesToShow.map((country) => (
    <div key={country.name.common}>
      {country.name.common}{" "}
      <button onClick={() => handleCCA(country.cca3)}>Show</button>
    </div>
  ));
};

export default CountryList;
