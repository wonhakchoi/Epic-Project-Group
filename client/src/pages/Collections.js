import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaded, showForm } from "../redux/reducers/collectionsSlice";
import CollectionCard from "../components/collections/CollectionCard";
import CollectionForm from "../components/collections/CollectionForm";
import { Button, Typography, Container, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoadingUsers from "../components/users/LoadingUsers";
import { postAuthAsync } from "../redux/thunks/authenticationThunks";
import { getCollectionsAsync } from "../redux/thunks/collectionsThunks";

// Page for displaying all the user made collections of restaurants
export default function Collections() {
  const collections = useSelector((state) => state.collections.collections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isLoggedIn = useSelector((state) => state.sauth.isLoggedIn);
  let currUser = useSelector((state) => state.sauth.currUser);
  const [cookies, removeCookie] = useCookies([]);
  const loaded = useSelector((state) => state.collections.loaded);

  useEffect(() => {
    dispatch(postAuthAsync(cookies.token)).then((data) => {
      const s = data.payload.status;
      if (!s) {
        removeCookie("token");
        navigate("/login");
      }
    });
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCollectionsAsync(currUser));
      dispatch(setLoaded(true));
    }
  }, [isLoggedIn, currUser]);

  const handleAddCollection = () => {
    dispatch(showForm());
  };

  const pinnedCollections = collections.filter(
    (collection) => collection.pinned
  );
  const allCollections = collections.filter((collection) => !collection.pinned);

  const displayCollections = (collectionList) =>
    collectionList.map((collection) => (
      <Grid item key={collection._id} xs={12} sm={6} md={4} lg={3}>
        <CollectionCard collection={collection} />
      </Grid>
    ));

  if (!loaded) {
    return <LoadingUsers />;
  }

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            marginTop: "7vh", 
            marginBottom: "5vh", 
            fontWeight: "bold",
            fontSize: "4vh", 
            color: "#000000",
            textAlign: "left",
            fontFamily: "system-ui",
          }}
        >
          💼 My Collections
        </Typography>
        <Button
          variant="contained"
          onClick={handleAddCollection}
          sx={{
            fontSize: "2.2vh",
            backgroundColor: "#5D44CA",
            "&:hover": {
              backgroundColor: "#432C8F",
            },
            textTransform: "none",
          }}
        >
          + Create New
        </Button>
      </Grid>

      {/* Box for Pinned Collections */}
      <Typography
        variant="h5"
        sx={{
          marginTop: "1vh", 
          marginBottom: "8vh", 
          backgroundColor: "#C5BAF4", 
          padding: "3vh",
          textAlign: "left",
          fontSize: "3vh",
          fontFamily: "system-ui",
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        Pinned
        <Grid container spacing={2}>
          {displayCollections(pinnedCollections)}
        </Grid>
      </Typography>

      {/* Box for All Collections */}
      <Typography
        variant="h5"
        sx={{
          marginTop: "5vh", 
          backgroundColor: "#E2D6F4", 
          padding: "3vh",
          textAlign: "left",
          fontSize: "3vh", 
          fontFamily: "system-ui",
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        All
        <Grid container spacing={2}>
          {displayCollections(allCollections)}
        </Grid>
      </Typography>

      <CollectionForm />
    </Container>
  );
}
