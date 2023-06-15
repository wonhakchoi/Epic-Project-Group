import React from "react";
import FriendsList from "../components/FriendsList";
import FriendSearch from "../components/FriendSearch";

const Friends = () => {
    return (
        <div className="friends-container">
            <FriendSearch />
            <FriendsList />
        </div>
    );
};

export default Friends;
