/**
 * Represents all restaurants on the site
 */

import { createSlice } from "@reduxjs/toolkit";
import { getRestaurantsAsync } from "../thunks/restaurantsThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = { restaurants: [], getRestaurants: REQUEST_STATE.PENDING, error: null };

const allRestaurantsSlice = createSlice({
    name: "allRestaurants",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurantsAsync.pending, (state) => {
                state.getRestaurants = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getRestaurantsAsync.fulfilled, (state, action) => {
                state.getRestaurants = REQUEST_STATE.FULFILLED;
                state.restaurants = action.payload.data;
            })
            .addCase(getRestaurantsAsync.rejected, (state, action) => {
                state.getRestaurants = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export default allRestaurantsSlice.reducer;
