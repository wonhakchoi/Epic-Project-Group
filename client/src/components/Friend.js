import React from "react";
import { useSelector } from "react-redux";
import "./Friend.css";

const Friend = ({ id, name, biography, rated_restaurants }) => {
    const icons = useSelector((state) => state.iconLocations);

    return (
        <div className="friend-container">
            <img className="user-icon" src={icons[id % icons.length]} alt={name} />
            <h3>{name}</h3>
            <p className="biography">{biography}</p>
            <div className="rated-restaurants">
                <b>Rated Restaurants:</b>
                {rated_restaurants.map((result) => (
                    <div key={result.id}>
                        <label>{result.name}</label> <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Friend;
