import { combineReducers } from "redux";
import allRatings from "./allRatingsSlice";
import friendRatings from "./friendRatingsSlice";
import postRating from "./postRatingSlice";
import userRatings from "./userRatingsSlice";

const ratingReducer = combineReducers({
    allRatings,
    friendRatings,
    postRating,
    userRatings,
});

export default ratingReducer;
