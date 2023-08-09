import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollectionsAsync,
  patchCollectionPinAsync,
} from "../../redux/thunks/collectionsThunks";
import CardActions from "@mui/material/CardActions";

// Component for each Collection Card
export default function CollectionCard({ collection }) {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.sauth.currUser);

  const handlePin = () => {
    dispatch(
      patchCollectionPinAsync({ collectionId: collection._id, isPinned: true })
    ).then(() => {
      dispatch(getCollectionsAsync(currUser));
    });
  };

  const handleUnpin = () => {
    dispatch(
      patchCollectionPinAsync({ collectionId: collection._id, isPinned: false })
    ).then(() => {
      dispatch(getCollectionsAsync(currUser));
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <Card
        sx={{
          maxWidth: "100vh",
          margin: "4vh auto 4vh auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#e1e1e1",
          },
        }}
      >
        <CardActions>
          {!collection.pinned && (
            <IconButton color="default" onClick={handlePin} >
              <PushPinIcon
                sx={{
                  fontSize: "3vh",
                }}
              />
            </IconButton>
          )}
          {collection.pinned && (
            <IconButton
              color="default"
              onClick={handleUnpin}
            >
              <RemoveIcon  sx={{
                fontSize: "3vh",
              }} />
            </IconButton>
          )}
        </CardActions>

        <Link
          to={"/collections/" + collection._id}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            alt="Collection Image"
            height="200vh"
            image={collection.img}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            {/*<Link*/}
            {/*  to={"/collections/" + collection._id}*/}
            {/*  style={{ textDecoration: "none" }}*/}
            {/*>*/}
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textDecoration: "none",
                  fontSize: "2vh",
                }}
              >
                {collection.name}
              </Typography>
            {/*</Link>*/}
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
