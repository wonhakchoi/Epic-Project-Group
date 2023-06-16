import { combineReducers } from "redux";
import userFriends from "./userFriends";
import allUsers from "./allUsers";
import iconLocations from "./iconLocations";

const rootReducer = combineReducers({ userFriends, allUsers, iconLocations });

export default rootReducer;
