import React from "react";
import FriendsList from "../components/Friends/FriendsList";
import FriendSearch from "../components/Friends/FriendSearch";
import FriendRequests from "../components/Friends/FriendRequests";

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
