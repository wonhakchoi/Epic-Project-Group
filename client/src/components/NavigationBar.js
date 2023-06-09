import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <div className="navigation-bar">
            <Link to="/" className="navigation-link">
                Home
            </Link>
            <Link to="/search" className="navigation-link">
                Search
            </Link>
        </div>
    );
};

export default NavigationBar;
