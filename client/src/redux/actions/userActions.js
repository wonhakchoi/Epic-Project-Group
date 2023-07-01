/*
// accept incoming friend request
export const incomingToFriend = (userId) => {
    return {
        type: "INCOMING_TO_FRIEND",
        payload: userId,
    };
};

// reject incoming friend request
export const incomingToStranger = (userId) => {
    return {
        type: "INCOMING_TO_STRANGER",
        payload: userId,
    };
};

// cancel outgoing friend request
export const outgoingToStranger = (userId) => {
    return {
        type: "OUTGOING_TO_STRANGER",
        payload: userId,
    };
};

// sends friend request to user
export const strangerToOutgoing = (userId) => {
    return {
        type: "STRANGER_TO_OUTGOING",
        payload: userId,
    };
};
*/

import { incomingToFriend as incomingToFriendUserFriends } from "../reducers/userFriendsSlice";
import {
    incomingToFriend as incomingToFriendIncomingRequests,
    incomingToStranger as incomingToStrangerIncomingRequests,
} from "../reducers/incomingRequestsSlice";
import {
    strangerToOutgoing as strangerToOutgoingOutgoingRequests,
    outgoingToStranger as outgoingToStrangerOutgoingRequests,
} from "../reducers/outgoingRequestsSlice";

// accept incoming friend request
export const incomingToFriend = (dispatch, userId) => {
    dispatch(incomingToFriendUserFriends(userId));
    dispatch(incomingToFriendIncomingRequests(userId));
};

// reject incoming friend request
export const incomingToStranger = (dispatch, userId) => {
    dispatch(incomingToStrangerIncomingRequests(userId));
};

// sends friend request to user
export const strangerToOutgoing = (dispatch, userId) => {
    dispatch(strangerToOutgoingOutgoingRequests(userId));
};

// cancel outgoing friend request
export const outgoingToStranger = (dispatch, userId) => {
    dispatch(outgoingToStrangerOutgoingRequests(userId));
};
