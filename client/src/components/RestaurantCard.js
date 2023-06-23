import React from "react";

// this is the same as Restaurant.js, just without the add to collection button
// TODO: duplicate code
export default function RestaurantCard({restaurant}) {
    const {name, description, location, openingHours, rating} = restaurant;

    return <div className="restaurant-card">
        <h3>{name}</h3>
        <p className="description">{description}</p>
        <p className="info">
            <span className="location">{location}</span>
        </p>
        <p className="info">
            <span className="opening-hours">{openingHours}</span>
        </p>
        <p className="info">
            Rating: <span className="rating">{rating}</span>
        </p>
    </div>
}