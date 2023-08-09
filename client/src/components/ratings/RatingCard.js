import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Rating, Typography, Grid, Container, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

// import img from "../../../public/images/home-icons/pasta";

const RatingCard = ({ id, userID, name, icon, restaurant, score, comment, date }) => {
    const dispatch = useDispatch();
    const icons = useSelector((state) => state.users.iconLocations);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(new Date(date));

    // https://mui.com/material-ui/react-card/
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: "30px" }}>
            <Container maxWidth="sm">
                <Card sx={{ maxWidth: 1000 }}>
                    <CardHeader
                        avatar={
                            <Link to={`/users/${userID}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <img className="user-icon" src={icons[icon]} alt={name} />
                            </Link>
                        }
                        title={
                            <Link to={`/users/${userID}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <Typography variant="h6" sx={{ fontSize: "1.3rem", textAlign: "center" }}>
                                    {name}
                                </Typography>
                            </Link>
                        }
                        subheader={
                            <Typography mr={6} gutterBottom variant="body2" color="text.secondary">
                                {formattedDate}
                            </Typography>
                        }
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {restaurant}
                        </Typography>
                        <Rating name="read-only" value={score} readOnly precision={0.5} />
                        <Typography variant="body2" color="text.secondary" mt={2}>
                            {comment}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Grid>
    );
};

export default RatingCard;
