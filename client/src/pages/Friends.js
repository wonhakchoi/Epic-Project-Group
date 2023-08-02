import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import FriendsList from "../components/users/FriendsList";
import FriendSearch from "../components/users/FriendSearch";
import FriendRequests from "../components/users/FriendRequests";
import LoadingUsers from "../components/users/LoadingUsers";
import {REQUEST_STATE} from "../redux/requestStates";
import {getUsersAsync} from "../redux/thunks/usersThunks";
import {getRestaurantsAsync} from "../redux/thunks/restaurantsThunks";
import {setFriendsLists} from "../redux/actions/userActions";
import {postAuthAsync} from "../redux/thunks/authenticationThunks";
import {getCollectionsAsync} from "../redux/thunks/collectionsThunks";

const Friends = () => {
    const usersSlice = useSelector((state) => state.users.allUsers);
    const restaurantsSlice = useSelector((state) => state.restaurants.allRestaurants);
    const isLoggedIn = useSelector(state => state.sauth.isLoggedIn);
    const currUser = useSelector(state => state.sauth.currUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);

    // verifySession and setup page
    useEffect(() => {
        dispatch(postAuthAsync(cookies.token))
            .then((data) => {
                const s = data.payload.status;
                if (s) {
                    loadRestaurantsAndUsers();
                    setUpInfo();
                    setLoaded(true);
                } else {
                    setCookie('token', null);
                    navigate("/login");
                }
            })
    }, [cookies, navigate, setCookie]);

    function loadRestaurantsAndUsers() {
        dispatch(getUsersAsync());
        dispatch(getRestaurantsAsync());
    }

    // // sets up user profile once user and restaurant information is finished loading
    function setUpInfo() {
        if (
            !isLoggedIn ||
            usersSlice.getUsers !== REQUEST_STATE.FULFILLED ||
            restaurantsSlice.getRestaurants !== REQUEST_STATE.FULFILLED
        ) {
            return;
        }
        const signedInUser = usersSlice.users.filter((user) => user._id === currUser)[0];
        console.log("signedInUser");
        console.log(signedInUser);
        setFriendsLists(dispatch, signedInUser.friends, signedInUser.incomingRequests, signedInUser.outgoingRequests);
    }

    return (
        <div className="friends-container">
            {!loaded ? (
                <LoadingUsers/>
            ) : (
                <div>
                    <FriendRequests/>
                    <FriendSearch/>
                    <FriendsList/>
                </div>
            )}
        </div>
    );
};

export default Friends;
