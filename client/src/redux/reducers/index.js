import { combineReducers } from "redux";
import userFriends from "./userFriends";
import authReducer from "./authReducer";

const rootReducer = combineReducers({ 
    userFriends,
    authReducer
 });

export default rootReducer;
