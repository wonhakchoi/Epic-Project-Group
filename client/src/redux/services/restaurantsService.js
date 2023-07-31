import axios from "axios";

const getRestaurants = async () => {
    const restaurants = await axios.get("https://easy-eats-backend-local.onrender.com/restaurants");
    return restaurants;
};

const RestaurantService = {
    getRestaurants,
};

export default RestaurantService;
