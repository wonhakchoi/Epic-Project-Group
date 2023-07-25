import axios from "axios";

const baseUserUrl = "http://localhost:3001/maps";

export const getMap = async (searchTerm) => {
    const data = await axios.get(`${baseUserUrl}/${searchTerm}`);
    return data;
};