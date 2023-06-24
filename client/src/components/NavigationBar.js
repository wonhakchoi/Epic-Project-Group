import React from "react";
import {Link} from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <div className="navigation-bar">
            <Link to="/" className="navigation-link">
                Home
            </Link>
            <Link to={"/collections"} className="navigation-link">
                Collections
            </Link>
            <Link to={"/friends"} className="navigation-link">
                Friends
            </Link>
        </div>
    );
};

export default NavigationBar;
