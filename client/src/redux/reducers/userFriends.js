/**
 * Represents all friends of the user
 */

const userFriends = (friends = new Set(["1", "2", "3", "4", "5", "9"]), action) => {
    switch (action.type) {
        case "INCOMING_TO_FRIEND":
            return new Set([...friends, action.payload]);
        default:
            return friends;
    }
};

export default userFriends;
