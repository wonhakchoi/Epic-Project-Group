import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import RestaurantRating from "../components/ratings/RestaurantRating";
import { getRestaurantByPlaceID } from "../redux/services/mapService";
import RatingService from "../redux/services/ratingsService";
import { getUsersAsync } from "../redux/thunks/usersThunks";
import { REQUEST_STATE } from "../redux/requestStates";
import LoadingUsers from "../components/users/LoadingUsers";
import { Rating, Typography, Paper, Button, Divider, Box, Tooltip } from "@mui/material";
import Carousel from 'react-material-ui-carousel'

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
                    <Typography variant="h4" component="div" sx={{ m: 5 }}>
                        {restaurant.name}
                    </Typography>

                    <Carousel>
                        {
                            photos.map((photo, i) => {
                                return <img className="restaurant-img-carousel" src={photo} alt="URL not found"></img>
                            })
                        }
                    </Carousel>

                    <Typography sx={{ mt: 4 }} variant="overline" component="legend">Google Ratings</Typography>
                    <Tooltip title={restaurant.rating} placement="right">
                        <Button>
                            <Rating
                                name="read-only"
                                value={restaurant.rating}
                                readOnly
                                precision={0.1}
                            />
                        </Button>
                    </Tooltip>
                    <Typography variant="overline" component="legend">from {restaurant.user_ratings_total} users </Typography>

                    <Divider variant="middle" sx={{ mt: 5, mb: 1 }} />
                    <Typography variant="h4" component="div" sx={{ m: 5 }}>
                        Easy Eats Reviews
                    </Typography>
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
                    <Typography variant="body2" component="div" sx={{ mb: 5 }}>
                    </Typography>
                </section>
            ) : (
                <LoadingUsers />
            )}
        </div>
    );
};

export default RestaurantSpotlight;
