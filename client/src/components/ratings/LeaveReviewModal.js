import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./LeaveReviewModal.css";
import { Typography, Box, TextField, Grid, Button, Rating, Stack } from '@mui/material';
import { postUserRatingsAsync } from '../../redux/thunks/ratingsThunks';

export const LeaveReviewModal = ({ showReviewModal, setShowReviewModal, placeID }) => {
    const modalRef = useRef();
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.sauth.currUser)

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
        }
        console.log(body);
        dispatch(postUserRatingsAsync({ userID: loggedInUser, restaurantID: placeID, body: body }));
        setShowReviewModal(false);
    };

    return (
        <>
            {showReviewModal ? (
                <div className="modal" onClick={closeModal} ref={modalRef}>
                    <div className="modal-content" showReviewModal={showReviewModal}>
                        <Typography component="h1" variant="h5">
                            Leave Review
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate >
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
                            {/* <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="score"
                                label="Your score"
                                name="score"
                                autoComplete="score"
                                autoFocus
                                onChange={handleScoreChange}
                                value={score}
                            /> */}
                            <TextField
                                margin="normal"
                                fullWidth
                                id="comment"
                                label="Your comment"
                                name="comment"
                                autoComplete="current-password"
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
