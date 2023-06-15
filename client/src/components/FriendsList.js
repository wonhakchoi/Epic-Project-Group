import React from "react";
import { useSelector } from "react-redux";
import Friend from "./Friend";

const FriendsList = () => {
    const friends = useSelector((state) => state.userFriends);

    return (
        <div>
            <h2>All Friends</h2>
            {friends.map((result) => (
                <Friend
                    key={result.id}
                    name={result.name}
                    biography={result.biography}
                    rated_restaurants={result.rated_restaurants}
                />
            ))}
        </div>
    );
};

export default FriendsList;
