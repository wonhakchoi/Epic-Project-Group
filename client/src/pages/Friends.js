import React from "react";
import FriendsList from "../components/friends/FriendsList";
import FriendSearch from "../components/friends/FriendSearch";
import FriendRequests from "../components/friends/FriendRequests";

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
