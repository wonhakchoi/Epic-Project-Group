import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getMap } from '../redux/services/mapService';
import Restaurant from './restaurants/Restaurant';

const SearchBar = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm && searchTerm.replace(/\s/g, '').length) {
      getMap(searchTerm).then((res) => {
        // console.log(res.data.results)
        setResults(res.data.results);
        setShowResults(true);
      })
    } else {
      alert('Invalid search, try again');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Search Restaurant..."
          variant="outlined"
          value={searchTerm}
          onChange={handleInputChange}
          fullWidth
        />
        <Button
          variant="contained"
          type="submit"
          style={{ marginTop: '10px', backgroundColor: '#D19BE8', color: '#000' }}
        >
          Search
        </Button>
      </form>

        <div style={{ marginTop: '50px' }}>
          <h2 style={{ textAlign: "left", marginLeft: "100px" }}>All Results For: {searchTerm}</h2>
          {results.map((result) => (
            <Restaurant key={result.place_id} restaurant={result} />
          ))}
        </div>
    </div>
  );
};

export default SearchBar;
