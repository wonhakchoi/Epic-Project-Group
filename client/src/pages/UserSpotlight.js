import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { REQUEST_STATE } from "../redux/requestStates";
import { getUsersAsync } from "../redux/thunks/usersThunks";
import RatingService from "../redux/services/ratingsService";
import LoadingUsers from "../components/users/LoadingUsers";
import ProfileRestaurant from "../components/profile/ProfileRestaurant";
import User from "../components/profile/User";

const UserSpotlight = () => {
    const { userID } = useParams();
    const usersSlice = useSelector((state) => state.users.allUsers);
    const [user, setUser] = useState(null);
    const [ratings, setRatings] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    // make initial fetch to get user and rating data from MongoDB database
    useEffect(() => {
        const fetchUserAndRatingData = async () => {
            try {
                dispatch(getUsersAsync());
                const ratingData = await RatingService.getUserRatings(userID);
                setRatings(ratingData.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserAndRatingData();
    }, [userID, dispatch]);

    // sets 'loaded' to true only once the users and ratings are loaded
    useEffect(() => {
        if (usersSlice.getUsers !== REQUEST_STATE.FULFILLED || !ratings) {
            return;
        }
        const filteredUser = usersSlice.users.filter((user) => user._id === userID);
        setUser(filteredUser[0]);
        setLoaded(true);
    }, [usersSlice.getUsers, usersSlice.users, ratings]);

    if (!loaded) {
        return <LoadingUsers />;
    }

    return (
        <div>
            <User name={`${user.firstName} ${user.lastName}`} biography={user.biography} />
            <div className="restaurants-header">
                <label id="restaurant-title">Their Ratings</label>
            </div>
            <div className="restaurants">
                {ratings.map((rating) => {
                    return <ProfileRestaurant key={rating._id} rating={rating} />;
                })}
            </div>
        </div>
    );
};

export default UserSpotlight;
