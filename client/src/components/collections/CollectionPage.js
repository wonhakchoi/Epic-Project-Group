import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import RestaurantCard from "../restaurants/RestaurantCard";
import {Typography, Box, Button} from "@mui/material";
import {
    deleteCollectionAsync,
    getCollectionDetailsAsync,
    getRestaurantsAsync
} from "../../redux/thunks/collectionsThunks";
import {useNavigate, useParams} from "react-router-dom";
import LoadingUsers from "../users/LoadingUsers";
import {setLoaded} from "../../redux/reducers/collectionsSlice";

export default function CollectionPage() {
    const collectionDetails = useSelector((state) => state.collections.currCollectionDetails);
    const restaurants = useSelector((state) => state.collections.currRestaurants);
    const dispatch = useDispatch();
    const [loaded, setPageLoaded] = useState(false);
    const navigate = useNavigate();

    // https://stackoverflow.com/questions/66021357/how-to-pass-id-to-react-js-path-link
    const {collectionId} = useParams();

    useEffect(() => {
        dispatch(getCollectionDetailsAsync(collectionId));
        dispatch(getRestaurantsAsync(collectionId));
        setPageLoaded(true);
    }, []);

    const restaurantList = restaurants?.map((result) => (
        <RestaurantCard key={result.place_id} restaurant={result}/>
    ));

    function handleDelete() {
        setPageLoaded(false);
        dispatch(setLoaded(false));
        dispatch(deleteCollectionAsync(collectionId));
        navigate('/collections');
        dispatch(setLoaded(true));
    }

    if (!loaded) {
        return <LoadingUsers />;
    }

    return (
        <Box sx={{maxWidth: "500px", margin: "25px auto"}}>
            <Typography variant="h4" component="h1" sx={{marginBottom: "20px"}}>
                {collectionDetails.name}
            </Typography>
            <Button
                variant="contained"
                sx={{marginTop: "10px", marginBottom: "20px"}}
                onClick={handleDelete}
            >
                Delete Collection
            </Button>
            {restaurantList}
        </Box>
    );
}
