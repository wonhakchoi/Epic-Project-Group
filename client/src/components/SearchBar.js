import React, { useState } from 'react';
import './SearchBar.css';
import { getMap } from "../redux/services/mapService"
import Restaurant from "./restaurants/Restaurant";

const SearchBar = () => {
  let [results, setResults] = useState([])
  let [searchTerm, setSearchTerm] = useState('');
  let [showResults, setShowResults] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm && searchTerm.replace(/\s/g, '').length) {
      getMap(searchTerm).then((res) => {
        setResults(res.data.results);
        setShowResults(true);
      })
      // const result = await getMap(searchTerm);
      // results = result.data.results;
      // setShowResults(true);
    } else {
      alert("invalid search, try again");
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {showResults && (
        <div>
          <h2>All Results For: {searchTerm}</h2>
            {results.map((result) => (
                <Restaurant key={result.place_id} restaurant={result} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;