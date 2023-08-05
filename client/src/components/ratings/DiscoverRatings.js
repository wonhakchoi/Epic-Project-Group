import React, { useEffect, useRef, useState } from "react";
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

    // make initial fetch when entering page
    const shouldFetch = useRef(true);
    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            dispatch(getUsersAsync());
            dispatch(getRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage }))
                .then((data) => {
                    setRatings(oldRatings => [...oldRatings, ...data.payload.data.ratings]);
                });
        }
    }, []);

    // sets 'loaded' to true only once the restaurant, ratings, and users are all loaded
    useEffect(() => {
        if (usersSlice.getUsers !== REQUEST_STATE.FULFILLED) {
            return;
        }
        setLoaded(true);
    }, [usersSlice.getUsers, usersSlice.users, dispatch]);

    useEffect(() => {
        // { restaurantID: "", restaurantName: "" }
        // setRestaurants(prevArray => [...prevArray, { restaurantID: "", restaurantName: "" }]);

        // for (restaurant of )
        // for each rating, get the restaurant ID, then use getRestaurantByPlcaeID to get restaurant name
        // store it in restaurants
        const fetchRestaurantName = async (placeID) => {
            // dispatch(getRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage }))
            //     .then((data) => {
            //         console.log(data.payload.data.ratings);
            //         // const s = data.payload.status;
            //         // if (!s) {
            //         //     removeCookie('token');
            //         //     navigate('/login');
            //         // }
            //         // setState(STATES.COMPLETE);
            //     })
            // const ratings = await ratingsSlice.ratings;
            // console.log("ratings");
            // console.log(ratings);
            try {
                const restaurantData = await getRestaurantByPlaceID(placeID);
                return restaurantData.data.result.name;
                // setRestaurants(restaurantData.data.result);
                // console.log(restaurantData.data.result.name);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRestaurantName("ChIJw-s4pFdxhlQRh2jK22eXlnU");


    }, [dispatch]);

    // fetches more ratings if not all already fetched
    const fetchMoreRatings = () => {
        if (ratingsSlice.ratings.length >= ratingsSlice.databaseSize) {
            return;
        }
        dispatch(getRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage }))
            .then((data) => {
                setRatings(oldRatings => [...oldRatings, ...data.payload.data.ratings]);
            });
    };

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
            {console.log("hello")}
            {console.log(ratings)}
            {ratingsSlice.ratings.map((rating) => (
                <RatingCard
                    key={rating._id}
                    id={rating._id}
                    name={findUserByID(rating.userID).firstName ? findUserByID(rating.userID).firstName : "test"}
                    // name={rating.userID}
                    restaurant={rating.restaurantID}
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

// https://stackoverflow.com/questions/73002902/api-getting-called-twice-in-react#:~:text=The%20cause%20of%20the%20issue,which%20call%20the%20API%20twice.
// shouldFetch ref hook called due to React StrictMode
