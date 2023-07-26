import axios from "axios";

const baseRatingUrl = "http://localhost:3001/ratings";

// gets the next subset of ratings
const getRatings = async (skipAmount, resultsToGet) => {
    const response = await axios.get(`${baseRatingUrl}/${skipAmount}/${resultsToGet}`);
    return response;
};

const RatingService = {
    getRatings,
};

export default RatingService;
