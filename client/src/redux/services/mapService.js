import axios from "axios";
import {baseURL} from "./backendURL";

const baseUserUrl = "https://easy-eats-backend-9u5y.onrender.com/maps";

export const getMap = async (searchTerm) => {
    const data = await axios.get(`${baseUserUrl}/${searchTerm}`);
    return data;
};

export const getMapPhoto = async (photoReference) => {
    const data = await axios.get(`${baseUserUrl}/photos/${photoReference}`);
    return data;
};