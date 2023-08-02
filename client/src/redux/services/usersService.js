import axios from "axios";

const baseUserUrl = "http://localhost:3001/users";
// const baseUserUrl = "https://easy-eats-backend-9u5y.onrender.com/users";
// const baseUserUrl = "https://easy-eats-backend-local.onrender.com/users";

// get users from database
const getUsers = async () => {
    const users = await axios.get(baseUserUrl);
    return users;
};

// accept incoming friend request
const acceptIncoming = async (userID, otherID) => {
    const acceptRequest = await axios.put(`${baseUserUrl}/acceptIncoming/${userID}/${otherID}`);
    return acceptRequest;
};

// reject incoming friend request
const rejectIncoming = async (userID, otherID) => {
    const rejectRequest = await axios.put(`${baseUserUrl}/rejectIncoming/${userID}/${otherID}`);
    return rejectRequest;
};

// sends friend request to user
const sendOutgoing = async (userID, otherID) => {
    const sendRequest = await axios.put(`${baseUserUrl}/sendOutgoing/${userID}/${otherID}`);
    return sendRequest;
};

// cancel outgoing friend request
const cancelOutgoing = async (userID, otherID) => {
    const cancelRequest = await axios.put(`${baseUserUrl}/cancelOutgoing/${userID}/${otherID}`);
    return cancelRequest;
};

// unfriend friend
const unfriend = async (userID, otherID) => {
    const unfriendRequest = await axios.put(`${baseUserUrl}/unfriend/${userID}/${otherID}`);
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
