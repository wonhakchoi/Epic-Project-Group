import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Routes, Route } from "react-router-dom";
import FriendNavbar from "../components/users/FriendNavbar";
import FriendsList from "../components/users/FriendsList";
import FriendSearch from "../components/users/FriendSearch";
import FriendRequests from "../components/users/FriendRequests";
import FriendRatings from "../components/ratings/FriendRatings";
import LoadingUsers from "../components/users/LoadingUsers";
import {REQUEST_STATE} from "../redux/requestStates";
import {getUsersAsync} from "../redux/thunks/usersThunks";
import {getRestaurantsAsync} from "../redux/thunks/restaurantsThunks";
import {setFriendsLists} from "../redux/actions/userActions";
import {postAuthAsync} from "../redux/thunks/authenticationThunks";
import FriendsCollections from "../components/users/FriendsCollections";

const Friends = () => {
    const usersSlice = useSelector((state) => state.users.allUsers);
    const restaurantsSlice = useSelector((state) => state.restaurants.allRestaurants);
    let isLoggedIn = useSelector((state) => state.sauth.isLoggedIn);
    let currUser = useSelector((state) => state.sauth.currUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [cookies, removeCookie] = useCookies(["token"]);

    // verify session and load users and restaurants
    useEffect(() => {
        dispatch(postAuthAsync(cookies.token)).then((data) => {
            const s = data.payload.status;
            if (!s) {
                removeCookie("token");
                navigate("/login");
            } else {
                dispatch(getUsersAsync());
                dispatch(getRestaurantsAsync());
            }
        });
    }, [cookies, navigate, removeCookie, currUser]);

    // sets up user profile once user and restaurant information is finished loading
    useEffect(() => {
        if (
            !isLoggedIn ||
            usersSlice.getUsers !== REQUEST_STATE.FULFILLED ||
            restaurantsSlice.getRestaurants !== REQUEST_STATE.FULFILLED
        ) {
            return;
        }
        const signedInUser = usersSlice.users.filter((user) => user._id === currUser)[0];
        // console.log("signedInUser");
        // console.log(signedInUser);
        setFriendsLists(dispatch, signedInUser.friends, signedInUser.incomingRequests, signedInUser.outgoingRequests);
        setLoaded(true);
    }, [isLoggedIn, usersSlice.getUsers, restaurantsSlice.getRestaurants]);

    return (
        <div className="friends-container">
            {!loaded ? (
                <LoadingUsers />
            ) : (
                <div>
                    <FriendNavbar />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <section>
                                    <FriendsList/>
                                    <FriendsCollections/>
                                    <FriendRatings/>
                                </section>
                            }
                        ></Route>
                        <Route
                            path="/requests"
                            element={
                                <section>
                                    <FriendSearch />
                                    <FriendRequests />
                                </section>
                            }
                        ></Route>
                    </Routes>
                </div>
            )}
        </div>
    );
};

export default Friends;
