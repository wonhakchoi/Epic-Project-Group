/**
 * Represents all friends of the user
 */

const userFriends = (friends = new Set(["1", "2", "3", "4", "5", "9"]), action) => {
    switch (action.type) {
        default:
            return friends;
    }
};

export default userFriends;
