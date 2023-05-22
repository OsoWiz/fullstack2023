import CountryInfo from "./CountryInfo";

const CountryList = ({ countries, setFunc }) => {
  if (countries && countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => setFunc([country])}>show</button>
          </li>
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
