import React from "react";
import SearchBar from "../components/SearchBar";

const Home = () => {
    // return <div>HOME</div>;
    const handleSearch = (searchTerm) => {
        // Perform search operations based on the searchTerm
        console.log('Performing search for:', searchTerm);
        // You can make an API request, update state, or perform any other logic here
      };

    return (
        <div>
          <h1>Easy Eats</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      );
};

export default Home;
