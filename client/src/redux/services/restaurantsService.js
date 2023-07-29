import axios from "axios";
import {baseURL} from "./backendURL";

const getRestaurants = async () => {
    const restaurants = await axios.get(baseURL + "/restaurants");
    return restaurants;
};

const RestaurantService = {
    getRestaurants,
};

export default RestaurantService;
