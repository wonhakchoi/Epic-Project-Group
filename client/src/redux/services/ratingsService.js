import axios from "axios";
import {baseURL} from "./backendURL";

const baseRatingUrl = "https://easy-eats-backend-9u5y.onrender.com/ratings";

// gets the next subset of ratings
const getRatings = async (skipAmount, resultsToGet) => {
    const response = await axios.get(`${baseRatingUrl}/${skipAmount}/${resultsToGet}`);
    return response;
};

const RatingService = {
    getRatings,
};

export default RatingService;
