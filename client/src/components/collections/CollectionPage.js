import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCard from "../restaurants/RestaurantCard";
import { Typography, Box, Button } from "@mui/material";
import {
  deleteCollectionAsync,
  getCollectionDetailsAsync,
  getRestaurantsAsync,
} from "../../redux/thunks/collectionsThunks";
import { useNavigate, useParams } from "react-router-dom";
import LoadingUsers from "../users/LoadingUsers";
import {setLoaded} from "../../redux/reducers/collectionsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

export default function CollectionPage() {
    const collectionDetails = useSelector((state) => state.collections.currCollectionDetails);
    const restaurants = useSelector((state) => state.collections.currRestaurants);
    const dispatch = useDispatch();
    const [loaded, setPageLoaded] = useState(false);
    const currUser = useSelector((state) => state.sauth.currUser);
    const [isCurrUser, setIsCurrUser] = useState(false);
    const navigate = useNavigate();

  // https://stackoverflow.com/questions/66021357/how-to-pass-id-to-react-js-path-link
  const { collectionId } = useParams();
    useEffect(() => {
        dispatch(getCollectionDetailsAsync(collectionId))
        dispatch(getRestaurantsAsync(collectionId));
    }, [currUser])

    useEffect(() => {
        if (collectionDetails.userId === currUser) {
            setIsCurrUser(true);
        } else {
            setIsCurrUser(false);
        }
        setPageLoaded(true);
        return () => {
            setPageLoaded(false);
        }
    }, [collectionDetails])

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

    if (!isCurrUser) {
        return (
            <Box sx={{maxWidth: "500px", margin: "25px auto"}}>
                <Typography variant="h4" component="h1" sx={{marginBottom: "20px"}}>
                    {collectionDetails.name}
                </Typography>
                {restaurantList}
            </Box>
        )
    }

  return (
    <Box sx={{ maxWidth: "500px", margin: "25px auto" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            marginTop: "2vh",
            marginBottom: "4vh",
            fontSize: "3vh",
            fontFamily: "system-ui",
          }}
        >
          {collectionDetails.name}
        </Typography>
        <Tooltip title="Delete collection" placement="left" sx={{ fontSize: "1.6vh" }}>
          <Button
            variant="contained"
            sx={{
              marginTop: "10px",
              marginBottom: "20px",
              marginLeft: "auto",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={handleDelete}
          >
            <DeleteIcon sx={{ fontSize: "3vh", color: "#A36AF5" }} />
          </Button>
        </Tooltip>
      </div>
      {restaurantList}
    </Box>
  );
}
