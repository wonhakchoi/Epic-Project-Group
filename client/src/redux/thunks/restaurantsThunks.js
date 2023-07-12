import { createAsyncThunk } from "@reduxjs/toolkit";
import RestaurantService from "../services/restaurantsService";

export const getRestaurantsAsync = createAsyncThunk("restaurants/getRestaurants", async () => {
    return await RestaurantService.getRestaurants();
});
