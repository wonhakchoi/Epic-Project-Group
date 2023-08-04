import axios from "axios";

export const getMap = async (searchTerm) => {
    const data = await axios.get(`${process.env.REACT_APP_BACKEND}/maps/${searchTerm}`);
    return data;
};

export const getMapPhoto = async (photoReference) => {
    const data = await axios.get(`${process.env.REACT_APP_BACKEND}/maps/${photoReference}`);
    return data;
};

export const getRestaurantByPlaceID = async (placeID) => {
    const data = await axios.get(`${process.env.REACT_APP_BACKEND}/maps/restaurant/${placeID}`);
    return data;
};
