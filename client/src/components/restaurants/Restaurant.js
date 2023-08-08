import React, { useState } from "react";
import "./Restaurant.css";
import { useDispatch } from "react-redux";
import { displayAddToCollection, setRestaurant } from "../../redux/reducers/collectionPopupSlice";
import { LeaveReviewModal } from "../ratings/LeaveReviewModal";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { clearError } from "../../redux/reducers/postRatingSlice";

const Restaurant = ({ restaurant }) => {
    const dispatch = useDispatch();

    const [showReviewModal, setShowReviewModal] = useState(false);

    const openModal = () => {
        setShowReviewModal((showReviewModal) => !showReviewModal);
        dispatch(clearError());
    };

    const handleAddToCollection = () => {
        dispatch(displayAddToCollection());
        dispatch(setRestaurant(restaurant));
    };

    const { name, formatted_address, opening_hours, rating, user_ratings_total, picture_icon, types } = restaurant;
    if (name && formatted_address && opening_hours && rating && user_ratings_total && picture_icon) {
        if (!types.includes("food") && !types.includes("restaurant")) {
            return <></>;
        }
        let YesOrNo = <span className="midString">Undisclosed</span>;
        let ratingWithColour;
        if ("open_now" in opening_hours) {
            opening_hours["open_now"]
                ? (YesOrNo = <span className="yesString">Yes</span>)
                : (YesOrNo = <span className="noString">No</span>);
        } else {
            console.log(opening_hours);
        }
        rating < 2
            ? (ratingWithColour = <span className="noString">{rating}</span>)
            : rating < 4
            ? (ratingWithColour = <span className="midString">{rating}</span>)
            : (ratingWithColour = <span className="yesString">{rating}</span>);
        return (
            <Box sx={{ marginLeft: "80px", marginRight: "80px" }}>
                <div className={"restaurant-card"}>
                    <img className="restaurant-img" src={picture_icon} alt="URL not found"></img>
                    <div className="descriptor">
                        <Typography variant="h5" component="h3" sx={{ fontFamily: "Arial, sans-serif" }}>
                            {name}
                        </Typography>
                        <Typography variant="body1" className="info">
                            <span className="formatted_address">{formatted_address}</span>
                        </Typography>
                        <Typography variant="body1" className="info">
                            <span className="opening-hours">Open Now? {YesOrNo}</span>
                        </Typography>
                        <Typography variant="body1" className="info">
                            Rating: {ratingWithColour} by <span className="rating">{user_ratings_total}</span> users
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                sx={{
                                    backgroundColor: "#FFF4BB",
                                    color: "#000000",
                                    fontFamily: "Arial, sans-serif",
                                    marginTop: "30px",
                                }}
                                variant="contained"
                                onClick={handleAddToCollection}
                            >
                                Add to Collection
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: "#000000",
                                    fontFamily: "Arial, sans-serif",
                                    marginTop: "30px",
                                }}
                                variant="contained"
                                onClick={openModal}
                            >
                                Leave Review
                            </Button>
                            <Link to={`/restaurants/${restaurant.place_id}`}>
                                <Button
                                    sx={{
                                        backgroundColor: "#0047AB",
                                        fontFamily: "Arial, sans-serif",
                                        marginTop: "30px",
                                    }}
                                    variant="contained"
                                >
                                    View Restaurant
                                </Button>
                            </Link>
                        </Box>
                        <LeaveReviewModal showReviewModal={showReviewModal} setShowReviewModal={setShowReviewModal} placeID={restaurant.place_id} restaurantName={name} />
                    </div>
                </div>
            </Box>
        );
    } else {
        return <></>;
    }
};

export default Restaurant;
