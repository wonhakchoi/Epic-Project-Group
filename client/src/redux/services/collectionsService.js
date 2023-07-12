import axios from "axios";

// requests for collections
export const getCollections = async () => {
    return (await axios.get("http://localhost:3001/collections")).data;
}

export default getCollections;