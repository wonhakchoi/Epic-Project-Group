import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// Component for each Collection Card
export default function CollectionCard({ collectionId, collection }) {

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
