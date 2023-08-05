import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unfriendAsync } from "../../redux/thunks/usersThunks";
import RatingService from "../../redux/services/ratingsService";
import "./Friend.css";
import "./Buttons.css";
import { Box, Card, CardActions, CardContent, Button, Typography, Grid, Container } from '@mui/material';


const Friend = ({ id, icon, name, biography }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    const restaurantsSlice = useSelector((state) => state.restaurants.allRestaurants);
    let currUser = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();
    const [ratings, setRatings] = useState(null);

    useEffect(() => {
        const fetchUserRatings = async () => {
            try {
                const userRatingsResult = await RatingService.getUserRatings(id);
                setRatings(userRatingsResult.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserRatings();
    }, []);

    return (
        <Card sx={{ minWidth: 100, maxWidth: 500 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    hello
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>

        // <div className="friend-container">
        //     <section className="friend-header">
        //         <img className="user-icon" src={icons[icon]} alt={name} />
        //         <h3>{name}</h3>
        //         <p className="biography">{biography}</p>
        //     </section>
        //     <section className="rated-restaurants">
        //         <b>Rated Restaurants</b>
        //         {ratings ? ratings.map((rating) => <h3>{rating.restaurantID}</h3>) : <h3>Loading...</h3>}
        //     </section>
        //     <section className="friend-buttons">
        //         <button
        //             className="accept-button friend-request-button"
        //             onClick={() => console.log(`View Profile ID ${id}`)}
        //         >
        //             View
        //         </button>
        //         <button
        //             className="reject-button friend-request-button"
        //             onClick={() => dispatch(unfriendAsync({ userID: currUser, otherID: id }))}
        //         >
        //             Unfriend
        //         </button>
        //     </section>
        // </div>
    );
};

export default Friend;
