import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FriendsList from "../components/users/FriendsList";
import FriendSearch from "../components/users/FriendSearch";
import FriendRequests from "../components/users/FriendRequests";
import LoadingUsers from "../components/users/LoadingUsers";
import { REQUEST_STATE } from "../redux/requestStates";
import { getUsersAsync } from "../redux/thunks/usersThunks";
import { getRestaurantsAsync } from "../redux/thunks/restaurantsThunks";

const Friends = () => {
    const usersSlice = useSelector((state) => state.users.allUsers);
    const restaurantsSlice = useSelector((state) => state.restaurants.allRestaurants);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersAsync());
        dispatch(getRestaurantsAsync());
    }, [dispatch]);

    const isLoading = () => {
        return (
            usersSlice.getUsers !== REQUEST_STATE.FULFILLED ||
            restaurantsSlice.getRestaurants !== REQUEST_STATE.FULFILLED
        );
    };

    return (
        <div className="friends-container">
            {isLoading() ? (
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
