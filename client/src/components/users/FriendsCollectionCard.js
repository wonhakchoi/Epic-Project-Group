import React from "react";
import {Link} from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";

// Component for each Collection Card
export default function FriendsCollectionCard({friendName, collection}) {

    return (
        <div style={{position: "relative"}}>
            <Card
                sx={{
                    maxWidth: "100vh",
                    margin: "4vh auto 4vh auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: "#e1e1e1",
                    },
                }}
            >
                <Link
                    to={"/collections/" + collection._id}
                    style={{textDecoration: "none"}}
                >
                    <CardMedia
                        component="img"
                        alt="Collection Image"
                        height="200vh"
                        image={collection.img}
                        sx={{objectFit: "cover"}}
                    />
                    <CardContent>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {friendName}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                textDecoration: "none",
                                fontSize: "2vh",
                            }}
                        >
                            {collection.name}
                        </Typography>
                    </CardContent>
                </Link>
            </Card>
        </div>
    );
}