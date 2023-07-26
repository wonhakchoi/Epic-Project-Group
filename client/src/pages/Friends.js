import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FriendsList from "../components/users/FriendsList";
import FriendSearch from "../components/users/FriendSearch";
import FriendRequests from "../components/users/FriendRequests";
import LoadingUsers from "../components/users/LoadingUsers";
import { REQUEST_STATE } from "../redux/requestStates";
import { getUsersAsync } from "../redux/thunks/usersThunks";
import { getRestaurantsAsync } from "../redux/thunks/restaurantsThunks";
import { setFriendsLists } from "../redux/actions/userActions";

const Friends = () => {
    const usersSlice = useSelector((state) => state.users.allUsers);
    const restaurantsSlice = useSelector((state) => state.restaurants.allRestaurants);
    const authenticationSlice = useSelector((state) => state.authentication.authentication);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    // loads initial users and restaurants information
    useEffect(() => {
        dispatch(getUsersAsync());
        dispatch(getRestaurantsAsync());
    }, [dispatch]);

    // sets up user profile once user and restaurant information is finished loading
    useEffect(() => {
        if (
            !authenticationSlice.isLoggedIn ||
            usersSlice.getUsers !== REQUEST_STATE.FULFILLED ||
            restaurantsSlice.getRestaurants !== REQUEST_STATE.FULFILLED
        ) {
            return;
        }
        const signedInUser = usersSlice.users.filter((user) => user._id === authenticationSlice.user)[0];
        setFriendsLists(dispatch, signedInUser.friends, signedInUser.incomingRequests, signedInUser.outgoingRequests);
        setLoaded(true);
    }, [
        usersSlice.getUsers,
        restaurantsSlice.getRestaurants,
        authenticationSlice.loggedIn,
        authenticationSlice.user,
        usersSlice.users,
        dispatch,
    ]);

    return (
        <div className="friends-container">
            {!loaded ? (
                <LoadingUsers />
            ) : (
                <div>
                    <FriendRequests />
                    <FriendSearch />
                    <FriendsList />
                </div>
            )}
        </div>
    );
};

export default Friends;
