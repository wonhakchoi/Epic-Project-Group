import axios from "axios";

const getRestaurants = async () => {
    const restaurants = await axios.get(`${process.env.REACT_APP_BACKEND}/restaurants`);
    return restaurants;
};

const RestaurantService = {
    getRestaurants,
};

export default RestaurantService;
