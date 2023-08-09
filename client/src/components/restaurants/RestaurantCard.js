import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRestaurantCollectionAsync } from "../../redux/thunks/collectionsThunks";
import { Box, Typography, Button } from "@mui/material";

export default function RestaurantCard({ restaurant }) {
  const collectionDetails = useSelector(
    (state) => state.collections.currCollectionDetails
  );
  const [isCurrUser, setIsCurrUser] = useState(false);
  const currUser = useSelector((state) => state.sauth.currUser);
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

  useEffect(() => {
      if (currUser === collectionDetails.userId) {
          setIsCurrUser(true);
      } else {
          setIsCurrUser(false);
      }
  }, [currUser, collectionDetails])

  function handleRemove() {
    let cId = collectionDetails._id;
    dispatch(deleteRestaurantCollectionAsync({ collectionId: cId, restaurantId: place_id }));
    window.location.reload();
  }

  if (!isCurrUser) {
      return (
          <Box sx={{
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "1rem",
              borderColor: "#ddd",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
          }}>
              <Typography variant="h5" component="h3" sx={{ marginBottom: "0.5rem" }}>
                  {name}
              </Typography>
              <Typography variant="body1" className="info" sx={{ marginBottom: "0.5rem" }}>
                  <span className="formatted_address">{formatted_address}</span>
              </Typography>
              <Typography variant="body1" className="info" sx={{ marginBottom: "0.5rem" }}>
                  Open Now? {YesOrNo}
              </Typography>
              <Typography variant="body1" className="info" sx={{ marginBottom: "0.5rem" }}>
                  Rating: {ratingWithColour} by <span className="rating">{user_ratings_total}</span> users
              </Typography>
          </Box>
      )
  }

  return (
    <Box sx={{
      backgroundColor: "#f5f5f5",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "1rem",
      marginBottom: "1rem",
      borderColor: "#ddd",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <Typography variant="h5" component="h3" sx={{ marginBottom: "0.5rem" }}>
        {name}
      </Typography>
      <Typography variant="body1" className="info" sx={{ marginBottom: "0.5rem" }}>
        <span className="formatted_address">{formatted_address}</span>
      </Typography>
      <Typography variant="body1" className="info" sx={{ marginBottom: "0.5rem" }}>
        Open Now? {YesOrNo}
      </Typography>
      <Typography variant="body1" className="info" sx={{ marginBottom: "0.5rem" }}>
        Rating: {ratingWithColour} by <span className="rating">{user_ratings_total}</span> users
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#000000", color: "#ffffff" }}
        onClick={() => handleRemove()}
      >
        Remove from Collection
      </Button>
    </Box>
  );
}
