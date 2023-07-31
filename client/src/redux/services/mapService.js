import axios from "axios";

// const baseUserUrl = "http://localhost:3001/maps"
// const baseUserUrl = "https://easy-eats-backend-9u5y.onrender.com/maps";
const baseUserUrl = "https://easy-eats-backend-local.onrender.com/maps"

export const getMap = async (searchTerm) => {
    const data = await axios.get(`${baseUserUrl}/${searchTerm}`);
    return data;
};

export const getMapPhoto = async (photoReference) => {
    const data = await axios.get(`${baseUserUrl}/photos/${photoReference}`);
    return data;
};