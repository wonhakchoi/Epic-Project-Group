import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getCollectionDetailsAsync,
  getRestaurantsAsync,
} from "../../redux/thunks/collectionsThunks";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
// import {clickCollection} from "../../redux/reducers/collectionsSlice";
// import {getCollectionDetails} from "../../redux/services/collectionsService";

// Component for each Collection Card
export default function CollectionCard({ collectionId, collection }) {
  // const collectionDetails = useSelector(state => state.collections.currCollectionDetails);
  const dispatch = useDispatch();

  function handleCollectionClick() {
    // dispatch(clickCollection(collectionId))
    dispatch(getCollectionDetailsAsync(collectionId));
    dispatch(getRestaurantsAsync(collectionId));
  }

  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "50px auto 30px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "&:hover": {
          backgroundColor: "#e1e1e1",
        },
      }}
    >
      <Link
        to={"/collections/" + collectionId}
        onClick={handleCollectionClick}
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          alt="Collection Image"
          height="200"
          image={collection.img}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ textDecoration: "none" }}
          >
            {collection.name}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
