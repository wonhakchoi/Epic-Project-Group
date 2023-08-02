import axios from "axios";

// gets the next subset of ratings
const getRatings = async (skipAmount, resultsToGet) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/ratings/allRatings/${skipAmount}/${resultsToGet}`);
    return response;
};

// gets the next subset of friend ratings
const getFriendRatings = async (skipAmount, resultsToGet, friendIDs) => {
    const response = await axios.get(`$${process.env.REACT_APP_BACKEND}/ratings/friendRatings/${skipAmount}/${resultsToGet}`, {
        params: { friendIDs: friendIDs },
    });
    console.log(friendIDs);
    return response;
};

// gets the ratings of a specific user
const getUserRatings = async (userID) => {
    const userRatings = await axios.get(`${process.env.REACT_APP_BACKEND}/ratings/userRatings/${userID}`);
    return userRatings;
};

// gets the ratings of a specific restaurant
const getRestaurantRatings = async (restaurantID) => {
    const restaurantRatings = await axios.get(`${process.env.REACT_APP_BACKEND}/ratings/restaurantRatings/${restaurantID}`);
    return restaurantRatings;
};

// creates a new user rating on a specific restaurant
const postUserRatings = async (userID, restaurantID, body) => {
    const addedUserRating = await axios.post(`${process.env.REACT_APP_BACKEND}/ratings/${userID}/${restaurantID}`, body);
    return addedUserRating;
};

// updates an existing rating
const updateRatings = async (ratingID, body) => {
    const updatedRating = await axios.put(`${process.env.REACT_APP_BACKEND}/ratings/${ratingID}`, body);
    return updatedRating;
};

// deletes an existing rating
const deleteRatings = async (ratingID) => {
    const deletedRating = await axios.delete(`${process.env.REACT_APP_BACKEND}/ratings/${ratingID}`);
    return deletedRating;
};

const RatingService = {
    getRatings,
    getFriendRatings,
    getUserRatings,
    getRestaurantRatings,
    postUserRatings,
    updateRatings,
    deleteRatings,
};

export default RatingService;
