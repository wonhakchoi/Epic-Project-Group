import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Rating, Typography, Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import img from "../../../public/images/home-icons/pasta";

const RatingCard = ({ id, name, restaurant, score, comment, date }) => {
    // const icons = useSelector((state) => state.users.iconLocations);
    // const restaurantsSlice = useSelector((state) => state.restaurants.allRestaurants);
    // const authenticationSlice = useSelector((state) => state.authentication.authentication);
    const dispatch = useDispatch();
    const icons = useSelector((state) => state.users.iconLocations);

    // https://mui.com/material-ui/react-card/
    return (
        // <div>
        //     <section>
        //         <Typography component="legend">Rating</Typography>
        //         <Rating name="read-only" value={score} readOnly precision={0.5}/>
        //         <h3>{name}</h3>
        //     </section>
        // </div>
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
