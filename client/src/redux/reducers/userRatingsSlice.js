/**
 * Represents user's ratings on the site
 */

import { createSlice } from "@reduxjs/toolkit";
import { getUserRatingsAsync, deleteRatingsAsync } from "../thunks/ratingsThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = { ratings: [], databaseSize: 0, getRatings: REQUEST_STATE.PENDING, error: null };

const userRatingsSlice = createSlice({
    name: "userRatings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserRatingsAsync.pending, (state) => {
                state.getRatings = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getUserRatingsAsync.fulfilled, (state, action) => {
                state.getRatings = REQUEST_STATE.FULFILLED;
                state.ratings = action.payload.data;
            })
            .addCase(getUserRatingsAsync.rejected, (state, action) => {
                state.getRatings = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(deleteRatingsAsync.pending, (state) => {
                state.getRatings = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteRatingsAsync.fulfilled, (state, action) => {
                state.getRatings = REQUEST_STATE.FULFILLED;
                state.ratings = state.ratings.filter((rating) => rating._id !== action.payload.data._id);
            })
            .addCase(deleteRatingsAsync.rejected, (state, action) => {
                state.getRatings = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export default userRatingsSlice.reducer;