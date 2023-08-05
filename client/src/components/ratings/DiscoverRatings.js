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

                    for (const rating of data.payload.data.ratings) {
                        // console.log(rating.restaurantID);
                        getRestaurantByPlaceID(rating.restaurantID).then((res) => {
                            // console.log(res.data.result.name);
                            setRestaurants(prevArray => [...prevArray, { restaurantID: rating.restaurantID, restaurantName: res.data.result.name }]);
                            // setRestaurants(oldArray => [...oldArray, res.data.result.name]);
                        })
                        // const restaurantData = await getRestaurantByPlaceID(rating.restaurantID);
                        // console.log(restaurantData.data.result.name);
                    }

                });

        }
    }, []);

    // sets 'loaded' to true only once the restaurant, ratings, and users are all loaded
    useEffect(() => {
        console.log(restaurants.length);
        console.log(restaurants);
        if (usersSlice.getUsers !== REQUEST_STATE.FULFILLED || restaurants.length < resultsPerPage) {
            return;
        }
        setLoaded(true);
    }, [usersSlice.getUsers, usersSlice.users, restaurants, dispatch]);

    useEffect(() => {
        // { restaurantID: "", restaurantName: "" }
        // setRestaurants(prevArray => [...prevArray, { restaurantID: "", restaurantName: "" }]);

        // for (restaurant of )
        // for each rating, get the restaurant ID, then use getRestaurantByPlcaeID to get restaurant name
        // store it in restaurants
        const fetchRestaurantName = async (placeID) => {
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

        // console.log('hi')
        // for (const rating of ratings) {
        //     console.log(rating);
        // }


    }, [dispatch]);

    // fetches more ratings if not all already fetched
    const fetchMoreRatings = () => {
        if (ratingsSlice.ratings.length >= ratingsSlice.databaseSize) {
            return;
        }
        // dispatch(getRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage }))
        //     .then((data) => {
        //         setRatings(oldRatings => [...oldRatings, ...data.payload.data.ratings]);
        //     });

        dispatch(getRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage }))
            .then((data) => {

                for (const rating of data.payload.data.ratings) {
                    // console.log(rating.restaurantID);
                    getRestaurantByPlaceID(rating.restaurantID).then((res) => {
                        // console.log(res.data.result.name);
                        setRestaurants(prevArray => [...prevArray, { restaurantID: rating.restaurantID, restaurantName: res.data.result.name }]);
                        // setRestaurants(oldArray => [...oldArray, res.data.result.name]);
                    }).catch((err) => {
                        console.log(err);
                    })
                    // const restaurantData = await getRestaurantByPlaceID(rating.restaurantID);
                    // console.log(restaurantData.data.result.name);
                }

            });
    };

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
        } catch(err) {
            console.log(err);
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
            {/* {console.log("hello")}
            {console.log(ratings)} */}
            {/* {console.log(restaurants.ChIJO1V_sWZxhlQR69RUQ1rHcb0)}; */}
            {/* {console.log(restaurants[1].restaurantName)} */}
            {/* {console.log(findRestaurantByID('ChIJO1V_sWZxhlQR69RUQ1rHcb0'))} */}
            {ratingsSlice.ratings.map((rating) => (
                <RatingCard
                    key={rating._id}
                    id={rating._id}
                    name={findUserByID(rating.userID).firstName ? findUserByID(rating.userID).firstName : ""}
                    // name={rating.userID}
                    // restaurant={restaurants[1].restaurantName}
                    // restaurant={rating.restaurantID}
                    restaurant={findRestaurantByID(rating.restaurantID)}
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
