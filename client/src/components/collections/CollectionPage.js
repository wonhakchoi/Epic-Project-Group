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

export default function CollectionPage() {
    const collectionDetails = useSelector((state) => state.collections.currCollectionDetails);
    const restaurants = useSelector((state) => state.collections.currRestaurants);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    // https://stackoverflow.com/questions/66021357/how-to-pass-id-to-react-js-path-link
    const {collectionId} = useParams();

    useEffect(() => {
        dispatch(getCollectionDetailsAsync(collectionId));
        dispatch(getRestaurantsAsync(collectionId));
        setLoaded(true);
    }, []);


    const restaurantList = restaurants?.map((result) => (
        <RestaurantCard key={result._id} restaurant={result}/>
    ));

    function handleDelete() {
        setLoaded(false);
        dispatch(deleteCollectionAsync(collectionId));
        navigate('/collections');
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
