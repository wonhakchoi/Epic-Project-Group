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
    const [ratings, setRatings] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    // const loggedInUser = useSelector((state) => state.sauth.currUser)

    const resultsPerPage = 4;

    const fetchUserAndRestaurant = useCallback(async () => {
        if (ratingsSlice.ratings.length >= ratingsSlice.databaseSize) {
            return;
        }
        try {
            dispatch(getUsersAsync());
            const data = await dispatch(getRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage }));
            const ratingsArray = data.payload.data.ratings;
            setRatings(oldRatings => [...oldRatings, ...ratingsArray]);

            for (const rating of ratingsArray) {
                const restaurantData = await getRestaurantByPlaceID(rating.restaurantID);
                setRestaurants(prevArray => [...prevArray, { restaurantID: rating.restaurantID, restaurantName: restaurantData.data.result.name }]);
            }
        } catch (err) {
            console.log(err);
        }
    }, [restaurants, ratings, dispatch]);

    // make initial fetch when entering page
    const shouldFetch = useRef(true);
    useEffect(() => {
        const fetchUserAndRestaurant = async () => {
            try {
                dispatch(getUsersAsync());
                const data = await dispatch(getRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage }));
                const ratingsArray = data.payload.data.ratings;
                setRatings(oldRatings => [...oldRatings, ...ratingsArray]);

                for (const rating of ratingsArray) {
                    const restaurantData = await getRestaurantByPlaceID(rating.restaurantID);
                    setRestaurants(prevArray => [...prevArray, { restaurantID: rating.restaurantID, restaurantName: restaurantData.data.result?.name ? restaurantData.data.result.name : "Restaurant" }]);
                }
                console.log('setRestaurants');
                console.log(restaurants);
            } catch (err) {
                console.log(err);
            }
        }
        if (shouldFetch.current) {
            shouldFetch.current = false;
            fetchUserAndRestaurant();
        }
    }, [dispatch]);


    // sets 'loaded' to true only once the restaurant, ratings, and users are all loaded
    useEffect(() => {
        if (usersSlice.getUsers !== REQUEST_STATE.FULFILLED || !restaurants || !ratings) {
            return;
        }
        setLoaded(true);
    }, [usersSlice.getUsers, usersSlice.users, restaurants, ratings, dispatch]);


    // find user by ID
    const findUserByID = (userID) => {
        const matchedUser = usersSlice.users.filter((user) => user._id === userID);
        return matchedUser[0];
    };

    // find user by ID
    const findRestaurantByID = (placeID) => {
        try {
            const matchedRestaurant = restaurants.filter((restaurant) => restaurant.restaurantID === placeID);
            console.log(matchedRestaurant[0]);
            return matchedRestaurant[0].restaurantName;
        } catch (err) {
            console.log('loading restaurant name');
        }

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
                    restaurant={findRestaurantByID(rating.restaurantID) ? findRestaurantByID(rating.restaurantID) : "Loading"}
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
                    // onClick={fetchMoreRatings}
                    onClick={fetchUserAndRestaurant}
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
