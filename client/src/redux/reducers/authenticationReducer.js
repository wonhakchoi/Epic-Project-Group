import { combineReducers } from "redux";
import authentication from "./authentication";

const authenticationReducer = combineReducers({
    authentication,
});

export default authenticationReducer;
