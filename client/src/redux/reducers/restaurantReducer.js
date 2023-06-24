import { combineReducers } from "redux";
import allRestaurants from "./allRestaurants";

const restaurantsReducer = combineReducers({
    allRestaurants,
});

export default restaurantsReducer;
