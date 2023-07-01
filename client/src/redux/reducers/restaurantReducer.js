import { combineReducers } from "redux";
import allRestaurants from "./allRestaurantsSlice";

const restaurantsReducer = combineReducers({
    allRestaurants,
});

export default restaurantsReducer;
