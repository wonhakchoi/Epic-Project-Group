import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import ProfileFriend from "./ProfileFriend";
import ProfileRestaurant from "./ProfileRestaurant";
import User from "./User";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserService from "../../redux/services/usersService";
import RatingService from "../../redux/services/ratingsService";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip, Button } from "@mui/material";
import YourRatingCard from "../ratings/YourRatingCard";
import LoadingUsers from "../users/LoadingUsers";
import { getAllRatingsAsync, getUserRatingsAsync } from "../../redux/thunks/ratingsThunks";
import { REQUEST_STATE } from "../../redux/requestStates";


export default function ProfilePage() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let [loaded, setLoaded] = useState(false);
    let [user, setUser] = useState({});
    const userRatingsSlice = useSelector((state) => state.ratings.userRatings);
    const userID = useSelector((state) => state.sauth.currUser)
    const icons = useSelector((state) => state.users.iconLocations);

    useEffect(() => {
        dispatch(getUserRatingsAsync({userID: userID}));
    }, []);


    const routeChange = () => {
        let path = "../friends";
        navigate(path);
    };

    useEffect(() => {
        const fetchUserRatings = async () => {
            try {
                const userData = await UserService.getUserByID(userID);
                setUser(userData);
            } catch (error) {
                // Handle any errors that might occur during the promise resolution
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserRatings();
    }, [])

    // sets 'loaded' to true only once the ratings and users are all loaded
    useEffect(() => {
        if ( !userRatingsSlice.getRatings == REQUEST_STATE.FULFILLED|| !user ) {
            return;
        }
        setLoaded(true);
    }, [ user, userRatingsSlice.ratings]);

    if (!loaded) {
        return <LoadingUsers />
    }


    if (user.data !== undefined) {
        return (
            <div>
                <div
                    className="friends-header"
                    style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                >
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "2vh" }}>
                        <div id="friend-title" style={{ marginRight: "10px" }}>
                            My Profile
                        </div>
                        <Tooltip title="Edit profile" placement="right">
                            <Button href="profile/edit">
                                <EditIcon
                                    sx={{
                                        fontSize: "4vh",
                                        color: "#7C40F4",
                                    }}
                                />
                            </Button>
                        </Tooltip>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <User
                            name={`${user.data[0].firstName} ${user.data[0].lastName}`}
                            biography={user.data[0].biography}
                            icon={icons[user.data[0].icon]}
                        />
                    </div>
                </div>

                <div className="friends-header">
                    <label id="friend-title">Friends</label>
                    <button id="navigate-button" onClick={routeChange}>
                        View Friends Page
                    </button>
                </div>

                <div className="friends">
                    {user.data[0].friends.map((friend) => {
                        return <ProfileFriend key={friend} id={friend} />;
                    })}
                </div>

                <div className="restaurants-header">
                    <label id="restaurant-title">Your Restaurants</label>
                </div>
                <div className="restaurants">
                    {userRatingsSlice.ratings.map((rating) => {
                        return <YourRatingCard id={rating._id} restaurant={rating.restaurantName} restaurantID={rating.restaurantID} score={rating.score} comment={rating.comments} date={rating.createdAt} />
                    })}
                </div>
            </div>
        );
    }
}
