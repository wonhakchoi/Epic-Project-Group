import { setFriends, incomingToFriend as incomingToFriendUserFriends } from "../reducers/userFriendsSlice";
import {
    setIncomingRequests,
    incomingToFriend as incomingToFriendIncomingRequests,
    incomingToStranger as incomingToStrangerIncomingRequests,
} from "../reducers/incomingRequestsSlice";
import {
    setOutgoingRequests,
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

// sets up friend requests of currently logged in user
export const setFriendsLists = (dispatch, friends, incoming, outgoing) => {
    dispatch(setFriends(friends));
    dispatch(setIncomingRequests(incoming));
    dispatch(setOutgoingRequests(outgoing));
};
