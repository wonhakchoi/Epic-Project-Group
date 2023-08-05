import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import RestaurantCard from "../restaurants/RestaurantCard";
import {Typography, Box} from "@mui/material";
import {getCollectionDetailsAsync, getRestaurantsAsync} from "../../redux/thunks/collectionsThunks";
import {useParams} from "react-router-dom";
import LoadingUsers from "../users/LoadingUsers";

export default function CollectionPage() {
    const collectionDetails = useSelector((state) => state.collections.currCollectionDetails);
    const restaurants = useSelector((state) => state.collections.currRestaurants);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

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

    if (!loaded) {
        return <LoadingUsers />;
    }

    return (
        <Box sx={{maxWidth: "500px", margin: "25px auto"}}>
            <Typography variant="h4" component="h1" sx={{marginBottom: "20px"}}>
                {collectionDetails.name}
            </Typography>
            {restaurantList}
        </Box>
    );
}
