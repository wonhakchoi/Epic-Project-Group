import React from "react";
import { useParams } from "react-router-dom";

const RestaurantSpotlight = () => {
    const { placeID } = useParams();

    return (
        <div>
            <h1>RESTAURANT SPOTLIGHT OF {placeID}</h1>
        </div>
    );
};

export default RestaurantSpotlight;
