import React from "react";
import { useSelector } from "react-redux";
import Friend from "./Friend";
import "./FriendsList.css";

const FriendsList = () => {
    const friends = useSelector((state) => state.users.userFriends);
    const users = useSelector((state) => state.users.allUsers);

    return (
        <div>
            <h2>Your Friends</h2>
            <div className="friendslist-container">
                {[...friends].map((id) => {
                    const user = users[id];
                    return (
                        <Friend
                            key={id}
                            id={id}
                            name={user.name}
                            biography={user.biography}
                            rated_restaurants={user.rated_restaurants}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FriendsList;
