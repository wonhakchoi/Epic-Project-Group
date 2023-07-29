import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../redux/reducers/collectionsSlice";
import CollectionCard from "../components/collections/CollectionCard";
import CollectionForm from "../components/collections/CollectionForm";
import { Button, Typography, Container, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import LoadingUsers from "../components/users/LoadingUsers";
import {baseURL} from "../redux/services/backendURL";

// Page for displaying all the user made collections of restaurants
export default function Collections() {
  const collections = useSelector((state) => state.collections.collections);
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      try {
        // https://stackoverflow.com/questions/42474262/cors-issue-with-external-api-works-via-postman-but-not-http-request-with-axios
        return axios("https://easy-eats-backend-9u5y.onrender.com/auth/", {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          withCredentials: true
        }).then(response => {
          let data = response.data
          const { status, user } = data;

          if (status) {
            setLoaded(true);
          } else {
            setLoaded(true);
            return (removeCookie("token"), navigate("/login"));
          }
        })

      } catch (err) {
        console.log(err);
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleAddCollection = () => {
    dispatch(showForm());
  };

  const displayCollections = collections.map((collection) => (
    <Grid item key={collection._id} xs={12} sm={6} md={4} lg={3}>
      <CollectionCard collectionId={collection._id} collection={collection} />
    </Grid>
  ));

  if (!loaded) {
    return <LoadingUsers />;
  }

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
