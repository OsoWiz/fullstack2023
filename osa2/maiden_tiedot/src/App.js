import { useEffect, useState } from "react";
import search from "./searchService";
import CountryList from "./CountryList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    search(searchTerm).then((countries) => {
      setCountryList(countries);
    });
  }, [searchTerm]);

  return (
    <div>
      Find countries:{" "}
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <CountryList countries={countryList} setFunc={setCountryList} />
    </div>
  );
}

export default App;
