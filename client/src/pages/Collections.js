import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../redux/reducers/collectionsSlice";
import CollectionCard from "../components/collections/CollectionCard";
import CollectionForm from "../components/collections/CollectionForm";
import { Button, Typography, Container, Grid } from "@mui/material";

// Page for displaying all the user made collections of restaurants
export default function Collections() {
  const collections = useSelector((state) => state.collections.collections);
  const dispatch = useDispatch();

  const handleAddCollection = () => {
    dispatch(showForm());
  };

  const displayCollections = collections.map((collection) => (
    <Grid item key={collection._id} xs={12} sm={6} md={4} lg={3}>
      <CollectionCard collectionId={collection._id} collection={collection} />
    </Grid>
  ));

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{
          marginTop: "30px",
          marginBottom: "10px",
          fontWeight: "bold",
          fontSize: "30px",
          color: "#034338",
          textAlign: "left",
        }}
      >
        My Collections
      </Typography>

      <Grid container spacing={2}>
        {displayCollections}
      </Grid>
      <Button
        variant="contained"
        onClick={handleAddCollection}
        sx={{ marginTop: "20px" }}
      >
        Create New Collection
      </Button>
      <CollectionForm />
    </Container>
  );
}
