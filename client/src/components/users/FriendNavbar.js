import React from "react";
import { Link } from "react-router-dom";
import "./FriendNavbar.css";

const FriendNavbar = () => {
    return (
        <div className="friends-navbar">
            <Link to="/friends" className="friends-navbar-link">
                Friends
            </Link>
            <Link to="/friends/requests" className="friends-navbar-link">
                Requests
            </Link>
        </div>
    );
};

export default FriendNavbar;
