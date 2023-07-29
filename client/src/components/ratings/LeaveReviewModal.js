import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./LeaveReviewModal.css";
import { Typography, Box, TextField, Grid, Button, Rating } from '@mui/material';
import { postUserRatingsAsync } from '../../redux/thunks/ratingsThunks';

export const LeaveReviewModal = ({ showReviewModal, setShowReviewModal }) => {
    const modalRef = useRef();
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

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
        dispatch(postUserRatingsAsync({ userID: "John Smith", restaurantID: "McDonald's", body: body }));
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
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Grid item xs={8}>
                                    <Rating
                                        name="simple-controlled"
                                        value={score}
                                        precision={0.5}
                                        defaultValue={2.5}
                                        size="large"
                                        onChange={(event, newValue) => {
                                            event.preventDefault();
                                            if (newValue < 0) {
                                                setScore(0);
                                            }
                                            setScore(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            event.preventDefault();
                                            if (newHover < 0) {
                                                setScore(0);
                                            }
                                            setScore(newHover);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    {score}
                                </Grid>
                                <Grid item xs={2}>

                                </Grid>
                            </Grid>
                            <TextField
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
                            />
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
            {/* <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal} ref={modalRef}>&times;</span>
                    {showModal && (
                        <div className="item-detail">
                            hello
                        </div>
                    )}
                </div>
            </div> */}
        </>
    );
};
