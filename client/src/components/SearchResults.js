import React from "react";
import Restaurant from "./restaurants/Restaurant";

const SearchResults = ({ searchTerm }) => {
  // Simulated search results data
  const searchResults = [
    {
      id: 1,
      name: "Rain or Shine Ice Cream",
      description: "Ice Cream",
      location: "6001 University Blvd, Vancouver, BC",
      openingHours: "12:00 PM to 10:00 PM",
      rating: 4.6,
    },
    {
      id: 2,
      name: "McDonald's",
      description: "Fast food restaurant",
      location: "5728 University Blvd, Vancouver, BC",
      openingHours: "Open 24 hours",
      rating: 3.4,
    },
    {
      id: 3,
      name: "Browns Crafthouse UBC",
      description: "Pub",
      location: "6111 University Blvd, Vancouver, BC",
      openingHours: "11AM to 12AM",
      rating: 4.3,
    },
  ];

  return (
    <div>
      <h2>All Results {searchTerm}</h2>
      {searchResults.map((result) => (
        <Restaurant key={result.id} restaurant={result} />
      ))}
    </div>
  );
};

export default SearchResults;
