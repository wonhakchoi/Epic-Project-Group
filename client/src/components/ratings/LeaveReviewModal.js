import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./LeaveReviewModal.css";
import { Typography, Box, TextField, Grid, Button, Rating, Alert } from '@mui/material';
import { postUserRatingsAsync } from '../../redux/thunks/ratingsThunks';
import { clearError } from '../../redux/reducers/postRatingSlice';
import { REQUEST_STATE } from '../../redux/requestStates';

export const LeaveReviewModal = ({ showReviewModal, setShowReviewModal, placeID, restaurantName }) => {
    const modalRef = useRef();
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.sauth.currUser);
    const postRatingSlice = useSelector((state) => state.ratings.postRating);

    useEffect(() => {
        dispatch(clearError());
    }, []);

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowReviewModal(false);
        }
    };

    const handleScoreChange = (e) => {
        setScore(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            score: score,
            comments: comment,
            restaurantName: restaurantName,
        }
        dispatch(postUserRatingsAsync({ userID: loggedInUser, restaurantID: placeID, body: body }));
    };

    useEffect(() => {
        if (postRatingSlice.uploadState == REQUEST_STATE.FULFILLED) {
            setShowReviewModal(false);
        }
    }, [postRatingSlice.uploadState]);

    return (
        <>
            {showReviewModal ? (
                <div className="modal" onClick={closeModal} ref={modalRef}>
                    <div className="modal-content" showReviewModal={showReviewModal}>
                        <Typography component="h1" variant="h5">
                            Leave Review
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate >
                            <Grid item xs={12}>
                                {postRatingSlice.error?.message && <Alert severity="error" sx={{ mt: 3 }}>You've already left a review for this restaurant</Alert>}
                            </Grid>
                            <Rating
                                className="rating"
                                value={score}
                                precision={0.5}
                                size="large"
                                onChange={(event, newValue) => {
                                    setScore(newValue);
                                }}
                            // sx={{border:4}}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="comment"
                                label="Your comment"
                                name="comment"
                                autoComplete="current-comment"
                                autoFocus
                                onChange={handleCommentChange}
                                value={comment}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Post
                            </Button >
                        </Box>
                    </div>
                </div>
            ) : null}
        </>
    );
};
