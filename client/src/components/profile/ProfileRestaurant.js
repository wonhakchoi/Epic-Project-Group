import "./ProfilePage.css";
import { useState, useEffect } from 'react';
import { getRestaurantByPlaceID } from "../../redux/services/mapService";
import { Link } from "react-router-dom";

export default function ProfileRestaurant({ rating }) {
    return (
        <div className="item">
            <Link to={`/restaurants/${rating.restaurantID}`}>
                <label className="restaurant-name">{rating.restaurantName ? rating.restaurantName : "didn't add name"}</label><br />
            </Link>
            {/* <label className="restaurant-description">{restaurant.data.result.formatted_address}</label> <br /> */}
            <label className="restaurant-rating">Your Rating: {rating.score}⭐</label> <br />
            <label className="restaurant-rating">Your Comment: {rating.comments}</label> <br />
            {/* <img src="https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png" alt="URL not found" width="450" height="400" /> */}
        </div>
    );
}