import { combineReducers } from "redux";
import allUsers from "./allUsers";
import allRestaurants from "./allRestaurants";
import userFriends from "./userFriends";
import authReducer from "./authReducer";
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
    authReducer
});

export default rootReducer;
