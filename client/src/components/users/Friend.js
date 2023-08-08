import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { unfriendAsync } from "../../redux/thunks/usersThunks";
import RatingService from "../../redux/services/ratingsService";
import "./Friend.css";
import "./Buttons.css";
import { Card, CardContent, Button, Typography, CardHeader, Divider, Grid } from "@mui/material";

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
        <Card sx={{ width: 300, minHeight: 240, p: 1 }}>
            <CardHeader
                avatar={
                    <Link to={`/users/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <img className="user-icon" src={icons[icon]} alt={name} />
                    </Link>
                }
                title={
                    <Typography mr={6} variant="h6" component="h2">
                        <Link to={`/users/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            {name}
                        </Link>
                    </Typography>
                }
            />
            <CardContent>
                <Typography color="body2" variant="caption">
                    {biography}
                </Typography>
                <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
                {/* <Typography variant="h6" component="div">
                    Rated Restaurants
                </Typography>
                {ratings ?
                    ratings.map((rating) =>
                        <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                            {rating.restaurantID}
                        </Typography>
                    )
                    :
                    <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                        Loading...
                    </Typography>
                } */}

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    <Grid item xs={6}>
                        <Link to={`/users/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <Button variant="outlined" color="success" sx={{ minWidth: "30vh", minHeight: "6vh" }}>
                                View
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            sx={{ minWidth: "30vh", minHeight: "6vh" }}
                            variant="outlined"
                            color="error"
                            onClick={() => dispatch(unfriendAsync({ userID: currUser, otherID: id }))}
                        >
                            Unfriend
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Friend;
