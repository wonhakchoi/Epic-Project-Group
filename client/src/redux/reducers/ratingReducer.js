import { combineReducers } from "redux";
import allRatings from "./allRatingsSlice";
import postRating from "./postRatingSlice";

const ratingReducer = combineReducers({
    allRatings,
    postRating,
});

export default ratingReducer;
