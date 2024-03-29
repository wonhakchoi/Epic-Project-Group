import { createSlice } from "@reduxjs/toolkit";
// import { getRatingsAsync } from "../thunks/ratingsThunks";
import { postUserRatingsAsync } from "../thunks/ratingsThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = { ratings: [], databaseSize: 0, uploadState: REQUEST_STATE.PENDING, error: null };

const postRatingSlice = createSlice({
    name: "postRatings",
    initialState,
    reducers: {
        clearError: (state, action) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postUserRatingsAsync.pending, (state) => {
                state.uploadState = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(postUserRatingsAsync.fulfilled, (state, action) => {
                state.uploadState = REQUEST_STATE.FULFILLED;
                state.error = null;
                // state.ratings = [...state.ratings, ...action.payload.data.ratings];
            })
            .addCase(postUserRatingsAsync.rejected, (state, action) => {
                state.uploadState = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export const {
    clearError,
} = postRatingSlice.actions;
export default postRatingSlice.reducer;
