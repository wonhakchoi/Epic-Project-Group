import { combineReducers } from "redux";
import allRatings from "./allRatingsSlice";
import friendRatings from "./friendRatingsSlice";
import postRating from "./postRatingSlice";

const ratingReducer = combineReducers({
    allRatings,
    friendRatings,
    postRating,
});

export default ratingReducer;
