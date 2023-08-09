import { createAsyncThunk } from "@reduxjs/toolkit";
import RatingService from "../services/ratingsService";
import axios from "axios";

export const getRatingsAsync = createAsyncThunk("ratings/getNextRatings", async ({ skipAmount, resultsToGet }) => {
    return await RatingService.getRatings(skipAmount, resultsToGet);
});

export const getAllRatingsAsync = createAsyncThunk("ratings/getAllRatings", async () => {
    return await RatingService.getAllRatings();
});

export const getRatingByIDAsync = createAsyncThunk("ratings/getRatingByID", async ({ ratingID }) => {
    return await RatingService.getRatings(ratingID);
});

export const getFriendRatingsAsync = createAsyncThunk(
    "ratings/getNextFriendRatings",
    async ({ skipAmount, resultsToGet, friendIDs }) => {
        return await RatingService.getFriendRatings(skipAmount, resultsToGet, friendIDs);
    }
);

export const getUserRatingsAsync = createAsyncThunk("ratings/getUserRatings", async ({ userID }) => {
    return await RatingService.getUserRatings(userID);
});

export const getRestaurantRatingsAsync = createAsyncThunk("ratings/getRestaurantRatings", async ({ restaurantID }) => {
    return await RatingService.getRestaurantRatings(restaurantID);
});

export const postUserRatingsAsync = createAsyncThunk(
    "ratings/postUserRatings",
    async ({ userID, restaurantID, body }) => {
        return await RatingService.postUserRatings(userID, restaurantID, body);
    }
);

export const updateRatingsAsync = createAsyncThunk("ratings/updateRatings", async ({ ratingID, body }) => {
    return await RatingService.updateRatings(ratingID, body);
});

export const deleteRatingsAsync = createAsyncThunk("ratings/deleteRatings", async (ratingID) => {
    const deletedRating = await axios.delete(`${process.env.REACT_APP_BACKEND}/ratings/${ratingID}`);
    return deletedRating;
});
