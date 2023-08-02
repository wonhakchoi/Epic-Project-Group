import axios from "axios";

const getRestaurants = async () => {
    // const restaurants = await axios.get("http://localhost:3001/restaurants");
    const restaurants = await axios.get("https://easy-eats-backend-9u5y.onrender.com/restaurants");
    return restaurants;
};

const RestaurantService = {
    getRestaurants,
};

export default RestaurantService;
