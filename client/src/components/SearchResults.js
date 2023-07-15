import React from "react";
import Restaurant from "./restaurants/Restaurant";

const SearchResults = (searchTerm, results) => {
  // Simulated search results data
  return (
    <div>
      <h2>All Results For: {searchTerm}</h2>
      {results.map((result) => (
        <Restaurant key={result.id} restaurant={result} />
      ))}
    </div>
  );
};

export default SearchResults;
