import { createAsyncThunk } from "@reduxjs/toolkit";
import RatingService from "../services/ratingsService";

export const getRatingsAsync = createAsyncThunk("ratings/getNextRatings", async ({ skipAmount, resultsToGet }) => {
    return await RatingService.getRatings(skipAmount, resultsToGet);
});
