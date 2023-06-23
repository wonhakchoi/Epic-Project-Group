import { combineReducers } from "redux";
import allUsers from "./allUsers";
import userFriends from "./userFriends";
import incomingRequests from "./incomingRequests";
import outgoingRequests from "./outgoingRequests";
import iconLocations from "./iconLocations";

const usersReducer = combineReducers({
    allUsers,
    userFriends,
    incomingRequests,
    outgoingRequests,
    iconLocations,
});

export default usersReducer;
