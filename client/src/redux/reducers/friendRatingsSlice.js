/**
 * Represents all ratings on the site
 */

import { createSlice } from "@reduxjs/toolkit";
import { getFriendRatingsAsync } from "../thunks/ratingsThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = { ratings: [], databaseSize: 0, getRatings: REQUEST_STATE.PENDING, error: null };

const friendRatingsSlice = createSlice({
    name: "allRatings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFriendRatingsAsync.pending, (state) => {
                state.getRatings = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getFriendRatingsAsync.fulfilled, (state, action) => {
                state.getRatings = REQUEST_STATE.FULFILLED;
                state.ratings = [...state.ratings, ...action.payload.data.ratings];
                state.databaseSize = action.payload.data.databaseSize;
            })
            .addCase(getFriendRatingsAsync.rejected, (state, action) => {
                state.getRatings = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export default friendRatingsSlice.reducer;
