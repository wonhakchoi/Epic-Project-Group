import React from "react";
import { useSelector } from "react-redux";
import "./Friend.css";

const Friend = ({ id, name, biography, rated_restaurants }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    const restaurants = useSelector((state) => state.restaurants.allRestaurants);

    return (
        <div className="friend-container">
            <div className="friend-header">
                <img className="user-icon" src={icons[id % icons.length]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </div>
            <div className="rated-restaurants">
                <b>Rated Restaurants</b>
                {Object.entries(rated_restaurants).map(([restaurantId, rating]) => {
                    const restaurant = restaurants[restaurantId];
                    return (
                        <div key={restaurantId}>
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
