import { combineReducers } from "redux";
import userFriends from "./userFriends";
import incomingRequests from "./incomingRequests";
import outgoingRequests from "./outgoingRequests";
import allUsers from "./allUsers";
import iconLocations from "./iconLocations";

const rootReducer = combineReducers({ userFriends, incomingRequests, outgoingRequests, allUsers, iconLocations });

export default rootReducer;
