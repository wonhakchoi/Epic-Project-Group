import { combineReducers } from "redux";
import allUsers from "./allUsers";
import allRestaurants from "./allRestaurants";
import userFriends from "./userFriends";
import incomingRequests from "./incomingRequests";
import outgoingRequests from "./outgoingRequests";
import iconLocations from "./iconLocations";

const rootReducer = combineReducers({
    allUsers,
    allRestaurants,
    userFriends,
    incomingRequests,
    outgoingRequests,
    iconLocations,
});

export default rootReducer;
