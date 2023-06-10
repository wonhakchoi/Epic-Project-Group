import React from "react";
import "./Restaurant.css"; // Import the CSS file for styling

const Restaurant = ({ restaurant }) => {
  const { name, description, location, openingHours, rating } = restaurant;

  const handleAddToList = () => {
    console.log("Add to My List clicked!", name);
  }

  return (
    <div className="restaurant-card">
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
      <button className="add-to-list-button" onClick={handleAddToList}>
        Add to My List
      </button>
    </div>
  );
};

export default Restaurant;
