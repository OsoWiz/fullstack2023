import CountryInfo from "./CountryInfo";

const CountryList = ({ countries }) => {
  if (countries && countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    );
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  } else {
    return <p>No matches.</p>;
  }
};

export default CountryList;
