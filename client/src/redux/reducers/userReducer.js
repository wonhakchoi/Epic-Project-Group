import { combineReducers } from "redux";
import allUsers from "./allUsersSlice";
import userFriends from "./userFriendsSlice";
import incomingRequests from "./incomingRequestsSlice";
import outgoingRequests from "./outgoingRequestsSlice";
import iconLocations from "./iconLocations";

const usersReducer = combineReducers({
    allUsers,
    userFriends,
    incomingRequests,
    outgoingRequests,
    iconLocations,
});

export default usersReducer;
