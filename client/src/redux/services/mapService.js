import axios from "axios";
import {baseURL} from "./backendURL";

const baseUserUrl = baseURL + "/maps";

export const getMap = async (searchTerm) => {
    const data = await axios.get(`${baseUserUrl}/${searchTerm}`);
    return data;
};