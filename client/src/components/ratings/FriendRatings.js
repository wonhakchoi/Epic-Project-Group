import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriendRatingsAsync } from "../../redux/thunks/ratingsThunks";
import { REQUEST_STATE } from "../../redux/requestStates";
import RatingCard from "./RatingCard";
import { Typography, Divider } from "@mui/material";
import "./DiscoverRatings.css";

const FriendRatings = () => {
    const ratingsSlice = useSelector((state) => state.ratings.friendRatings);
    const friendsSlice = useSelector((state) => state.users.userFriends);
    const usersSlice = useSelector((state) => state.users.allUsers);
    const dispatch = useDispatch();

    const resultsPerPage = 4;

    // make initial fetch when entering page
    const shouldFetch = useRef(true);
    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            // console.log(friendsSlice.friends);
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

    // find user by ID
    const findUserByID = (userID) => {
        const matchedUser = usersSlice.users.filter((user) => user._id === userID);
        return `${matchedUser[0].firstName} ${matchedUser[0].lastName}`;
    };

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

export default FriendRatings;
