import { combineReducers } from "redux";
import userFriends from "./userFriends";
import allUsers from "./allUsers";

const rootReducer = combineReducers({ userFriends, allUsers });

export default rootReducer;
