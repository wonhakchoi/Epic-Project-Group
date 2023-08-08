import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import ProfileFriend from "./ProfileFriend";
import ProfileRestaurant from "./ProfileRestaurant";
import User from "./User"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../../redux/services/usersService";
import RatingService from "../../redux/services/ratingsService";
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip, Button } from "@mui/material";
import YourRatingCard from "../ratings/YourRatingCard";

export default function ProfilePage() {
    let navigate = useNavigate();

    let [user, setUser] = useState({})
    let [userRatings, setUserRatings] = useState({})

    const routeChange = () => {
        let path = '../friends';
        navigate(path);
    }

    const userID = useSelector((state) => state.sauth.currUser)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRatingData = await RatingService.getUserRatings(userID);
                setUserRatings(userRatingData);
            } catch (error) {
                // Handle any errors that might occur during the promise resolution
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [])

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


    if (user.data !== undefined) {
        return (
            <div>
                <User name={`${user.data[0].firstName} ${user.data[0].lastName}`} biography={user.data[0].biography} />
                <Tooltip title="Edit profile" placement="right">
                    <Button href="profile/edit">
                        <EditIcon />
                    </Button>
                </Tooltip>
                <div className="friends-header">
                    <label id="friend-title">Friends</label>
                    <button id="navigate-button" onClick={routeChange}>To Friends Page</button>
                </div>

                <div className="friends">
                    {user.data[0].friends.map((friend) => {
                        return (
                            <ProfileFriend key={friend} id={friend} />
                        )
                    })}
                </div>

                <div className="restaurants-header">
                    <label id="restaurant-title">Your Restaurants</label>
                </div>
                <div className="restaurants">
                    {userRatings.data && userRatings.data.map((rating) => {
                        return (
                            <YourRatingCard id={rating._id} restaurant={rating.restaurantName} score={rating.score} comment={rating.comments} date={rating.createdAt}/>
                            // <ProfileRestaurant key={rating._id} rating={rating}/>
                        )
                    })}
                </div>
            </div>
        );
    }
};