import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantByPlaceID } from "../redux/services/mapService";

const RestaurantSpotlight = () => {
    const { placeID } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const restaurantData = await getRestaurantByPlaceID(placeID);
                setRestaurant(restaurantData.data);
                console.log(restaurant);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRestaurantData();
    }, [placeID]);

    return (
        <div>
            <h1>RESTAURANT SPOTLIGHT {placeID}</h1>
        </div>
    );
};

export default RestaurantSpotlight;
