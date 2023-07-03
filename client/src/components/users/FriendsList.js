import React from "react";
import { useSelector } from "react-redux";
import Friend from "./Friend";
import "./FriendsList.css";

const FriendsList = () => {
    const friends = useSelector((state) => state.users.userFriends);
    const usersSlice = useSelector((state) => state.users.allUsers);

    return (
        <div>
            <h2>Your Friends</h2>
            <div className="friendslist-container">
                {friends.map((id) => {
                    const user = usersSlice.users.filter((user) => user._id === id)[0];
                    return (
                        <Friend
                            key={id}
                            id={id}
                            name={user.name}
                            biography={user.biography}
                            ratedRestaurants={user.ratedRestaurants}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FriendsList;