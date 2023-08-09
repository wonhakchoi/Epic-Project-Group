import axios from "axios";

// requests for collections

export const getFriendsCollections = async (userId) => {
    let response = await axios.get(`${process.env.REACT_APP_BACKEND}/collections/friends/${userId}`)
    return response.data;
}

export const patchCollectionPin = async ({isPinned, collectionId}) => {
    let response = await axios.patch(`${process.env.REACT_APP_BACKEND}/collections/pin/${collectionId}`,
        {isPinned: isPinned})
    return response.data;
}

export const deleteCollection = async (collectionId) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND}/collections/${collectionId}`)
}
export const getCollections = async (userId) => {
    let data = (await axios.get(`${process.env.REACT_APP_BACKEND}/collections/user/${userId}`)).data;
    return data;
}

export const getCollectionDetails = async (collectionId) => {
    const data = (await axios.get(`${process.env.REACT_APP_BACKEND}/collections/${collectionId}`)).data;
    return data;
}

export const getRestaurants = async (collectionId) => {
    const data = (await axios.get(`${process.env.REACT_APP_BACKEND}/collections/${collectionId}/restaurants`)).data;
    return data;

}

export const addNewCollection = async ({name, img, userId}) => {
    const data = (await axios.post(`${process.env.REACT_APP_BACKEND}/collections`,
        {
            name: name,
            img: img,
            pinned: false,
            userId: userId
        })).data
    return data;

}

export const deleteRestaurantCollection = async ({collectionId, restaurantId}) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND}/collections/${collectionId}/${restaurantId}`)
}

export const addRestaurantCollection = async ({collectionId, restaurantId}) => {
    await axios.put(`${process.env.REACT_APP_BACKEND}/collections/${collectionId}/${restaurantId}`)
}

export default getCollections;
