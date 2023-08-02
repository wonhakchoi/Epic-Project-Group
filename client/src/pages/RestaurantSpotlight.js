import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingCard from "../components/ratings/RatingCard";
import { getRestaurantByPlaceID } from "../redux/services/mapService";
import RatingService from "../redux/services/ratingsService";

const RestaurantSpotlight = () => {
    const { placeID } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [ratings, setRatings] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const [restaurantData, ratingData] = await Promise.all([
                    getRestaurantByPlaceID(placeID),
                    RatingService.getRestaurantRatings(placeID),
                ]);
                setRestaurant(restaurantData.data.result);
                setRatings(ratingData.data);
                setLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRestaurantData();
    }, [placeID]);

    useEffect(() => {
        console.log("RESTAURANT");
        console.log(restaurant);
    }, [restaurant]);

    useEffect(() => {
        console.log("RATINGS");
        console.log(ratings);
    }, [ratings]);

    return (
        <div>
            {loaded && (
                <section>
                    <h1>{restaurant.name}</h1>
                    {ratings.map((rating) => (
                        <RatingCard
                            key={rating._id}
                            id={rating._id}
                            name={rating.userID}
                            restaurant={rating.restaurantID}
                            score={rating.score}
                            comment={rating.comments ? rating.comments : ""}
                            date={rating.updatedAt}
                        />
                    ))}
                </section>
            )}
        </div>
    );
};

export default RestaurantSpotlight;
