import React from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "../restaurants/RestaurantCard";
import { Typography, Box } from "@mui/material";

export default function CollectionPage() {
  const collectionDetails = useSelector((state) => state.collections.currCollectionDetails);
  const restaurants = useSelector((state) => state.collections.currRestaurants);

  const restaurantList = restaurants?.map((result) => (
    <RestaurantCard key={result._id} restaurant={result} />
  ));

  return (
    <Box sx={{ maxWidth: "500px", margin: "0 auto" }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: "20px" }}>
        {collectionDetails.name}
      </Typography>
      {restaurantList}
    </Box>
  );
}
