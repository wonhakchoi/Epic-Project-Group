import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriendRatingsAsync } from "../../redux/thunks/ratingsThunks";
import { REQUEST_STATE } from "../../redux/requestStates";
import RatingCard from "./RatingCard";
import { Typography, Divider } from "@mui/material";
import "./DiscoverRatings.css";
import LoadingUsers from "../users/LoadingUsers";
import { getRestaurantByPlaceID } from "../../redux/services/mapService";

const FriendRatings = () => {
    const ratingsSlice = useSelector((state) => state.ratings.friendRatings);
    const friendsSlice = useSelector((state) => state.users.userFriends);
    const usersSlice = useSelector((state) => state.users.allUsers);
    const [restaurants, setRestaurants] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const resultsPerPage = 4;

    // make initial fetch when entering page
    const shouldFetch = useRef(true);
    useEffect(() => {
        const fetchUserAndRestaurant = async () => {
            try {
                const data = await dispatch(getFriendRatingsAsync({ skipAmount: ratingsSlice.ratings.length, resultsToGet: resultsPerPage, friendIDs: friendsSlice.friends, }));
                const ratingsArray = data.payload.data.ratings;

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
    }, []);

    // fetches more ratings if not all already fetched
    const fetchMoreRatings = useCallback(async () => {
        if (ratingsSlice.ratings.length >= ratingsSlice.databaseSize) {
            return;
        }
        try {
            const data = await dispatch(getFriendRatingsAsync({
                skipAmount: ratingsSlice.ratings.length,
                resultsToGet: resultsPerPage,
                friendIDs: friendsSlice.friends,
            }));
            const ratingsArray = data.payload.data.ratings;

            for (const rating of ratingsArray) {
                const restaurantData = await getRestaurantByPlaceID(rating.restaurantID);
                setRestaurants(prevArray => [...prevArray, { restaurantID: rating.restaurantID, restaurantName: restaurantData.data.result.name }]);
            }
        } catch (err) {
            console.log(err);
        }
    }, [restaurants, dispatch]);

    // // fetches more ratings if not all already fetched
    // const fetchMoreRatings = () => {
    //     if (ratingsSlice.ratings.length >= ratingsSlice.databaseSize) {
    //         return;
    //     }
    //     dispatch(
    //         getFriendRatingsAsync({
    //             skipAmount: ratingsSlice.ratings.length,
    //             resultsToGet: resultsPerPage,
    //             friendIDs: friendsSlice.friends,
    //         })
    //     );
    // };

    // sets 'loaded' to true only once the restaurant, ratings, and users are all loaded
    useEffect(() => {
        if (!restaurants) {
            return;
        }
        setLoaded(true);
    }, [restaurants, dispatch]);

    // find user by ID
    const findUserByID = (userID) => {
        const matchedUser = usersSlice.users.filter((user) => user._id === userID);
        return `${matchedUser[0].firstName} ${matchedUser[0].lastName}`;
    };

    // find restaurant by ID
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
            <Divider variant="middle" />
            <Typography
                variant="h4"
                component="div"
                sx={{ mb: 5, mt: 6 }}
            >
                Ratings from Your Friends
            </Typography>
            {ratingsSlice.ratings.map((rating) => (
                <RatingCard
                    key={rating._id}
                    id={rating._id}
                    name={findUserByID(rating.userID)}
                    // restaurant={rating.restaurantID}
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

export default FriendRatings;
