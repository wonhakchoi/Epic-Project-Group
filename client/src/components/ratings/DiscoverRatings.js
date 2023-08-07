import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRatingsAsync } from "../../redux/thunks/ratingsThunks";
import { getUsersAsync } from "../../redux/thunks/usersThunks";
import { REQUEST_STATE } from "../../redux/requestStates";
import "./DiscoverRatings.css";
import RatingCard from "./RatingCard";
import { Typography, Grid, Container } from "@mui/material";
import LoadingUsers from "../users/LoadingUsers";
import { getRestaurantByPlaceID } from "../../redux/services/mapService";

// Discover page for users to see ratings from other people
const DiscoverRatings = () => {
    const ratingsSlice = useSelector((state) => state.ratings.allRatings);
    const dispatch = useDispatch();
    const usersSlice = useSelector((state) => state.users.allUsers);
    const [loaded, setLoaded] = useState(false);

    const resultsPerPage = 4;

    // make initial fetch when entering page
    const shouldFetch = useRef(true);
    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            dispatch(getUsersAsync());
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

    // sets 'loaded' to true only once the ratings and users are all loaded
    useEffect(() => {
        if (usersSlice.getUsers !== REQUEST_STATE.FULFILLED || !ratingsSlice.ratings) {
            return;
        }
        setLoaded(true);
    }, [usersSlice.getUsers, dispatch]);


    // find user by ID
    const findUserByID = (userID) => {
        const matchedUser = usersSlice.users.filter((user) => user._id === userID);
        return matchedUser[0];
    };

    if (!loaded) {
        return <LoadingUsers />;
    }

    return (
        <div id="ratings-container">
            <Typography variant="h2" sx={{ marginTop: "30px" }}>
                All Reviews
            </Typography>
            
            {ratingsSlice.ratings.map((rating) => (
                <RatingCard
                    key={rating._id}
                    id={rating._id}
                    name={findUserByID(rating.userID)?.firstName ? findUserByID(rating.userID).firstName : "Name"}
                    restaurant={rating.restaurantName ? rating.restaurantName : "no restaurant name"}
                    score={rating.score}
                    comment={rating.comments ? rating.comments : ""}
                    date={rating.updatedAt}
                />
            ))}
            {ratingsSlice.getRatings === REQUEST_STATE.PENDING && <div>Loading...</div>}
            <section className="ratings-navigation">
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

// // https://stackoverflow.com/questions/73002902/api-getting-called-twice-in-react#:~:text=The%20cause%20of%20the%20issue,which%20call%20the%20API%20twice.
// // shouldFetch ref hook called due to React StrictMode