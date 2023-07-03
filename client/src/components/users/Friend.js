import React from "react";
import { useSelector } from "react-redux";
import "./Friend.css";

const Friend = ({ id, name, biography, ratedRestaurants }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    const restaurantsSlice = useSelector((state) => state.restaurants.allRestaurants);

    return (
        <div className="friend-container">
            <div className="friend-header">
                <img className="user-icon" src={icons[Math.floor(Math.random() * icons.length)]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </div>
            <div className="rated-restaurants">
                <b>Rated Restaurants</b>
                {Object.entries(ratedRestaurants).map(([id, rating]) => {
                    const restaurant = restaurantsSlice.restaurants.filter((restaurant) => restaurant._id === id)[0];
                    return (
                        <div key={id}>
                            <p className="restaurant-info">
                                {restaurant.name} ~ {rating}⭐
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Friend;
