import { setFriends } from "../reducers/userFriendsSlice";
import { setIncomingRequests } from "../reducers/incomingRequestsSlice";
import { setOutgoingRequests } from "../reducers/outgoingRequestsSlice";

// sets up friend requests of currently logged in user
export const setFriendsLists = (dispatch, friends, incoming, outgoing) => {
    dispatch(setFriends(friends));
    dispatch(setIncomingRequests(incoming));
    dispatch(setOutgoingRequests(outgoing));
};
