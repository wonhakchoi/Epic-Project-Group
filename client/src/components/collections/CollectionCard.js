import React from "react";
import {Link} from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
} from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch, useSelector} from "react-redux";
import {getCollectionsAsync, patchCollectionPinAsync} from "../../redux/thunks/collectionsThunks";

// Component for each Collection Card
export default function CollectionCard({collection}) {
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.sauth.currUser);

    const handlePin = () => {
        dispatch(patchCollectionPinAsync({collectionId: collection._id, isPinned: true}))
            .then(() => {
                dispatch(getCollectionsAsync(currUser));
            });
    }

    const handleUnpin = () => {
        dispatch(patchCollectionPinAsync({collectionId: collection._id, isPinned: false}))
            .then(() => {
                dispatch(getCollectionsAsync(currUser));
            });
    }

    return (
        <div style={{position: "relative"}}>
            {collection.pinned && (
                <Typography
                    variant="h6"
                    component="div"
                    color="primary"
                    sx={{
                        position: "absolute",
                        top: "-20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#fff",
                        padding: "5px 10px",
                        borderRadius: "10px",
                    }}
                >
                    Pinned
                </Typography>
            )}
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
                <Link to={"/collections/" + collection._id} style={{textDecoration: "none"}}>
                    <CardMedia
                        component="img"
                        alt="Collection Image"
                        height="200"
                        image={collection.img}
                        sx={{objectFit: "cover"}}
                    />
                    <CardContent>
                        <Link to={"/collections/" + collection._id} style={{textDecoration: "none"}}>
                            <Typography variant="h6" component="div" sx={{textDecoration: "none"}}>
                                {collection.name}
                            </Typography>
                        </Link>
                    </CardContent>
                </Link>
                {/* <IconButton
          color={isPinned ? "primary" : "default"}
          onClick={handlePinClick}
          sx={{ position: "absolute", top: "5px", right: "5px" }}
        >
          <PushPinIcon />
        </IconButton> */}
                {!collection.pinned && (
                    <IconButton
                        color="default"
                        onClick={handlePin}
                        sx={{position: "absolute", top: "5px", right: "5px"}}
                    >
                        <PushPinIcon/>
                        {/* Commenting this out because the icon looks awkward, will fix this later */}
                    </IconButton>
                )}
                {collection.pinned && (
                    <IconButton
                        color="default"
                        onClick={handleUnpin}
                        sx={{position: "absolute", top: "5px", right: "5px"}}
                    >
                        <RemoveIcon/>
                        {/* Commenting this out because the icon looks awkward, will fix this later */}
                    </IconButton>
                )}
            </Card>
        </div>
    );
}
