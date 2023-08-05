import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import { setCollectionPin } from "../../redux/reducers/collectionsSlice";
import { useDispatch } from "react-redux";

// Component for each Collection Card
export default function CollectionCard({ collectionId, collection, isPinned }) {
  const dispatch = useDispatch();
  const handlePinClick = () => {
    dispatch(setCollectionPin({ collectionId, pinned: !isPinned }));
  };

  return (
    <div style={{ position: "relative" }}>
      {isPinned && (
        <Typography
          variant="h6"
          component="div"
          color="primary"
          sx={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            padding: "5px 10px",
            borderRadius: "10px",
          }}
        >
          Pinned
        </Typography>
      )}
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
        <Link to={"/collections/" + collectionId} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            alt="Collection Image"
            height="200"
            image={collection.img}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Link to={"/collections/" + collectionId} style={{ textDecoration: "none" }}>
              <Typography variant="h6" component="div" sx={{ textDecoration: "none" }}>
                {collection.name}
              </Typography>
            </Link>
          </CardContent>
        </Link>
        {/* <IconButton
          color={isPinned ? "primary" : "default"}
          onClick={handlePinClick}
          sx={{ position: "absolute", top: "5px", right: "5px" }}
        >
          <PushPinIcon />
        </IconButton> */}
        {!isPinned && (
          <IconButton
            color="default"
            onClick={handlePinClick}
            sx={{ position: "absolute", top: "5px", right: "5px" }}
          >
            {/* <PushPinIcon /> */}
            {/* Commenting this out because the icon looks awkward, will fix this later */}
          </IconButton>
        )}
      </Card>
    </div>
  );
}
