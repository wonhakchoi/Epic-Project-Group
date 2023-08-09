/**
 * Represents all ratings on the site
 */

import { createSlice } from "@reduxjs/toolkit";
import { getRatingsAsync, getAllRatingsAsync } from "../thunks/ratingsThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = { ratings: [], databaseSize: 0, getRatings: REQUEST_STATE.PENDING, error: null };

const allRatingsSlice = createSlice({
    name: "allRatings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRatingsAsync.pending, (state) => {
                state.getRatings = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getRatingsAsync.fulfilled, (state, action) => {
                state.getRatings = REQUEST_STATE.FULFILLED;
                state.ratings = [...state.ratings, ...action.payload.data.ratings];
                state.databaseSize = action.payload.data.databaseSize;
            })
            .addCase(getRatingsAsync.rejected, (state, action) => {
                state.getRatings = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getAllRatingsAsync.pending, (state) => {
                state.getRatings = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getAllRatingsAsync.fulfilled, (state, action) => {
                state.getRatings = REQUEST_STATE.FULFILLED;
                state.ratings = action.payload.data.ratings;
            })
            .addCase(getAllRatingsAsync.rejected, (state, action) => {
                state.getRatings = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export default allRatingsSlice.reducer;
