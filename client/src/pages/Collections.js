import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showForm} from "../redux/reducers/collectionsSlice";
import CollectionCard from "../components/collections/CollectionCard";
import CollectionForm from "../components/collections/CollectionForm";
import {Button, Typography, Container, Grid} from "@mui/material";

import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import LoadingUsers from "../components/users/LoadingUsers";
import {postAuthAsync} from "../redux/thunks/authenticationThunks";
import {getCollectionsAsync} from "../redux/thunks/collectionsThunks";

// Page for displaying all the user made collections of restaurants
export default function Collections() {
    const collections = useSelector((state) => state.collections.collections);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(postAuthAsync(cookies.token))
            .then((data) => {
                const s = data.payload.status;
                if (s) {
                    dispatch(getCollectionsAsync());
                    setLoaded(true);
                } else {
                    removeCookie('token');
                    navigate("/login");
                }
            })
    }, [cookies, navigate, removeCookie]);

    const handleAddCollection = () => {
        dispatch(showForm());
    };

    const pinnedCollections = collections.filter((collection) => collection.pinned);
    const allCollections = collections.filter((collection) => !collection.pinned);

    const displayCollections = (collectionList) =>
        collectionList.map((collection) => (
            <Grid item key={collection._id} xs={12} sm={6} md={4} lg={3}>
                <CollectionCard collectionId={collection._id} collection={collection}/>
            </Grid>
        ));

    if (!loaded) {
        return (<LoadingUsers/>);
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

            {/* Box for Pinned Collections */}
            <Typography
                variant="h5"
                sx={{
                    marginTop: "20px",
                    marginBottom: "30px",
                    backgroundColor: "#f0f8ff", // Set the background color here
                    padding: "20px",
                    textAlign: "left"
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
                    marginTop: "20px",
                    backgroundColor: "#f5f5f5", // Set the background color here
                    padding: "20px",
                    textAlign: "left"
                }}
            >
                All
                {/* </Typography> */}
                <Grid container spacing={2}>
                    {displayCollections(allCollections)}
                </Grid>
            </Typography>
            <Button
                variant="contained"
                onClick={handleAddCollection}
                sx={{marginTop: "20px"}}
            >
                Create New Collection
            </Button>
            <CollectionForm/>
        </Container>
    );
}
