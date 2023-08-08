import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingUsers from "../users/LoadingUsers";
import RatingService from "../../redux/services/ratingsService";

import { Typography, Container, Box, TextField, Grid, Button, Rating, Alert } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { updateRatingsAsync } from "../../redux/thunks/ratingsThunks";

export default function EditReview() {
    const { ratingID } = useParams();

    const ratingsSlice = useSelector((state) => state.ratings.allRatings);

    let navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');

    const userID = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();

    // make initial fetch to get rating data from MongoDB database
    useEffect(() => {
        const fetchRating = async () => {
            try {
                const ratingData = await RatingService.getRatingByID(ratingID);
                setScore(ratingData.data.score);
                setComment(ratingData.data.comments);
            } catch (error) {
                console.error(error);
                setError("This rating ID does not exist");
            }
        };

        fetchRating();
    }, [ratingID, dispatch]);

    // sets 'loaded' to true only once the users and ratings are loaded
    useEffect(() => {
        if (!score || !comment) {
            return;
        }
        setLoaded(true);
    }, [score, comment]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            score: score,
            comments: comment,
        }
        dispatch(updateRatingsAsync({ ratingID: ratingID, body: body }));
        navigate('/profile');
    };


    if (error) {
        return (<>
            <Typography variant="h4" component="div" sx={{ mt: 6 }}>
                {error}
            </Typography>
        </>);
    }

    if (!loaded) {
        return <LoadingUsers />;
    }

    return (
        <div>
            <Typography variant="h4" component="div" sx={{ m: 6 }}>
                Edit Review
            </Typography>
            <Container component="main" maxWidth="xs">
                <Box component="form" onSubmit={handleSubmit} noValidate >
                    <Rating
                        className="rating"
                        value={score}
                        precision={0.5}
                        size="large"
                        onChange={(event, newValue) => {
                            setScore(newValue);
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="comment"
                        label="Your comment"
                        name="comment"
                        autoComplete="current-comment"
                        autoFocus
                        multiline
                        rows={2}
                        onChange={handleCommentChange}
                        value={comment}
                    />

                    {/* <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    ></Button> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: "#8B69C1",
                            "&:hover": {
                                backgroundColor: "#6B41AD",
                            },
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        Update
                    </Button >
                </Box>
            </Container>
        </div>
    );
};