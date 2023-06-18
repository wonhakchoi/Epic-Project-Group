import React from "react";
import { useSelector } from "react-redux";
import Friend from "./Friend";
import "./FriendsList.css";

const FriendsList = () => {
    const friends = useSelector((state) => state.userFriends);

    return (
        <div>
            <h2>Your Friends</h2>
            <div className="friendslist-container">
                {friends.map((result) => (
                    <Friend
                        key={result.id}
                        id={result.id}
                        name={result.name}
                        biography={result.biography}
                        rated_restaurants={result.rated_restaurants}
                    />
                ))}
            </div>
        </div>
    );
};

export default FriendsList;
