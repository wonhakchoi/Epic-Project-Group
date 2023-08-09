import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriendRatingsAsync } from "../../redux/thunks/ratingsThunks";
import { REQUEST_STATE } from "../../redux/requestStates";
import RatingCard from "./RatingCard";
import { Typography, Divider } from "@mui/material";
import "./DiscoverRatings.css";
import LoadingUsers from "../users/LoadingUsers";

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
        if (shouldFetch.current) {
            shouldFetch.current = false;
            dispatch(
                getFriendRatingsAsync({
                    skipAmount: ratingsSlice.ratings.length,
                    resultsToGet: resultsPerPage,
                    friendIDs: friendsSlice.friends,
                })
            );
        }
    }, []);

    // fetches more ratings if not all already fetched
    const fetchMoreRatings = () => {
        if (ratingsSlice.ratings.length >= ratingsSlice.databaseSize) {
            return;
        }
        dispatch(
            getFriendRatingsAsync({
                skipAmount: ratingsSlice.ratings.length,
                resultsToGet: resultsPerPage,
                friendIDs: friendsSlice.friends,
            })
        );
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
            <Divider variant="middle" />
            <Typography variant="h4" component="div" sx={{ mb: 5, mt: 6 }}>
                Ratings from Your Friends
            </Typography>
            {ratingsSlice.ratings.map((rating) => (
                <RatingCard
                    key={rating._id}
                    id={rating._id}
                    userID={rating.userID}
                    name={findUserByID(rating.userID)?.firstName ? findUserByID(rating.userID).firstName : "Name"}
                    restaurant={rating.restaurantName ? rating.restaurantName : "no restaurant name"}
                    icon={findUserByID(rating.userID)?.icon ? findUserByID(rating.userID).icon : 1}
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
