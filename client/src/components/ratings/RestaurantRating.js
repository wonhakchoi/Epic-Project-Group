import React from "react";
import { useSelector } from "react-redux";

import { Rating, Typography, Grid, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

// import img from "../../../public/images/home-icons/pasta";

const RestaurantRating = ({ score, comments, createdAt, userName, userIcon, restaurantName }) => {
    const icons = useSelector((state) => state.users.iconLocations);

    // https://mui.com/material-ui/react-card/
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: "30px" }}>
            <Container maxWidth="sm">
                <Card sx={{ maxWidth: 1000 }}>
                    <CardHeader
                        avatar={<img className="user-icon" src={icons[userIcon]} alt="User Icon" />}
                        title={
                            <Typography mr={6} gutterBottom variant="h6" component="h2">
                                {userName}
                            </Typography>
                        }
                        subheader={
                            <Typography mr={6} gutterBottom variant="body2" color="text.secondary">
                                {createdAt}
                            </Typography>
                        }
                    />
                    <CardContent>
                        {/* <Typography gutterBottom variant="h5" component="div">
                            {restaurantName}
                        </Typography> */}
                        <Rating name="read-only" value={score} readOnly precision={0.5} />
                        <Typography variant="body2" color="text.secondary" mt={2}>
                            {comments}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Grid>
    );
};

export default RestaurantRating;
