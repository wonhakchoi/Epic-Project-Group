import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Rating, Typography, Grid, Container, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


// import img from "../../../public/images/home-icons/pasta";

const RatingCard = ({ id, name, restaurant, score, comment, date }) => {
    const dispatch = useDispatch();
    const icons = useSelector((state) => state.users.iconLocations);

    // https://mui.com/material-ui/react-card/
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: '30px' }}
        >
            <Container maxWidth="sm">
                <Card sx={{ maxWidth: 1000 }}>
                    <CardHeader
                        avatar={
                            <img className="user-icon" src={icons[Math.floor(Math.random() * icons.length)]} alt={name} />
                            // <img className="user-icon" src={icons[Math.floor(Math.random() * icons.length)]} alt={name} />
                        }
                        title={
                            <Typography mr={6} gutterBottom variant="h6" component="h2">
                                {name}
                            </Typography>
                        }
                        subheader={
                            <Typography mr={6} gutterBottom variant="body2" color="text.secondary">
                                {date}
                            </Typography>
                        }
                    />
                    {/* <CardMedia
                        component="img"
                        height="194"
                        src="/images/home-icons/hamburger.jpg"
                        alt={restaurant}
                    /> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {restaurant}
                        </Typography>
                        <Rating name="read-only" value={score} readOnly precision={0.5} />
                        <Typography variant="body2" color="text.secondary" mt={2} >
                            {comment}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Grid >
    );
};

export default RatingCard;
