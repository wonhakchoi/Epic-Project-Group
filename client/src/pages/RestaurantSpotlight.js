import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import RestaurantRating from "../components/ratings/RestaurantRating";
import { getRestaurantByPlaceID } from "../redux/services/mapService";
import RatingService from "../redux/services/ratingsService";
import { getUsersAsync } from "../redux/thunks/usersThunks";
import { REQUEST_STATE } from "../redux/requestStates";
import LoadingUsers from "../components/users/LoadingUsers";

const RestaurantSpotlight = () => {
    const { placeID } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [photos, setPhotos] = useState(null);
    const [ratings, setRatings] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const usersSlice = useSelector((state) => state.users.allUsers);
    const dispatch = useDispatch();

    // make initial fetch to get restaurant data from Google Places, and rating data from MongoDB database
    useEffect(() => {
        const fetchRestaurantAndRatingData = async () => {
            try {
                dispatch(getUsersAsync());
                const [restaurantData, ratingData] = await Promise.all([
                    getRestaurantByPlaceID(placeID),
                    RatingService.getRestaurantRatings(placeID),
                ]);
                setRestaurant(restaurantData.data.result);
                setPhotos(restaurantData.data.photo_urls);
                setRatings(ratingData.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRestaurantAndRatingData();
    }, [placeID, dispatch]);

    // sets 'loaded' to true only once the restaurant, ratings, and users are all loaded
    useEffect(() => {
        if (usersSlice.getUsers !== REQUEST_STATE.FULFILLED || !restaurant || !ratings || !photos) {
            return;
        }
        setLoaded(true);
    }, [usersSlice.getUsers, usersSlice.users, restaurant, ratings, dispatch]);

    useEffect(() => {
        console.log(restaurant);
    }, [restaurant]);

    // find user by ID
    const findUserByID = (userID) => {
        const matchedUser = usersSlice.users.filter((user) => user._id === userID);
        return matchedUser[0];
    };

    // restaurant fields:
    // name, formatted_address, opening_hours, rating, user_ratings_total, picture_icon, types
    return (
        <div>
            {loaded ? (
                <section>
                    <h1>{restaurant.name}</h1>
                    <h3>
                        Google Ratings: {restaurant.rating} from {restaurant.user_ratings_total} users
                    </h3>
                    <img className="restaurant-img" src={photos[0]} alt="URL not found"></img>
                    {ratings.map((rating) => (
                        <RestaurantRating
                            key={rating._id}
                            score={rating.score}
                            comments={rating.comments ? rating.comments : ""}
                            createdAt={rating.createdAt}
                            userName={findUserByID(rating.userID).firstName}
                            userIcon={findUserByID(rating.userID).icon}
                            restaurantName={restaurant.name}
                        />
                    ))}
                </section>
            ) : (
                <LoadingUsers />
            )}
        </div>
    );
};

export default RestaurantSpotlight;
