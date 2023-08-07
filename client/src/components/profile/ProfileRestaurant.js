import "./ProfilePage.css";
import { useState, useEffect } from 'react';
import { getRestaurantByPlaceID } from "../../redux/services/mapService";
import { Link } from "react-router-dom";

export default function ProfileRestaurant({rating}) {  
    let [restaurant, setRestaurant] = useState(undefined)

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const restaurantData = await getRestaurantByPlaceID(rating.restaurantID);
                setRestaurant(restaurantData);
            } catch (error) {
                // Handle any errors that might occur during the promise resolution
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchRestaurant();
    }, [])

    if (restaurant != undefined) {
        return (
            <div className="item">
                <Link to={`/restaurants/${restaurant.data.result.place_id}`}>
                    <label className="restaurant-name">{restaurant.data.result.name}</label><br /> 
                </Link>
                <label className="restaurant-description">{restaurant.data.result.formatted_address}</label> <br /> 
                <label className="restaurant-rating">Your Rating: {rating.score}⭐</label> <br />
                <label className="restaurant-rating">Your Comment: {rating.comments}</label> <br />
                {/* <img src="https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png" alt="URL not found" width="450" height="400" /> */}
            </div>
        );
    }
}