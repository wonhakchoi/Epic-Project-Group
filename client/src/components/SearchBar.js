import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getMap } from "../redux/services/mapService";
import Restaurant from "./restaurants/Restaurant";
import LoadingUsers from "./users/LoadingUsers";
import { predict } from "../ReqSys"
import { getAllRatingsAsync } from "../redux/thunks/ratingsThunks";

const SearchBar = () => {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loaded, setLoaded] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRatingsAsync());
    }, []);


    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        setLoaded(false);
        event.preventDefault();
        if (searchTerm && searchTerm.replace(/\s/g, "").length) {
            getMap(searchTerm).then((res) => {
                const results = predict(res.data.results)
                setResults(results);
                setLoaded(true);
            });
        } else {
            alert("Invalid search, try again");
        }
    };

    return (
        <div style={{ margin: "20px" }}>
            {loaded ? (
                <section>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Search Restaurant..."
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleInputChange}
                            fullWidth
                            sx={{
                                marginTop: "1.5vh",
                                marginBottom: "1vh",
                                "& input": {
                                  fontSize: "2vh",
                                },
                                "& label": {
                                  fontSize: "2vh",
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                fontSize: "1.7vh",
                                padding: "1vh 1.6vh",
                                backgroundColor: "#5D44CA",
                                marginBottom: "1vh",
                                marginTop: "1.5vh",
                                color: "#FFFFFF",
                                "&:hover": {
                                  backgroundColor: "#432C8F",
                                },
                              }}
                        >
                            Search
                        </Button>
                    </form>

                    <div style={{ marginTop: "50px" }}>
                        <h2 style={{ textAlign: "left", marginLeft: "3vh", fontSize: "3vh", }}>All Results For: {searchTerm}</h2>
                        {results.map((result) => (
                            <Restaurant key={result.place_id} restaurant={result} />
                        ))}
                    </div>
                </section>
            ) : (
                <LoadingUsers />
            )}
        </div>
    );
};

export default SearchBar;
