import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFriendsCollectionsAsync} from "../../redux/thunks/collectionsThunks";
import {Grid, Typography} from "@mui/material";
import FriendsCollectionCard from "./FriendsCollectionCard";

export default function FriendsCollections() {
    const currUser = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();
    const friendsCollections = useSelector((state) => state.collections.friendsCollection);

    useEffect(() => {
        dispatch(getFriendsCollectionsAsync(currUser))
    }, [currUser])

    const displayCollections = (friendCollectionList) =>
        friendCollectionList?.map((friendCollection) => (
            <Grid item key={friendCollection.collection._id} xs={12} sm={6} md={4} lg={3}>
                <FriendsCollectionCard collection={friendCollection.collection} friendName={friendCollection.friendName}/>
            </Grid>
        ));

    return <div className={"friends-collections"}>
        <Typography
            variant="h4"
            component="div"
            sx={{mb: 5, mt: 5}}
        >
            Collections from Your Friends
        </Typography>

        <Grid container spacing={2}>
            {displayCollections(friendsCollections)}
        </Grid>

    </div>
}