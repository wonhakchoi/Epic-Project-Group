import axios from "axios";

// get users from database
const getUsers = async () => {
    const users = await axios.get(`${process.env.REACT_APP_BACKEND}/users`);
    return users;
};

// accept incoming friend request
const acceptIncoming = async (userID, otherID) => {
    const acceptRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/acceptIncoming/${userID}/${otherID}`);
    return acceptRequest;
};

// reject incoming friend request
const rejectIncoming = async (userID, otherID) => {
    const rejectRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/rejectIncoming/${userID}/${otherID}`);
    return rejectRequest;
};

// sends friend request to user
const sendOutgoing = async (userID, otherID) => {
    const sendRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/sendOutgoing/${userID}/${otherID}`);
    return sendRequest;
};

// cancel outgoing friend request
const cancelOutgoing = async (userID, otherID) => {
    const cancelRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/cancelOutgoing/${userID}/${otherID}`);
    return cancelRequest;
};

// unfriend friend
const unfriend = async (userID, otherID) => {
    const unfriendRequest = await axios.put(`${process.env.REACT_APP_BACKEND}/users/unfriend/${userID}/${otherID}`);
    return unfriendRequest;
};

const UserService = {
    getUsers,
    acceptIncoming,
    rejectIncoming,
    sendOutgoing,
    cancelOutgoing,
    unfriend,
};

export default UserService;
