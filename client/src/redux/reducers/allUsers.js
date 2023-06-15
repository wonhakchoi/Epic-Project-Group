/**
 * Represents all users on the site
 */

let initialUsers = [];
let initialNames = [
    "Cedric",
    "Malcolm",
    "Tammy",
    "Wendy",
    "Wonhak",
    "Johnny",
    "Alfred",
    "Conner",
    "Jeremiah",
    "Wencelas",
    "Taylor",
    "Taz",
    "Tally",
    "Sally",
    "Polly",
    "Molly",
    "Daffy",
];

for (let i = 0; i < initialNames.length; i++) {
    initialUsers.push({
        id: i + 1,
        name: initialNames[i],
        biography: `${i % 2 === 0 ? "UBC" : "SFU"} student`,
    });
}

const allUsers = (users = initialUsers, action) => {
    switch (action.type) {
        default:
            return users;
    }
};

export default allUsers;
