import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRatingsAsync } from "../../redux/thunks/ratingsThunks";
import { REQUEST_STATE } from "../../redux/requestStates";
import "./DiscoverRatings.css";
import RatingCard from "./RatingCard";
import { Typography, Grid, Container } from "@mui/material";

// Discover page for users to see ratings from other people
const DiscoverRatings = () => {
    const ratingsSlice = useSelector((state) => state.ratings.allRatings);
    const dispatch = useDispatch();

    const resultsPerPage = 4;

    // make initial fetch when entering page
    const shouldFetch = useRef(true);
    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            console.log(ratingsSlice);
            console.log(ratingsSlice.ratings.length);
            console.log(resultsPerPage);
            dispatch(getRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage }));
        }
    }, []);

    // fetches more ratings if not all already fetched
    const fetchMoreRatings = () => {
        if (ratingsSlice.ratings.length >= ratingsSlice.databaseSize) {
            return;
        }
        dispatch(getRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage }));
    };

    return (
        <div id="ratings-container">
            <Typography variant="h2" sx={{ marginTop: "30px" }}>
                Reviews
            </Typography>
            {ratingsSlice.ratings.map((rating) => (
                <RatingCard
                    key={rating._id}
                    id={rating._id}
                    name={rating.userID}
                    restaurant={rating.restaurantID}
                    score={rating.score}
                    comment={rating.comments ? rating.comments : ""}
                    date={rating.updatedAt}
                />
                // <div className="rating" key={rating._id}>
                //     <strong>Rating:</strong> {rating.score} - <strong>Comment:</strong> {rating.comments}
                //     <strong>{rating.userID}</strong>
                // </div>
            ))}
            {ratingsSlice.getRatings === REQUEST_STATE.PENDING && <div>Loading...</div>}
            <section className="ratings-navigation">
                {/* <h3 className="load-more" onClick={fetchMoreRatings}>
                    See More Ratings
                </h3> */}
                {/* <h5>
                    Loaded {ratingsSlice.ratings.length} out of {ratingsSlice.databaseSize} results
                </h5> */}
                <Typography
                    className="load-more"
                    variant="h6"
                    component="div"
                    onClick={fetchMoreRatings}
                    sx={{ marginTop: "30px" }}
                >
                    See More Ratings
                </Typography>
                <Typography variant="body2" component="div" sx={{ marginTop: "10px", marginBottom: "30px" }}>
                    Loaded {ratingsSlice.ratings.length} out of {ratingsSlice.databaseSize} results
                </Typography>
            </section>
        </div>
    );
};

export default DiscoverRatings;

// https://stackoverflow.com/questions/73002902/api-getting-called-twice-in-react#:~:text=The%20cause%20of%20the%20issue,which%20call%20the%20API%20twice.
// shouldFetch ref hook called due to React StrictMode
