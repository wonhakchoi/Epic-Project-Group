import { createAsyncThunk } from "@reduxjs/toolkit";
import RatingService from "../services/ratingsService";

export const getRatingsAsync = createAsyncThunk("ratings/getNextRatings", async ({ skipAmount, resultsToGet }) => {
    return await RatingService.getRatings(skipAmount, resultsToGet);
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

export const deleteRatingsAsync = createAsyncThunk("ratings/deleteRatings", async ({ ratingID }) => {
    return await RatingService.deleteRatings(ratingID);
});
