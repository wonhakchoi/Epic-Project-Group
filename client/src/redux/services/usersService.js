import axios from "axios";

// get users from database
const getUsers = async () => {
    const users = await axios.get(`${process.env.REACT_APP_BACKEND}/users`);
    // console.log('users\n' + JSON.stringify(users));
    return users;
};

// get user by ID
const getUserByID = async (userID) => {
    const user = await axios.get(`${process.env.REACT_APP_BACKEND}/users/${userID}`);
    return user;
};

// accept incoming friend request
const acceptIncoming = async (userID, otherID) => {
    const acceptRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/acceptIncoming/${userID}/${otherID}`);
    // console.log('accept\n' + JSON.stringify(acceptRequest));
    return acceptRequest;
};

// reject incoming friend request
const rejectIncoming = async (userID, otherID) => {
    const rejectRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/rejectIncoming/${userID}/${otherID}`);
    // console.log('reject\n' + JSON.stringify(rejectRequest));
    return rejectRequest;
};

// sends friend request to user
const sendOutgoing = async (userID, otherID) => {
    const sendRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/sendOutgoing/${userID}/${otherID}`);
    // console.log('send req\n' + JSON.stringify(sendRequest));
    return sendRequest;
};

// cancel outgoing friend request
const cancelOutgoing = async (userID, otherID) => {
    const cancelRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/cancelOutgoing/${userID}/${otherID}`);
    // console.log('cancel req\n' + JSON.stringify(cancelRequest));
    return cancelRequest;
};

// unfriend friend
const unfriend = async (userID, otherID) => {
    const unfriendRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/unfriend/${userID}/${otherID}`);
    // console.log('unfriend\n' + JSON.stringify(unfriendRequest))
    return unfriendRequest;
};

// edit user icon
const editIcon = async (userID, iconID) => {
    const userWithNewIcon = await axios.put(`${process.env.REACT_APP_BACKEND}/users/editIcon/${userID}/${iconID}`);
    // console.log('edit icon\n' + JSON.stringify(userWithNewIcon))
    return userWithNewIcon;
};

// edit user biography
const editBiography = async (userID, biography) => {
    const userWithNewBiography = await axios.put(`${process.env.REACT_APP_BACKEND}/users/editBio/${userID}`, biography);
    // console.log('edit biography\n' + JSON.stringify(userWithNewBiography))
    return userWithNewBiography;
};

// edit user profile
const editProfile = async (userID, body) => {
    const userWithUpdatedProfile = await axios.put(`${process.env.REACT_APP_BACKEND}/users/editProfile/${userID}`, body);
    return userWithUpdatedProfile;
};

const UserService = {
    getUsers,
    getUserByID,
    acceptIncoming,
    rejectIncoming,
    sendOutgoing,
    cancelOutgoing,
    unfriend,
    editIcon,
    editBiography,
    editProfile,
};

export default UserService;