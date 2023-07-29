import React from "react";
import "./Restaurant.css";
import { useDispatch } from "react-redux";
import { displayAddToCollection, setRestaurant } from "../../redux/reducers/collectionPopupSlice";
import { Card, CardContent, Typography, Button } from "@mui/material";

const Restaurant = ({ restaurant }) => {
  const { place_id, name, formatted_address, opening_hours, rating, user_ratings_total } = restaurant;
  let YesOrNo;
  let ratingWithColour;
  opening_hours["open_now"] ? (YesOrNo = <span className="yesString">Yes</span>) : (YesOrNo = <span className="noString">No</span>);
  rating < 2
    ? (ratingWithColour = <span className="noString">{rating}</span>)
    : rating < 4
    ? (ratingWithColour = <span className="midString">{rating}</span>)
    : (ratingWithColour = <span className="yesString">{rating}</span>);
  const dispatch = useDispatch();

  const handleAddToCollection = () => {
    dispatch(displayAddToCollection());
    dispatch(setRestaurant(restaurant));
  };

  return (
    <Card
    className="restaurant-card"
    sx={{
      backgroundColor: "#ffffff",
      margin: "10px", 
      borderRadius: "15px",
      marginLeft: "80px", 
      marginRight: "80px", 
    }}
  >
      <CardContent>
        <Typography variant="h5" component="h3">
          {name}
        </Typography>
        <Typography variant="body2" component="p" className="formatted_address">
          {formatted_address}
        </Typography>
        <Typography variant="body2" component="p" className="opening-hours">
          Open Now? {YesOrNo}
        </Typography>
        <Typography variant="body2" component="p">
          Rating: {ratingWithColour} by <span className="rating">{user_ratings_total}</span> users
        </Typography>
        <Button variant="contained" onClick={handleAddToCollection} style={{ marginTop: "10px", backgroundColor: "#FFF4BB", color: "#000000" }}>
          Add to Collection
        </Button>
      </CardContent>
    </Card>
  );
};

export default Restaurant;
