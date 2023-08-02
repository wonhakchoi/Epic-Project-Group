import axios from "axios";

const getRestaurants = async () => {
    const restaurants = await axios.get("http://localhost:3001/restaurants");
    return restaurants;
};

const RestaurantService = {
    getRestaurants,
};

export default RestaurantService;
