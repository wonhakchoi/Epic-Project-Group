import React from "react";
import FriendsList from "../components/users/FriendsList";
import FriendSearch from "../components/users/FriendSearch";
import FriendRequests from "../components/users/FriendRequests";

const Friends = () => {
    return (
        <div className="friends-container">
            <FriendRequests />
            <FriendSearch />
            <FriendsList />
        </div>
    );
};

export default Friends;
